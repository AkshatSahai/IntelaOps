-- ============================================================
-- 002: Sessions
-- Each conversation (guided or advisory) is a session.
-- ============================================================

create table if not exists public.sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  role             text not null,
  mode             text not null check (mode in ('guided', 'advisory')),
  artifact_type_id text,
  status           text not null default 'active'
                   check (status in ('active', 'completed', 'archived')),
  title            text not null default 'New Session',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger set_sessions_updated_at
  before update on public.sessions
  for each row execute function public.set_updated_at();

create index if not exists sessions_user_id_idx    on public.sessions (user_id);
create index if not exists sessions_role_idx       on public.sessions (role);
create index if not exists sessions_status_idx     on public.sessions (status);
create index if not exists sessions_updated_at_idx on public.sessions (updated_at desc);

-- Row Level Security
alter table public.sessions enable row level security;

create policy "Users can view their own sessions"
  on public.sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on public.sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sessions"
  on public.sessions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own sessions"
  on public.sessions for delete
  using (auth.uid() = user_id);
