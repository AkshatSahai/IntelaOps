# Skill: Supabase Migration

Creates new database migrations for schema changes.

## File Convention

`supabase/migrations/<NNN>_<description>.sql`

Where NNN is the next sequential number (006, 007, etc.).

## Rules

1. Every table must have:
   - `id uuid primary key default gen_random_uuid()`
   - `created_at timestamptz not null default now()`
   - RLS enabled
   - At least one RLS policy
2. Every mutable table must have:
   - `updated_at timestamptz not null default now()`
   - A trigger calling `public.set_updated_at()`
3. Foreign keys should `on delete cascade` unless there's a specific reason not to
4. Always add indices for columns used in WHERE and ORDER BY clauses
5. Use `create table if not exists` and `create index if not exists` for idempotency

## RLS Policy Pattern

```sql
alter table public.my_table enable row level security;

create policy "Users can view their own rows"
  on public.my_table for select
  using (auth.uid() = user_id);
```

## Running Migrations

```bash
npx supabase db push
```

Or apply manually in the Supabase SQL editor for development.

## Testing Migrations

After applying:
1. Check the table exists in Supabase dashboard
2. Test RLS by authenticating as a user and attempting operations
3. Verify indices with `\d+ table_name` in psql
