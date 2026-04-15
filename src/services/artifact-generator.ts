import type { Artifact, ArtifactType, SaveArtifactRequest } from "@/lib/types";

export async function saveArtifact(
  params: SaveArtifactRequest
): Promise<Artifact> {
  // TODO: upsert into artifacts table (increment version on conflict)
  void params;
  throw new Error("Not implemented — connect Supabase first");
}

export async function getArtifactBySession(
  sessionId: string
): Promise<Artifact | null> {
  // TODO: fetch latest artifact for a session
  void sessionId;
  return null;
}

export async function getArtifactVersions(
  sessionId: string
): Promise<Artifact[]> {
  // TODO: fetch all versions ordered by version desc
  void sessionId;
  return [];
}

export function detectArtifactReady(assistantMessage: string): boolean {
  // Heuristic: if the message contains a large markdown block, artifact is ready
  const headerCount = (assistantMessage.match(/^#{1,3}\s/gm) ?? []).length;
  return headerCount >= 3;
}

export function extractArtifactContent(
  assistantMessage: string,
  _artifactType: ArtifactType
): string {
  // Strip any prose before the first heading
  const firstHeadingIndex = assistantMessage.search(/^#{1,3}\s/m);
  if (firstHeadingIndex > 0) {
    return assistantMessage.slice(firstHeadingIndex);
  }
  return assistantMessage;
}
