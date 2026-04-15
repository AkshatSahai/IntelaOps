# /ingest-kb

Runs the knowledge base ingestion pipeline to embed and upload content to Supabase pgvector.

## Prerequisites

1. Supabase project created with migration 005 applied
2. `.env.local` populated with:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`

## Command

```bash
npx tsx knowledge-base/ingest.ts
```

## What It Does

1. Walks all `.md` files in `knowledge-base/`
2. Chunks each file (~512 tokens with 64-token overlap)
3. Generates embeddings via OpenAI `text-embedding-3-small`
4. Upserts each chunk into `public.knowledge_items` with role and source metadata

## Re-ingestion

Re-running the script will insert duplicate records. To re-ingest from scratch:
```sql
truncate table public.knowledge_items;
```
Then re-run the ingest script.

## Adding New Content

1. Add or edit a markdown file in `knowledge-base/<role>/`
2. Run the ingest script
3. Test retrieval with `/api/rag` endpoint

## Estimated Cost

~$0.002 per 1M tokens with `text-embedding-3-small`. The entire knowledge base
(~15 files, ~50 chunks each) costs approximately $0.001 to ingest.
