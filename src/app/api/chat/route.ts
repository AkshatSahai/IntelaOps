import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { streamAgentResponse } from "@/services/agent";
import type { ChatRequest } from "@/lib/types";

const chatRequestSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1).max(4000),
  role: z.enum(["product-owner", "business-analyst"]),
  mode: z.enum(["guided", "advisory"]),
  artifactType: z.string().optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse | Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const chatRequest = parsed.data as ChatRequest;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await streamAgentResponse(chatRequest, (chunk) => {
          controller.enqueue(encoder.encode(chunk));
        });
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
