import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { searchKnowledgeBase } from '@/services/rag';
import { createClient } from '@/lib/supabase/server';
import type { ArtifactTypeId } from '@/lib/types';

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

const ragSearchSchema = z.object({
  query: z.string().min(1).max(500),
  role: z.enum(['product-owner', 'business-analyst']),
  artifactTypeId: z.enum(ARTIFACT_TYPE_IDS).optional(),
});

export async function POST(
  request: NextRequest
): Promise<NextResponse<{ context: string } | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ragSearchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const context = await searchKnowledgeBase(
    parsed.data.query,
    parsed.data.role,
    parsed.data.artifactTypeId as ArtifactTypeId | undefined
  );

  return NextResponse.json({ context });
}
