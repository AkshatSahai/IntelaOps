import type {
  Session,
  Message,
  CreateSessionRequest,
  SessionMode,
  Role,
  ArtifactType,
  ConversationPhase,
} from "@/lib/types";

// ------ Session CRUD -------

export async function createSession(
  userId: string,
  params: CreateSessionRequest
): Promise<Session> {
  // TODO: insert into Supabase sessions table
  void userId;
  void params;
  throw new Error("Not implemented — connect Supabase first");
}

export async function getSession(sessionId: string): Promise<Session | null> {
  // TODO: fetch from Supabase
  void sessionId;
  return null;
}

export async function listSessions(userId: string): Promise<Session[]> {
  // TODO: fetch from Supabase, ordered by updated_at desc
  void userId;
  return [];
}

export async function updateSessionPhase(
  sessionId: string,
  phase: ConversationPhase
): Promise<void> {
  // TODO: update sessions table
  void sessionId;
  void phase;
}

export async function updateSessionTitle(
  sessionId: string,
  title: string
): Promise<void> {
  // TODO: update sessions table
  void sessionId;
  void title;
}

// ------ Message CRUD -------

export async function saveMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string
): Promise<Message> {
  // TODO: insert into messages table
  void sessionId;
  void role;
  void content;
  throw new Error("Not implemented — connect Supabase first");
}

export async function getMessages(sessionId: string): Promise<Message[]> {
  // TODO: fetch all messages for a session, ordered by created_at
  void sessionId;
  return [];
}

// ------ Helper: generate session title -------

export function generateSessionTitle(
  mode: SessionMode,
  role: Role,
  artifactType?: ArtifactType
): string {
  const roleLabel = role === "product-owner" ? "PO" : "BA";
  if (mode === "guided" && artifactType) {
    const typeLabel = artifactType
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return `${roleLabel}: ${typeLabel}`;
  }
  return `${roleLabel}: Advisory Session`;
}
