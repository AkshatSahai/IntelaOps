import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { retrieveContext } from "@/services/rag";
import { createClient } from "@/lib/supabase/server";
import type { RagSearchResponse } from "@/lib/types";

const ragSearchSchema = z.object({
  query: z.string().min(1).max(500),
  role: z.enum(["product-owner", "business-analyst", "shared"]),
  limit: z.number().int().min(1).max(10).optional(),
});

export async function POST(
  request: NextRequest
): Promise<NextResponse<RagSearchResponse | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ragSearchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { query, role } = parsed.data;
  if (role === "shared") {
    return NextResponse.json({ results: [], context: "" });
  }

  const result = await retrieveContext(query, role);
  return NextResponse.json(result);
}
