import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveArtifact, getArtifactBySession } from "@/services/artifact-generator";
import { createClient } from "@/lib/supabase/server";
import type { GetArtifactResponse, SaveArtifactResponse } from "@/lib/types";

const saveArtifactSchema = z.object({
  sessionId: z.string().uuid(),
  type: z.string(),
  content: z.string().min(1),
});

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetArtifactResponse | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionId = request.nextUrl.searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  const artifact = await getArtifactBySession(sessionId);
  return NextResponse.json({ artifact });
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<SaveArtifactResponse | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = saveArtifactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const artifact = await saveArtifact(parsed.data as Parameters<typeof saveArtifact>[0]);
  return NextResponse.json({ artifact }, { status: 201 });
}
