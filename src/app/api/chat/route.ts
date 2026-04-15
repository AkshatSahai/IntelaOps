import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { streamAgentResponse } from '@/services/agent';
import { getSessionMessages } from '@/services/session-manager';
import type { ChatRequest, ArtifactTypeId } from '@/lib/types';

const ARTIFACT_TYPE_IDS = [
  'user-story-bug',
  'user-story-feature',
  'user-story-enhancement',
  'sprint-goal',
  'brd',
  'process-map',
  'feasibility-assessment',
  'stakeholder-analysis',
] as const;

const chatRequestSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1).max(4000),
  role: z.enum(['product-owner', 'business-analyst']),
  mode: z.enum(['guided', 'advisory']),
  artifactTypeId: z.enum(ARTIFACT_TYPE_IDS).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse | Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const chatRequest: ChatRequest = {
    sessionId: parsed.data.sessionId,
    message: parsed.data.message,
    role: parsed.data.role,
    mode: parsed.data.mode,
    artifactTypeId: parsed.data.artifactTypeId as ArtifactTypeId | undefined,
  };

  const conversationHistory = await getSessionMessages(chatRequest.sessionId);

  const stream = await streamAgentResponse(chatRequest, conversationHistory);

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    },
  });
}
