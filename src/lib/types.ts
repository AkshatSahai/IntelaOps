// ============================================================
// Shared TypeScript interfaces for Operations Co-Pilot
// All API routes and services import from here.
// ============================================================

// ------ Domain enums -------

export type Role = "product-owner" | "business-analyst";

export type SessionMode = "guided" | "advisory";

export type MessageRole = "user" | "assistant" | "system";

export type ArtifactType =
  // Product Owner artifacts
  | "user-story"
  | "user-story-bug"
  | "epic"
  | "sprint-goal"
  | "acceptance-criteria"
  | "backlog-refinement-notes"
  // Business Analyst artifacts
  | "business-requirements-document"
  | "functional-specification"
  | "use-case"
  | "process-map"
  | "gap-analysis"
  | "stakeholder-analysis";

export type ConversationPhase =
  | "intro"
  | "discovery"
  | "clarification"
  | "validation"
  | "generation"
  | "review";

// ------ Database row shapes -------

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  defaultRole: Role | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  mode: SessionMode;
  role: Role;
  title: string;
  artifactType: ArtifactType | null;
  phase: ConversationPhase;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Artifact {
  id: string;
  sessionId: string;
  type: ArtifactType;
  content: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeItem {
  id: string;
  content: string;
  source: string;
  role: Role | "shared";
  similarity?: number;
}

// ------ API request / response shapes -------

export interface ChatRequest {
  sessionId: string;
  message: string;
  role: Role;
  mode: SessionMode;
  artifactType?: ArtifactType;
}

export interface ChatResponse {
  sessionId: string;
  message: string;
  phase?: ConversationPhase;
  artifactReady?: boolean;
}

export interface CreateSessionRequest {
  mode: SessionMode;
  role: Role;
  artifactType?: ArtifactType;
}

export interface CreateSessionResponse {
  session: Session;
}

export interface ListSessionsResponse {
  sessions: Session[];
}

export interface GetArtifactResponse {
  artifact: Artifact | null;
}

export interface SaveArtifactRequest {
  sessionId: string;
  type: ArtifactType;
  content: string;
}

export interface SaveArtifactResponse {
  artifact: Artifact;
}

export interface RagSearchRequest {
  query: string;
  role: Role | "shared";
  limit?: number;
}

export interface RagSearchResponse {
  results: KnowledgeItem[];
  context: string;
}

// ------ Component prop shapes -------

export interface RoleOption {
  id: Role;
  label: string;
  description: string;
  artifactTypes: ArtifactTypeOption[];
}

export interface ArtifactTypeOption {
  id: ArtifactType;
  label: string;
  description: string;
}
