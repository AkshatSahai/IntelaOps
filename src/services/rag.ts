import OpenAI from "openai";
import type { KnowledgeItem, Role, RagSearchResponse } from "@/lib/types";
import { EMBEDDING_MODEL, RAG_MATCH_COUNT, RAG_MATCH_THRESHOLD } from "@/lib/constants";

function getOpenAI(): OpenAI {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });
  const embedding = response.data[0]?.embedding;
  if (!embedding) {
    throw new Error("No embedding returned from OpenAI");
  }
  return embedding;
}

export async function searchKnowledgeBase(
  query: string,
  role: Role | "shared",
  limit: number = RAG_MATCH_COUNT
): Promise<KnowledgeItem[]> {
  // TODO: implement pgvector search via Supabase RPC
  // Placeholder until DB is connected
  void query;
  void role;
  void limit;
  return [];
}

export async function retrieveContext(
  query: string,
  role: Role
): Promise<RagSearchResponse> {
  // Search role-specific + shared content
  const [roleResults, sharedResults] = await Promise.all([
    searchKnowledgeBase(query, role),
    searchKnowledgeBase(query, "shared"),
  ]);

  const results = [...roleResults, ...sharedResults]
    .filter((r) => (r.similarity ?? 0) >= RAG_MATCH_THRESHOLD)
    .slice(0, RAG_MATCH_COUNT);

  const context =
    results.length > 0
      ? results.map((r) => `[${r.source}]\n${r.content}`).join("\n\n---\n\n")
      : "No specific knowledge base context found for this query.";

  return { results, context };
}

export function formatRagContext(items: KnowledgeItem[]): string {
  if (items.length === 0) {
    return "No additional context available.";
  }
  return items.map((item) => `### ${item.source}\n${item.content}`).join("\n\n");
}
