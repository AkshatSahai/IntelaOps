/**
 * Knowledge Base Ingestion Script
 *
 * Splits markdown files at H2 (##) boundaries, generates embeddings via OpenAI,
 * and upserts them into the Supabase knowledge_base table.
 *
 * Usage:
 *   npx tsx knowledge-base/ingest.ts
 *
 * Prerequisites:
 *   - .env.local with OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   - Migration 005 applied to your Supabase project
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, basename, extname } from "path";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { config } from "dotenv";

config({ path: ".env.local" });

const EMBEDDING_MODEL = "text-embedding-3-small";
const MIN_CHUNK_CHARS = 50;

const ROLE_MAP: Record<string, string> = {
  "product-owner": "product-owner",
  "business-analyst": "business-analyst",
  shared: "shared",
};

// ------ Chunking by H2 -------

function splitByH2(content: string): string[] {
  // Split at H2 boundaries — each chunk includes its own ## heading for context
  const sections = content.split(/\n(?=## )/);
  return sections
    .map((s) => s.trim())
    .filter((s) => s.length >= MIN_CHUNK_CHARS);
}

// ------ File discovery -------

function findMarkdownFiles(dir: string): Array<{ path: string; role: string; topic: string }> {
  const results: Array<{ path: string; role: string; topic: string }> = [];

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
        const topic = basename(entry, ".md");
        results.push({ path: fullPath, role, topic });
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
  const files = findMarkdownFiles(kbDir);

  console.log(`Found ${files.length} markdown files.\n`);

  let totalChunks = 0;
  let totalUpserted = 0;

  for (const { path, role, topic } of files) {
    const content = readFileSync(path, "utf-8");
    const source = relative(kbDir, path).replace(/\\/g, "/");
    const chunks = splitByH2(content);

    console.log(`${source}: ${chunks.length} chunks`);
    totalChunks += chunks.length;

    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex] ?? "";
      if (!chunk) continue;

      const embeddingResponse = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: chunk,
      });

      const embedding = embeddingResponse.data[0]?.embedding;
      if (!embedding) {
        console.error(`  [skip] chunk ${chunkIndex} — no embedding returned`);
        continue;
      }

      const { error } = await supabase.from("knowledge_base").upsert(
        {
          role,
          topic,
          chunk_index: chunkIndex,
          content: chunk,
          embedding,
        },
        { onConflict: "role,topic,chunk_index" }
      );

      if (error) {
        console.error(`  [error] chunk ${chunkIndex}: ${error.message}`);
      } else {
        totalUpserted++;
      }

      // Respect OpenAI rate limits (free tier: ~3 RPM for embeddings)
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  console.log(`\nDone. ${totalUpserted}/${totalChunks} chunks upserted.`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
