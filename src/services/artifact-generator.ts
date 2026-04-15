import type { Artifact, ArtifactTypeId, RoleId } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';

export async function saveArtifact(
  sessionId: string,
  userId: string,
  role: RoleId,
  artifactTypeId: ArtifactTypeId,
  title: string,
  content: string
): Promise<Artifact> {
  const supabase = await createClient();

  // Fetch existing version to increment
  const { data: existing } = await supabase
    .from('artifacts')
    .select('version')
    .eq('session_id', sessionId)
    .order('version', { ascending: false })
    .limit(1)
    .single();

  const nextVersion = existing ? (existing.version as number) + 1 : 1;

  const { data, error } = await supabase
    .from('artifacts')
    .insert({
      session_id: sessionId,
      user_id: userId,
      role,
      artifact_type_id: artifactTypeId,
      title,
      content,
      version: nextVersion,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to save artifact: ${error?.message ?? 'unknown'}`);
  }

  return mapArtifact(data);
}

export async function getSessionArtifact(sessionId: string): Promise<Artifact | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('artifacts')
    .select()
    .eq('session_id', sessionId)
    .order('version', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;

  return mapArtifact(data);
}

// ------ Row mapper -------

function mapArtifact(row: Record<string, unknown>): Artifact {
  return {
    id: row['id'] as string,
    sessionId: row['session_id'] as string,
    userId: row['user_id'] as string,
    role: row['role'] as RoleId,
    artifactTypeId: row['artifact_type_id'] as ArtifactTypeId,
    title: row['title'] as string,
    content: row['content'] as string,
    version: row['version'] as number,
    createdAt: row['created_at'] as string,
    updatedAt: row['updated_at'] as string,
  };
}
