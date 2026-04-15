-- ============================================================
-- 004: Artifacts
-- Generated artifacts per session, versioned.
-- ============================================================

create table if not exists public.artifacts (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null references public.sessions(id) on delete cascade,
  user_id          uuid not null references auth.users(id) on delete cascade,
  role             text not null,
  artifact_type_id text not null,
  title            text not null,
  content          text not null,
  version          integer not null default 1,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger set_artifacts_updated_at
  before update on public.artifacts
  for each row execute function public.set_updated_at();

create index if not exists artifacts_session_id_idx on public.artifacts (session_id);
create index if not exists artifacts_user_id_idx    on public.artifacts (user_id);

-- Row Level Security (via session ownership and direct user_id)
alter table public.artifacts enable row level security;

create policy "Users can view artifacts in their sessions"
  on public.artifacts for select
  using (auth.uid() = user_id);

create policy "Users can insert artifacts into their sessions"
  on public.artifacts for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.sessions
      where sessions.id = artifacts.session_id
        and sessions.user_id = auth.uid()
    )
  );

create policy "Users can update their own artifacts"
  on public.artifacts for update
  using (auth.uid() = user_id);
