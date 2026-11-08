-- A opção de RLS automático do painel cria uma função de evento.
-- Ela deve ser executada pelo mecanismo do banco, não pelos clientes da API.
do $$ begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $$;
