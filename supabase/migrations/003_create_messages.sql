-- ============================================================
-- 003: Messages
-- All chat messages per session, ordered by created_at.
-- ============================================================

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  role       text not null check (role in ('user', 'assistant')),
  content    text not null,
  metadata   jsonb,
  created_at timestamptz not null default now()
);

create index if not exists messages_session_id_idx         on public.messages (session_id);
create index if not exists messages_session_created_at_idx on public.messages (session_id, created_at asc);

-- Row Level Security (via session ownership)
alter table public.messages enable row level security;

create policy "Users can view messages in their sessions"
  on public.messages for select
  using (
    exists (
      select 1 from public.sessions
      where sessions.id = messages.session_id
        and sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert messages into their sessions"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.sessions
      where sessions.id = messages.session_id
        and sessions.user_id = auth.uid()
    )
  );
