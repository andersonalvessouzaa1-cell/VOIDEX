-- Perfil privado: sem senhas, reputação, papel administrativo ou e-mail duplicado.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null check (nickname ~ '^[A-Za-z0-9_.-]{3,32}$'),
  platform text not null check (platform in ('pc', 'ps4', 'xbox', 'switch', 'mobile')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant usage on schema public to authenticated;
grant select on public.profiles to authenticated;
grant insert (id, nickname, platform) on public.profiles to authenticated;
grant update (nickname, platform) on public.profiles to authenticated;
create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_insert_own on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
