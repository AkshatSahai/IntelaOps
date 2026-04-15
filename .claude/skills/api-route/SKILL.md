# Skill: API Route

Creates new Next.js 14 App Router API route handlers.

## File Location

`src/app/api/<endpoint>/route.ts`

## Rules

1. Export named functions only: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
2. All request parameters validated with Zod before use
3. All responses use typed interfaces from `src/lib/types.ts`
4. Auth check at the top of every route using `createClient()` from `lib/supabase/server.ts`
5. Return `NextResponse.json({ error: "Unauthorized" }, { status: 401 })` if no user
6. Return types must be explicit

## Template

```ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { MyResponseType } from "@/lib/types";

const requestSchema = z.object({
  field: z.string(),
});

export async function POST(
  request: NextRequest
): Promise<NextResponse<MyResponseType | { error: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // implementation
  return NextResponse.json({ /* result */ });
}
```

## Streaming Routes

For streaming (like `/api/chat`), return a `new Response(readableStream, { headers: {...} })` instead of `NextResponse.json`.
