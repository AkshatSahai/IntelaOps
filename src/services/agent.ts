import type { ChatRequest, Message } from '@/lib/types';
import { anthropic, MODEL, MAX_TOKENS } from '@/lib/anthropic';
import { getRoleSystemPrompt } from '@/prompts/system';
import { getGuidedPhasePrompt } from '@/prompts/guided';
import { getAdvisoryPrompt } from '@/prompts/advisory';
import { searchKnowledgeBase } from '@/services/rag';
import { determinePhase } from '@/services/guided-flow';
import { detectRelevantFrameworks } from '@/services/advisory';

export async function streamAgentResponse(
  request: ChatRequest,
  conversationHistory: Message[]
): Promise<ReadableStream<Uint8Array>> {
  const { message, role, mode, artifactTypeId } = request;

  // 1. Retrieve RAG context
  const ragContext = await searchKnowledgeBase(message, role, artifactTypeId);

  // 2. Build system prompt
  const systemBase = getRoleSystemPrompt(role);
  let modePrompt: string;

  if (mode === 'guided' && artifactTypeId) {
    const userMessageCount = conversationHistory.filter((m) => m.role === 'user').length;
    const phase = determinePhase(artifactTypeId, userMessageCount);
    modePrompt = getGuidedPhasePrompt(artifactTypeId, phase, ragContext);
  } else {
    // Advisory mode — optionally surface detected frameworks
    const frameworks = detectRelevantFrameworks(message);
    const frameworkHint =
      frameworks.length > 0
        ? `\n\nFrameworks that may be relevant to this conversation: ${frameworks.join(', ')}.`
        : '';
    modePrompt = getAdvisoryPrompt(role, ragContext) + frameworkHint;
  }

  const systemPrompt = `${systemBase}\n\n${modePrompt}`;

  // 3. Format conversation history for Anthropic
  const anthropicMessages = [
    ...conversationHistory.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user' as const, content: message },
  ];

  // 4. Return a ReadableStream that streams the Anthropic response
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = anthropic.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: systemPrompt,
          messages: anthropicMessages,
        });

        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`));
        controller.close();
      }
    },
  });
}
