-- ============================================================
-- 005: Knowledge Base (pgvector RAG)
-- Stores chunked knowledge base content with embeddings.
-- Requires the pgvector extension.
-- ============================================================

create extension if not exists vector;

create table if not exists public.knowledge_base (
  id          uuid primary key default gen_random_uuid(),
  role        text not null check (role in ('product-owner', 'business-analyst', 'shared')),
  topic       text not null,
  chunk_index integer not null,
  content     text not null,
  embedding   vector(1536),
  created_at  timestamptz not null default now(),
  unique (role, topic, chunk_index)
);

-- IVFFlat index for approximate nearest-neighbour search
create index if not exists knowledge_base_embedding_idx
  on public.knowledge_base
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index if not exists knowledge_base_role_idx on public.knowledge_base (role);

-- RLS: knowledge base is read-only for authenticated users
alter table public.knowledge_base enable row level security;

create policy "Authenticated users can read knowledge base"
  on public.knowledge_base for select
  using (auth.role() = 'authenticated');

create policy "Service role can insert knowledge items"
  on public.knowledge_base for insert
  with check (auth.role() = 'service_role');

-- pgvector similarity search function
create or replace function public.match_knowledge_base(
  query_embedding vector(1536),
  match_threshold float,
  match_count     int,
  filter_role     text
)
returns table (
  id          uuid,
  role        text,
  topic       text,
  chunk_index integer,
  content     text,
  similarity  float
)
language sql stable
as $$
  select
    id,
    role,
    topic,
    chunk_index,
    content,
    1 - (embedding <=> query_embedding) as similarity
  from public.knowledge_base
  where
    (role = filter_role or role = 'shared')
    and 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
