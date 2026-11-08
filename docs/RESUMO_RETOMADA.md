## Contas Supabase — prioridade atual, 08/11/2026

Dono definiu custo zero e Entrar com Google. Projeto Acervo Void pforidkmdcrgzzwtotkf criado por ele no Supabase Free, São Paulo; projeto antigo pausado preservado. Integração oficial Supabase conectada.

Código na pasta ativa indicada abaixo, commit 835f55c: /entrar, /conta, callback PKCE, sessão validada no servidor, perfil privado e logout. Não mexer no AuthModal local da demonstração como se fosse conta real. 359 testes/tipos/lint/build passaram com a configuração pública; revisão de código sem P0/P1/P2.

Banco pronto: migrations private_account_profiles e restrict_automatic_rls_event_trigger aplicadas via integração oficial. Testes SQL de RLS e privilégios aprovados, rollback conferido (0 perfis/usuários fictícios restantes), REST anônimo401 e segurança sem avisos. Site URL https://acervovoid.vercel.app e retorno exato https://acervovoid.vercel.app/auth/callback salvos. Variáveis públicas Supabase configuradas localmente e na produção Vercel; não imprimir .env nem usar chave administrativa.

Google Cloud já liberado após a verificação em duas etapas. Projeto Google Acervo Void Login criado, ID elated-parser-514106-v1, sem ativar faturamento. Nome Acervo Void e contato da conta Google preenchidos; o dono autorizou expressamente esse e-mail como suporte. Bloqueio atual: ele precisa aceitar a política de dados e concluir o assistente em https://console.cloud.google.com/auth/overview/create?project=elated-parser-514106-v1 . A caixa de aceite permanecia desmarcada na última conferência. Não aceitar termos por ele nem repetir criação do projeto. Depois: criar cliente OAuth Web com origem https://acervovoid.vercel.app e redirect https://pforidkmdcrgzzwtotkf.supabase.co/auth/v1/callback; inserir segredo diretamente no Supabase; testar login real e publicar. Supabase SDKs fixados em 0.12.7 (SSR) e 2.119.0 (JS), lockfile atualizado e verify359 novamente aprovado.

Login Google AINDA NÃO ativo/publicado: falta cliente/provedor/teste real. Não repetir criação do banco ou migrations. Depois de configurar Google, implantar a nova versão via Vercel CLI e conferir login, perfil, logout e acesso privado. A beta pública atual permanece na versão anterior; GitHub remoto ainda não sincronizado. Detalhes em docs/SUPABASE_CONTAS.md.

## Acervo Void publicado — 08/11/2026

URL pública: https://acervovoid.vercel.app . Plano Vercel Hobby confirmado, custo zero, sem domínio pago/trial ou cobrança habilitada. Endereço adicionado ao projeto para acompanhar produção, não apenas alias temporário. Acesso público sem login confirmado.

Pasta ATIVA de publicação: /home/anderson/Documents/Codex/2026-11-07/home-anderson-documentos-github-github-plugin/work/acervovoid-release ; branch local release/acervovoid-beta. Código publicado: fdbf2dd (base 01eaf55). Original /home/anderson/Documentos/GitHub/VOIDEX preservado com alterações anteriores; não desenvolver na cópia antiga sem reconciliar as diferenças.

Verificação: npm ci; npm run verify com 335 testes, tipos/lint/build aprovados. Correção posterior apenas em vercel.json alinhou outputDirectory a .next-build; build remoto final aprovado. Publicação direta pelo programa oficial Vercel CLI 65.12.1, autorizada pelo dono e autenticada por ele. Projeto alpha-7ce7/voidex; implantação 5Q5WcnvGmPv1cr1ou3Nu63KfANAc.

Conferência pública sem autenticação: página HTTPS200 com marca/aviso beta, API Dante200 e força313%, Warframes200, catálogo armas200, duas imagens200 (Pagemaster e fragmento âmbar tauforjado), diagnóstico404; navegador confirmou seleção e valores313%/181,5%/45%/145%.

GitHub remoto ainda está na versão antiga: o CLI Git não tem credencial, e o pacote via conector excedeu o limite da revisão automática. Envio foi resolvido pelo CLI da Vercel com autorização do dono. Não houve push/branch remota da nova versão. Futuro push da main antiga pode reverter a publicação; sincronizar a cópia ativa com o GitHub antes de voltar a usar deploy automático. Tokens/arquivos .env da Vercel ficam locais/ignorados; não publicar nem exibir.

Beta, NÃO projeto completo: mercado demonstrativo identificado; só Dante tem conjunto completo experimental NAO_TESTADO. Cálculos/editores parciais, sem garantia Anti-Ban, sem doações/pagamentos na beta. Marca não certificada juridicamente. H1 concluído; H2 parcial (beta no ar), P0/Q3 receberam cópia versionada e instalação isolada, mas GitHub ainda precisa sincronizar.

Próximas tarefas: sincronização segura do código publicado no GitHub; B1 companheiros; B2 capacidade/polaridades; B3/B4 cálculos; B5 curadoria de todo catálogo; M1–M3 mercado real e controle compartilhado; acessibilidade/responsividade integral e demais critérios do PLANO_MESTRE. Não repetir a publicação nem a recuperação do motor. Não marcar etapas por mera existência da interface.

# VOIDEX — retomar por aqui
Atualização: 08/11/2026. Pasta: `/home/anderson/Documentos/GitHub/VOIDEX`.

Decisão mais recente: orçamento zero confirmado; sem compra de domínio. VoidAcervo é candidato provisório, marca pendente (INPI falhou), subdomínio gratuito ainda não verificado. Código mantém VOIDEX. Revisão visual autorizada preservando Matrix Green, funcionalidades e limitações; frontend-design instalada.

1. Leia AGENTS.md e este resumo; depois somente a tarefa necessária em docs/PLANO_MESTRE.md. Não reler toda a pasta.
2. Objetivo: mercado útil integrado a builds completas de todos os Warframes, armas e companheiros; fontes rastreáveis, tema Matrix Green, orçamento inicial zero, publicação HTTPS em endereço gratuito. Sem acesso ao jogo ou trocas automáticas.
3. Feito: motor recuperado, conjunto experimental Dante/Roar, comparações parciais de armas e editor livre com ranks. Só Dante tem conjunto completo cadastrado; NAO_TESTADO. Publicação Acervo Void: fdbf2dd na cópia ativa indicada acima.
4. Última evidência em 08/11/2026: verify com 329 testes, tipos/lint/build; melhoria visual conferida no navegador desktop e 375px. Não afirmar validade após mudanças sem nova verificação.
5. Git contém muitas alterações e arquivos não versionados anteriores. Não apagar/resetar nem adicionar tudo. Clone limpo ainda precisa ser validado.
6. Próxima execução: P0 (conferir arquivos necessários/versionamento para prévia pública gratuita), depois B1 (companheiros). Primeira matriz R1 e melhoria visual em REFERENCIAS_VISUAL_V1.md: navegação por modo, retrato/atributos, imagens maiores e fragmentos; inspeção integral das referências ainda pendente. Fila e critérios completos no plano mestre. Não repetir a implementação do editor de armas.
7. Pendências maiores: capacidade/polaridades, cálculos completos, companheiros, curadoria de todo catálogo, mercado real completo, diferenciais, acessibilidade, segurança e publicação. Não confundir catálogo com presets.
8. Warframe.market proíbe clones com sua API; agregar valor próprio. Usar APIs públicas com identificação/cache/limites. Não copiar conteúdo nem contornar bloqueios.
9. Hospedagem proposta: Vercel Hobby se elegível para uso pessoal/não comercial; subdomínio gratuito. Alternativa Cloudflare sujeita a teste. Domínio próprio não cabe como promessa gratuita. Nada publicado/registrado nesta tarefa.
10. Economia: ler arquivos direcionados, reutilizar fontes, saídas curtas, sem agentes extras por padrão. Documentar evidência/commit/próximo passo ao encerrar. Nenhuma skill adicional necessária.

Pedido para outro chat/IA: “Continue o VOIDEX lendo AGENTS.md e docs/RESUMO_RETOMADA.md. Execute somente a próxima tarefa do docs/PLANO_MESTRE.md; preserve alterações existentes, use fontes e registre validação e próximos passos.”
