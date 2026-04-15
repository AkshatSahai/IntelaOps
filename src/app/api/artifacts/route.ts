import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveArtifact, getSessionArtifact } from '@/services/artifact-generator';
import { createClient } from '@/lib/supabase/server';
import type { Artifact, ArtifactTypeId, RoleId } from '@/lib/types';

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

const saveArtifactSchema = z.object({
  sessionId: z.string().uuid(),
  role: z.enum(['product-owner', 'business-analyst']),
  artifactTypeId: z.enum(ARTIFACT_TYPE_IDS),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

export async function GET(
  request: NextRequest
): Promise<NextResponse<{ artifact: Artifact | null } | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sessionId = request.nextUrl.searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }

  const artifact = await getSessionArtifact(sessionId);
  return NextResponse.json({ artifact });
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<{ artifact: Artifact } | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = saveArtifactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const artifact = await saveArtifact(
    parsed.data.sessionId,
    user.id,
    parsed.data.role as RoleId,
    parsed.data.artifactTypeId as ArtifactTypeId,
    parsed.data.title,
    parsed.data.content
  );

  return NextResponse.json({ artifact }, { status: 201 });
}
