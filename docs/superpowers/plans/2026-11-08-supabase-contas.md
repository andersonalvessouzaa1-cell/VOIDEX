# Contas reais com Supabase — primeira etapa

Decisão do dono: tudo gratuito, login com Google; ainda criando conta administrativa Supabase. Não registrar senhas do jogo. Projeto ativo: cópia de publicação Acervo Void.

- Preparar configuração pública validada, clientes oficiais SSR/browser e sessão verificada no servidor. Sem service_role.
- Login Google com PKCE, callback fixo para /conta, erros genéricos e logout por ação de servidor. Sem aceitar redirecionamentos arbitrários.
- Perfil privado com nickname e plataforma, tabela ligada a auth.users, RLS de proprietário e permissões restritas por coluna. Não migrar automaticamente perfis de demonstração nem reputação inventada.
- Páginas /entrar e /conta, link Conta na navegação; sem configuração, informar indisponibilidade e bloquear o botão de login.
- Testar configuração inválida/chave secreta, validação do perfil e sessão ausente; verify e navegador. Preparar teste SQL para RLS, executável após criação do banco.
- Configuração externa: projeto Free do dono, migration, provedor Google (credenciais OAuth), URLs permitidas e variáveis na Vercel. Não pedir segredos no chat, não contratar planos. Só afirmar login funcional após teste completo com conta real autorizado pelo dono.

Limites: banco Free pode pausar por inatividade; uso gratuito tem cotas. Catálogos do jogo continuam locais, poupando o banco. Anúncios locais permanecem demonstrativos nesta etapa; contas reais não verificam identidade no Warframe.
