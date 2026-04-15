import type { ChatRequest, ChatResponse, ConversationPhase } from "@/lib/types";
import { anthropic, MODEL_ID, MAX_TOKENS } from "@/lib/anthropic";
import { getSystemPrompt } from "@/prompts/system";
import { getGuidedPrompt, buildGenerationPrompt } from "@/prompts/guided";
import { buildAdvisoryPrompt } from "@/prompts/advisory";
import { retrieveContext } from "@/services/rag";
import { getMessages } from "@/services/session-manager";
import { determineNextPhase, buildConversationContext } from "@/services/guided-flow";
import { detectRelevantFrameworks, buildAdvisoryContext } from "@/services/advisory";

// ------ Main streaming agent entry point -------

export async function streamAgentResponse(
  params: ChatRequest,
  onChunk: (text: string) => void
): Promise<ChatResponse> {
  const { sessionId, message, role, mode, artifactType } = params;

  // 1. Load conversation history
  const messages = await getMessages(sessionId);

  // 2. Retrieve RAG context
  const { context: ragContext } = await retrieveContext(message, role);

  // 3. Build prompt based on mode
  let systemPrompt: string;
  let currentPhase: ConversationPhase = "intro";

  if (mode === "guided" && artifactType) {
    currentPhase = determineNextPhase(
      (messages.at(-1)?.metadata?.phase as ConversationPhase) ?? "intro",
      messages
    );

    const conversationContext = buildConversationContext(messages);

    if (currentPhase === "generation") {
      systemPrompt = buildGenerationPrompt(
        artifactType,
        role,
        conversationContext,
        ragContext
      );
    } else {
      const phasePrompt = getGuidedPrompt(artifactType, currentPhase, role);
      systemPrompt = `${getSystemPrompt(role)}\n\n${phasePrompt}\n\nKNOWLEDGE BASE:\n${ragContext}`;
    }
  } else {
    // Advisory mode
    const frameworks = await detectRelevantFrameworks(message);
    systemPrompt = buildAdvisoryPrompt(role, ragContext, frameworks);
    void buildAdvisoryContext(messages);
  }

  // 4. Format message history for Anthropic
  const anthropicMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
  anthropicMessages.push({ role: "user", content: message });

  // 5. Stream response
  let fullText = "";
  const stream = await anthropic.messages.stream({
    model: MODEL_ID,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: anthropicMessages,
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      onChunk(chunk.delta.text);
      fullText += chunk.delta.text;
    }
  }

  return {
    sessionId,
    message: fullText,
    phase: currentPhase,
    artifactReady: currentPhase === "generation",
  };
}
