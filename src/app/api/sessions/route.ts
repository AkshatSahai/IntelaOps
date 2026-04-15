import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSession, listSessions } from "@/services/session-manager";
import { createClient } from "@/lib/supabase/server";
import type { CreateSessionResponse, ListSessionsResponse, ArtifactType } from "@/lib/types";

const ARTIFACT_TYPES = [
  "user-story",
  "user-story-bug",
  "epic",
  "sprint-goal",
  "acceptance-criteria",
  "backlog-refinement-notes",
  "business-requirements-document",
  "functional-specification",
  "use-case",
  "process-map",
  "gap-analysis",
  "stakeholder-analysis",
] as const;

const createSessionSchema = z.object({
  mode: z.enum(["guided", "advisory"]),
  role: z.enum(["product-owner", "business-analyst"]),
  artifactType: z.enum(ARTIFACT_TYPES).optional(),
});

export async function GET(): Promise<NextResponse<ListSessionsResponse | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessions = await listSessions(user.id);
  return NextResponse.json({ sessions });
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateSessionResponse | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createSessionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const session = await createSession(user.id, {
    mode: parsed.data.mode,
    role: parsed.data.role,
    artifactType: parsed.data.artifactType as ArtifactType | undefined,
  });
  return NextResponse.json({ session }, { status: 201 });
}
