# Contas reais — Supabase Free e Google

Decisão do dono: custo zero; Entrar com Google. Vercel permanece Hobby. Não habilitar cobrança, SMS pago, domínio pago, Pro ou serviço de e-mails pago. O login Google evita depender de SMTP. Fontes oficiais: https://supabase.com/pricing ; https://supabase.com/docs/guides/auth/social-sign-in/auth-google ; https://supabase.com/docs/guides/auth/server-side/creating-a-client ; https://supabase.com/docs/guides/database/postgres/row-level-security . Consultadas em 08/11/2026.

## Código preparado

- /entrar: autenticação Google por PKCE; sem configuração, botão bloqueado com aviso.
- /auth/callback: troca de código por sessão e destino fixo /conta, sem redirecionamentos livres.
- /conta: sessão verificada pelo Supabase no servidor; perfil privado e saída da sessão.
- Perfil: apenas nickname e plataforma editáveis. ID vem da sessão; sem reputação ou papel administrativo editável. E-mail não é duplicado na tabela profiles.
- SQL em supabase/migrations/202611080001_profiles.sql: RLS para o próprio dono e permissões por coluna. Teste transacional em supabase/tests/profiles_rls.sql, com rollback obrigatório; executar apenas em banco de teste/novo, sem dados reais.
- Perfis/anúncios locais continuam demonstrativos e separados; não viram autenticação nem anúncios públicos.

## Configuração externa que falta concluir

1. Dono cria projeto Acervo Void na organização FREE, região São Paulo, com a senha guardada por ele. Preservar projeto antigo pausado ckbdzkydzodbfvuxabjc; não reutilizar nem apagar dados dele.
2. Executar a migration no novo projeto, depois testar RLS. Verificar tabela vazia e políticas; não presumir que o SQL foi aplicado porque o arquivo existe.
3. Configurar no Supabase Auth a Site URL https://acervovoid.vercel.app e a URL de retorno https://acervovoid.vercel.app/auth/callback. Permitir localhost somente para desenvolvimento, sem curingas de produção.
4. Criar credenciais OAuth de aplicação Web no Google Auth Platform para o projeto do dono, sem habilitar faturamento. Configurar público External e dados de consentimento. Origem: https://acervovoid.vercel.app . Redirect autorizado do GOOGLE: https://PROJECT_REF.supabase.co/auth/v1/callback (é diferente do retorno do site).
5. Ativar Google em Supabase Auth → Providers, com Client ID e Client Secret do Google. O dono deve inserir os segredos diretamente no serviço; nunca no chat, no Git ou em variáveis NEXT_PUBLIC. Para público geral, retirar o app Google do modo de testes conforme as exigências do provedor; enquanto em testes, só contas autorizadas entram.
6. Inserir na Vercel apenas NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (chave pública/anon), conforme .env.example. Não usar service_role/sb_secret. Reimplantar para atualizar as variáveis públicas do build.
7. Testar cadastro/login real com consentimento do dono, sessão persistida, salvar/editar perfil próprio, logout e recusa de acesso sem sessão. Testar também um segundo usuário isolado. Somente então declarar contas ativas no site.

Google e Supabase têm termos e cotas próprios. O plano Free pode pausar por baixa atividade; isso não autoriza migração automática para plano pago. Catálogos do jogo continuam em arquivos, sem ocupar o banco de contas. Não adicionar trabalhos artificiais para contornar política de inatividade.

## Evidências e limites

Primeira verificação local: 359 testes, tipos, lint e build aprovados sem credenciais Supabase. Inclui testes de configuração, rejeição de chave secreta e whitelist do perfil. Esses testes não validam login Google ou isolamento real do banco. SQL/RLS e integração externa ficam pendentes até execução conferida. A beta pública anterior continua independente desta preparação enquanto não houver nova implantação.

## Estado confirmado em 08/11/2026

Projeto novo pforidkmdcrgzzwtotkf (Acervo Void), organização Free verificada, São Paulo. Projeto antigo pausado preservado. Integração oficial Supabase conectada.

Migration private_account_profiles aplicada. Teste SQL transacional aprovado: dono lê/edita somente o próprio perfil, edição alheia e inserção com outra identidade recusadas, timestamp não editável e anônimo sem acesso. Rollback conferido: 0 perfis e 0 usuários fictícios restantes, RLS ativo e 3 políticas. REST público sem sessão retornou 401.

Migration restrict_automatic_rls_event_trigger aplicada para restringir execução da função de evento criada pelo painel. Verificação de segurança do Supabase depois da correção: nenhum aviso. Site URL https://acervovoid.vercel.app e retorno exato /auth/callback salvos, sem curingas. Variáveis públicas adicionadas à produção Vercel e ao ambiente local; nenhuma chave administrativa utilizada.

Verificação final local com configuração pública: npm run verify, código 0; 359 testes, tipos, lint e build. Revisão independente não encontrou P0/P1/P2 no código de autenticação. Antes de configurar credenciais, os testes HTTP também confirmaram /conta sem sessão redirecionando para /entrar e destino externo ignorado no callback.

Bloqueio atual: Google Cloud exige que o dono ative a verificação em duas etapas da conta Google. A aba está em https://console.cloud.google.com/enable-mfa . Não clicar em teste com créditos nem ativar faturamento. Depois disso ainda é necessário criar/configurar o cliente OAuth Google, inserir o segredo diretamente no Supabase e testar login real antes da nova publicação. Perguntar ao dono qual contato de suporte pode aparecer no consentimento, sem publicar automaticamente o e-mail pessoal.

A integração de contas NÃO foi publicada nem validada com login real. A beta pública anterior permanece no ar. Não repetir criação do projeto ou migrations já aplicadas.

Atualização: MFA do Google resolvida, projeto Acervo Void Login criado (elated-parser-514106-v1). Identificação e e-mail de suporte autorizado preparados. Assistente aguarda o dono marcar o aceite da política de dados, Continuar e Criar. Cliente OAuth ainda não criado. Bibliotecas fixadas em versões exatas (SSR 0.12.7; JS 2.119.0), com verify359 aprovado novamente.
