-- Execute após a migration em um projeto de teste. Tudo é revertido no fim.
-- Testa acesso privado e impedimento de mudar identidade/timestamp.
begin;
insert into auth.users (id, email) values
 ('00000000-0000-4000-8000-000000000001', 'rls-owner@example.invalid'),
 ('00000000-0000-4000-8000-000000000002', 'rls-other@example.invalid'),
 ('00000000-0000-4000-8000-000000000003', 'rls-empty@example.invalid');
insert into public.profiles (id, nickname, platform) values
 ('00000000-0000-4000-8000-000000000001', 'Owner_test', 'pc'),
 ('00000000-0000-4000-8000-000000000002', 'Other_test', 'pc');
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}', true);
do $$ begin
 if (select count(*) from public.profiles) <> 1 then raise exception 'RLS: leitura fora do proprietário'; end if;
 update public.profiles set nickname = 'Owner_updated' where id = '00000000-0000-4000-8000-000000000001';
 if not found then raise exception 'RLS: não permitiu editar perfil próprio'; end if;
 update public.profiles set nickname = 'Forbidden' where id = '00000000-0000-4000-8000-000000000002';
 if found then raise exception 'RLS: editou perfil alheio'; end if;
 begin
  insert into public.profiles (id, nickname, platform) values ('00000000-0000-4000-8000-000000000003', 'Forbidden', 'pc');
  raise exception 'RLS: inseriu identidade alheia';
 exception when insufficient_privilege then null;
 end;
 begin
  update public.profiles set created_at = now();
  raise exception 'Privilégios: permitiu editar timestamp';
 exception when insufficient_privilege then null;
 end;
end $$;
reset role;
set local role anon;
do $$ begin
 begin
  perform * from public.profiles;
  raise exception 'Privilégios: perfil exposto a anônimo';
 exception when insufficient_privilege then null;
 end;
end $$;
reset role;
rollback;
