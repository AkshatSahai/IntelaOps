import type { Session, Message, MessageRole, MessageMetadata, RoleId, SessionMode, ArtifactTypeId } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';

// ------ Session CRUD -------

export async function createSession(
  userId: string,
  role: RoleId,
  mode: SessionMode,
  artifactTypeId?: ArtifactTypeId
): Promise<Session> {
  const supabase = await createClient();

  const title = buildTitle(role, mode, artifactTypeId);

  const { data, error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      role,
      mode,
      artifact_type_id: artifactTypeId ?? null,
      status: 'active',
      title,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create session: ${error?.message ?? 'unknown'}`);
  }

  return mapSession(data);
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('sessions')
    .select()
    .eq('id', sessionId)
    .single();

  if (error || !data) return null;

  return mapSession(data);
}

export async function getUserSessions(userId: string): Promise<Session[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('sessions')
    .select()
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error || !data) return [];

  return data.map(mapSession);
}

export async function updateSessionTitle(sessionId: string, title: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('sessions')
    .update({ title, updated_at: new Date().toISOString() })
    .eq('id', sessionId);

  if (error) {
    throw new Error(`Failed to update session title: ${error.message}`);
  }
}

// ------ Message CRUD -------

export async function addMessage(
  sessionId: string,
  role: MessageRole,
  content: string,
  metadata?: MessageMetadata
): Promise<Message> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('messages')
    .insert({
      session_id: sessionId,
      role,
      content,
      metadata: metadata ?? null,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to add message: ${error?.message ?? 'unknown'}`);
  }

  // Bump session updated_at
  await supabase
    .from('sessions')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', sessionId);

  return mapMessage(data);
}

export async function getSessionMessages(sessionId: string): Promise<Message[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error || !data) return [];

  return data.map(mapMessage);
}

// ------ Row mappers -------

function mapSession(row: Record<string, unknown>): Session {
  return {
    id: row['id'] as string,
    userId: row['user_id'] as string,
    role: row['role'] as RoleId,
    mode: row['mode'] as SessionMode,
    artifactTypeId: (row['artifact_type_id'] as ArtifactTypeId | null) ?? null,
    status: (row['status'] as Session['status']) ?? 'active',
    title: row['title'] as string,
    createdAt: row['created_at'] as string,
    updatedAt: row['updated_at'] as string,
  };
}

function mapMessage(row: Record<string, unknown>): Message {
  return {
    id: row['id'] as string,
    sessionId: row['session_id'] as string,
    role: row['role'] as MessageRole,
    content: row['content'] as string,
    metadata: (row['metadata'] as MessageMetadata | null) ?? null,
    createdAt: row['created_at'] as string,
  };
}

function buildTitle(role: RoleId, mode: SessionMode, artifactTypeId?: ArtifactTypeId): string {
  const roleLabel = role === 'product-owner' ? 'PO' : 'BA';
  if (mode === 'guided' && artifactTypeId) {
    const label = artifactTypeId
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return `${roleLabel}: ${label}`;
  }
  return `${roleLabel}: Advisory Session`;
}
