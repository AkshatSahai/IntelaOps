import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession, getUserSessions } from '@/services/session-manager';
import { createClient } from '@/lib/supabase/server';
import type { Session, ArtifactTypeId } from '@/lib/types';

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

const createSessionSchema = z.object({
  mode: z.enum(['guided', 'advisory']),
  role: z.enum(['product-owner', 'business-analyst']),
  artifactTypeId: z.enum(ARTIFACT_TYPE_IDS).optional(),
});

export async function GET(): Promise<NextResponse<{ sessions: Session[] } | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sessions = await getUserSessions(user.id);
    return NextResponse.json({ sessions });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<{ session: Session } | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = createSessionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const session = await createSession(
      user.id,
      parsed.data.role,
      parsed.data.mode,
      parsed.data.artifactTypeId as ArtifactTypeId | undefined
    );
    return NextResponse.json({ session }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
