import OpenAI from 'openai';
import type { RoleId, ArtifactTypeId, RagSearchResult } from '@/lib/types';
import { EMBEDDING_MODEL, RAG_MATCH_COUNT, RAG_MATCH_THRESHOLD } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';

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
    throw new Error('No embedding returned from OpenAI');
  }
  return embedding;
}

export async function searchKnowledgeBase(
  query: string,
  role: RoleId,
  artifactTypeId?: ArtifactTypeId
): Promise<string> {
  let embedding: number[];
  try {
    embedding = await generateEmbedding(query);
  } catch {
    return 'No knowledge base context available.';
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('match_knowledge_base', {
      query_embedding: embedding,
      match_role: role,
      match_artifact_type: artifactTypeId ?? null,
      match_count: RAG_MATCH_COUNT,
      match_threshold: RAG_MATCH_THRESHOLD,
    });

    if (error || !data) {
      return 'No knowledge base context available.';
    }

    const results = (data as RagSearchResult[]).filter(
      (r) => r.similarity >= RAG_MATCH_THRESHOLD
    );

    if (results.length === 0) {
      return 'No specific knowledge base context found for this query.';
    }

    return results
      .map((r) => `[${r.topic}]\n${r.content}`)
      .join('\n\n---\n\n');
  } catch {
    return 'No knowledge base context available.';
  }
}

export async function upsertKnowledgeChunk(
  role: RoleId | 'shared',
  topic: string,
  chunkIndex: number,
  content: string
): Promise<void> {
  const embedding = await generateEmbedding(content);
  const supabase = await createClient();

  const { error } = await supabase.from('knowledge_base').upsert({
    role,
    topic,
    chunk_index: chunkIndex,
    content,
    embedding,
  });

  if (error) {
    throw new Error(`Failed to upsert knowledge chunk: ${error.message}`);
  }
}
