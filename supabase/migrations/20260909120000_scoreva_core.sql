-- Scoreva core schema. Apply with `supabase db query` / MCP execute_sql after
-- creating a dedicated Scoreva project. Do not reuse unrelated existing projects.

create extension if not exists pgcrypto;

create table if not exists public.user_prefs (
  user_id uuid primary key references auth.users (id) on delete cascade,
  prefs jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_follows (
  user_id uuid primary key references auth.users (id) on delete cascade,
  teams text[] not null default '{}',
  competitions text[] not null default '{}',
  matches text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.device_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  token text not null,
  platform text not null check (platform in ('ios', 'android', 'web')),
  created_at timestamptz not null default now(),
  unique (token)
);

alter table public.user_prefs enable row level security;
alter table public.user_follows enable row level security;
alter table public.device_tokens enable row level security;

create policy "prefs_own" on public.user_prefs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "follows_own" on public.user_follows
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "tokens_own" on public.device_tokens
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
