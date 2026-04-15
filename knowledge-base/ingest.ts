/**
 * Knowledge Base Ingestion Script
 *
 * Chunks markdown files, generates embeddings via OpenAI,
 * and upserts them into the Supabase pgvector knowledge_items table.
 *
 * Usage:
 *   npx tsx knowledge-base/ingest.ts
 *
 * Prerequisites:
 *   - .env.local with OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   - Migration 005 applied to your Supabase project
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { config } from "dotenv";

config({ path: ".env.local" });

const EMBEDDING_MODEL = "text-embedding-3-small";
const CHUNK_SIZE = 512; // tokens (approximate — we use character count as proxy)
const CHUNK_OVERLAP = 64;
const CHARS_PER_TOKEN = 4; // rough approximation

const ROLE_MAP: Record<string, string> = {
  "product-owner": "product-owner",
  "business-analyst": "business-analyst",
  shared: "shared",
};

// ------ Chunking -------

function chunkText(text: string, chunkChars: number, overlapChars: number): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkChars, text.length);
    chunks.push(text.slice(start, end).trim());
    start = end - overlapChars;
    if (start >= text.length) break;
  }

  return chunks.filter((c) => c.length > 50);
}

// ------ File discovery -------

function findMarkdownFiles(dir: string): Array<{ path: string; role: string }> {
  const results: Array<{ path: string; role: string }> = [];

  function walk(currentDir: string): void {
    for (const entry of readdirSync(currentDir)) {
      const fullPath = join(currentDir, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (extname(entry) === ".md") {
        const rel = relative(dir, fullPath);
        const parts = rel.split(/[\\/]/);
        const roleFolder = parts[0] ?? "shared";
        const role = ROLE_MAP[roleFolder] ?? "shared";
        results.push({ path: fullPath, role });
      }
    }
  }

  walk(dir);
  return results;
}

// ------ Main -------

async function main(): Promise<void> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseKey || !openaiKey) {
    throw new Error(
      "Missing environment variables. Check NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY."
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const openai = new OpenAI({ apiKey: openaiKey });

  const kbDir = join(process.cwd(), "knowledge-base");
  const files = findMarkdownFiles(kbDir).filter((f) => !f.path.endsWith("ingest.ts"));

  console.log(`Found ${files.length} markdown files.`);

  let totalChunks = 0;
  let totalInserted = 0;

  for (const { path, role } of files) {
    const content = readFileSync(path, "utf-8");
    const source = relative(kbDir, path).replace(/\\/g, "/");
    const chunks = chunkText(content, CHUNK_SIZE * CHARS_PER_TOKEN, CHUNK_OVERLAP * CHARS_PER_TOKEN);

    console.log(`  ${source}: ${chunks.length} chunks`);
    totalChunks += chunks.length;

    for (const chunk of chunks) {
      const embeddingResponse = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: chunk,
      });

      const embedding = embeddingResponse.data[0]?.embedding;
      if (!embedding) continue;

      const { error } = await supabase.from("knowledge_items").insert({
        content: chunk,
        source,
        role,
        embedding,
      });

      if (error) {
        console.error(`    Error inserting chunk: ${error.message}`);
      } else {
        totalInserted++;
      }

      // Rate limit: OpenAI free tier ~3 RPM for embeddings
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  console.log(`\nDone. ${totalInserted}/${totalChunks} chunks inserted.`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
