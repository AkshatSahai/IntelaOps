// ============================================================
// Complete type system for Operations Co-Pilot
// All services, API routes, and components import from here.
// ============================================================

// ------ Roles -------

export type RoleId = 'product-owner' | 'business-analyst';

export interface RoleDefinition {
  id: RoleId;
  name: string;
  description: string;
  icon: string;
  artifactTypes: ArtifactTypeId[];
  advisoryCapabilities: string[];
}

// ------ Artifact Types -------

export type ArtifactTypeId =
  | 'user-story-bug'
  | 'user-story-feature'
  | 'user-story-enhancement'
  | 'sprint-goal'
  | 'brd'
  | 'process-map'
  | 'feasibility-assessment'
  | 'stakeholder-analysis';

export interface ArtifactType {
  id: ArtifactTypeId;
  name: string;
  description: string;
  requiredSections: string[];
}

// ------ Sessions -------

export type SessionMode = 'guided' | 'advisory';
export type SessionStatus = 'active' | 'completed' | 'archived';

export interface Session {
  id: string;
  userId: string;
  role: RoleId;
  mode: SessionMode;
  artifactTypeId: ArtifactTypeId | null;
  status: SessionStatus;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// ------ Messages -------

export type MessageRole = 'user' | 'assistant';

export interface MessageMetadata {
  phase?: string;
  ragChunksUsed?: number;
  artifactGenerated?: boolean;
}

export interface Message {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  metadata: MessageMetadata | null;
  createdAt: string;
}

// ------ Artifacts -------

export interface Artifact {
  id: string;
  sessionId: string;
  userId: string;
  role: RoleId;
  artifactTypeId: ArtifactTypeId;
  title: string;
  content: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// ------ RAG -------

export interface KnowledgeBaseEntry {
  id: string;
  role: RoleId | 'shared';
  topic: string;
  chunkIndex: number;
  content: string;
  embedding?: number[];
}

export interface RagSearchResult {
  content: string;
  topic: string;
  role: RoleId | 'shared';
  similarity: number;
}

// ------ API -------

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
  role: RoleId;
  mode: SessionMode;
  artifactTypeId?: ArtifactTypeId;
}

export interface StreamChunk {
  type: 'text' | 'artifact' | 'phase-change' | 'error';
  content: string;
  metadata?: Record<string, unknown>;
}

// ------ Backward-compatible aliases -------

/** @deprecated Use RoleId */
export type Role = RoleId;
