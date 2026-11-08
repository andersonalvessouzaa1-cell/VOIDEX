## D1 parcial — build ligada ao mercado, 08/11/2026
Checklist de mods/arcanos do preset resolvido, agrupado por tipo/slug/nível com indicação dos equipamentos. Marcação manual local por preset; sem leitura do inventário e sem sincronização com a conta. Links somente para itens negociáveis do catálogo, ofertas de venda; nível exato deve ser conferido na oferta. Não calcula cópias simultâneas, fusão, armas/companheiros/fragmentos faltantes ou custo total. Não converte marcação em compra concluída. Hoje o checklist completo existe no único preset completo experimental, Dante; não inventar os demais.
Decisão: avançar a ligação Build→Mercado do D1 aprovado para aproveitar o mercado recém-publicado, sem bloquear pelo restante da curadoria. Uma linha por item/nível é checklist, não contagem de cópias exigidas. 57 verificações específicas (shopping-list + curated-loadout) e tipos aprovados. Publicação/verificação visual em andamento.

## Entrega M2 — mercado próprio, 08/11/2026
Implementado /mercado público e /conta/anuncios privado: criar, editar preço/quantidade e excluir ofertas próprias, catálogo de 1664 mods/arcanos negociáveis, filtros e mensagem /w copiável. Sem importação de preços externos, reputação ou presença inventada. Banco Supabase: migration public_market aplicada, RLS e permissões por coluna, consentimento público explícito, limite20/conta, validade pública30dias. Perfil/e-mail privados. Snapshot nickname/plataforma imutável; remover/recriar para corrigir.
Validação: 18 verificações JS específicas, tipos e lint direcionado; SQL real com dois usuários temporários comprovou isolamento, leitura anônima, bloqueio de falsificação, limite20, níveis, duplicação e exclusão; ROLLBACK removeu todas as fixtures. Revisão estática independente sem problemas importantes. Advisor: aviso de proteção de senhas vazadas (login usa somente Google), índice novo ainda sem uso; não ativar plano pago. Publicado commit87e18fd: Vercel READY dpl_7ca2Tzj77dozEsrrxKUCwZmLky6Y, https://acervovoid.vercel.app/mercado . HTTP200 mercado e busca BlindRage nível10; visitante em /conta/anuncios redireciona /entrar. Interface375px: busca/seleção/filtro funcionam, sem rolagem horizontal; sessão existente abre formulário privado, botão publicar desabilitado sem item e0/20anúncios. Não publicamos oferta da conta real. GitHub/PR1 atualizados. Próximo: moderação/denúncias e curadoria B1–B5 conforme plano, agrupar recursos. M2 não inclui reputação/moderação/disputas; projeto inteiro ainda não concluído. Agrupar entregas substanciais para economizar tokens.

## B2 parcial — incompatibilidades revisadas, 08/11/2026
Commitb417d99: registro explícito Intensify(6variantes), Continuity(4) e Stretch(4), com fonte comunitária por família. Editor bloqueia a inclusão de variante incompatível sem alterar seleção/números; permite remover/substituir. Presets completos também rejeitam conflitos revisados no servidor. Não agrupar por atributo: BlindRage/TransientFortitude continuam combináveis com uma variante Intensify; CunningDrift/Overextended continuam combináveis com Stretch. Outras famílias e disponibilidade de todos os itens não certificadas.
75 verificações específicas (warframe-mod-conflicts e curated-loadout), tipos e lint direcionado aprovados. Fontes/aliases exatos em lib/data-engine/warframe-mod-conflicts.ts; não repetir pesquisas dessas3famílias. GitHub atualizado; deploy READY dpl_6Y1yLqcb2cPL2Zby7zrqaCM7Lawt. UI pública validada: Intensify11/30 bloqueia ArchonIntensify e mantém11/30; remover a variante permite Archon16/30; BlindRage combina sem aviso de incompatibilidade,32/30excede2. PresetDanteAPI200preservado. Sem teste dentro do jogo. Recursos anteriores Exilus/WF8+1, quatro auras, duas posturas para12Glaives e Formas universais permanecem. B2ainda parcial; avançar demais validações ou cálculosB3/B4 conforme plano, sem expandir famílias por semelhança textual.

## Editor de companheiros — 08/11/2026
Commit c83fb17: aba Testar companheiros com catálogo sem peças avulsas, imagem, três mods estáticos revisados/ranks e tabela antes/depois. API /api/game-data/companion-lab; reutiliza motor com bloqueio de tipos ainda não suportados. Não recomenda preset completo nem simula capacidade/preceitos/arcanos.33 verificações específicas (companion-lab + companion-stat-comparison), typecheck e lint dos arquivos alterados aprovados. Código enviado ao GitHub. Publicado READY: dpl_EVavBa1yLiFFgzf4msEnHGktwqoj. API200 com catálogo sem peças avulsas e3mods. Interface validada em produção: Adarza vida310→1085 com Enhanced Vitality máximo; nível0→381,3; limpar→310; Lambeo MOA bloqueado sem cálculo. Sem teste in-game. Esta publicação também inclui a ampliação de pets e testes por arquivo do commit e244169.
Próximo: completar B1 (pets variáveis/modulares e revisão de arcanos por tipo) ou B2 conforme PLANO_MESTRE. Manter economia extrema e suites específicas.

## Economia e B1 — 08/11/2026
Regra do dono registrada em AGENTS.md: saída mínima/diff, leitura pontual e somente suítes afetadas. Runner aceita npm test -- tests/arquivo.test.ts e rejeita caminhos inválidos.
Motor ampliado para Kavats, Kubrows e Helminth Charger; classificação explícita bloqueia Venari, peças e companheiros modulares/variáveis. Validação específica:21 verificações de companheiros +42 de integração do preset aprovadas; typecheck aprovado. B1 continua parcial: faltam editor/presets de pets, variantes/modulares e arcanos por tipo. Código local/GitHub atualizado; não implantado nesta etapa (agrupar publicação com próxima entrega visível).

## Pasta única — 08/11/2026
Pasta CANÔNICA e única de desenvolvimento/publicação: /home/anderson/Documentos/GitHub/VOIDEX . Recebeu a versão atualizada, histórico Git, dependências e configuração local/Vercel. O caminho anterior work/acervovoid-release é apenas um link para esta pasta, sem segunda cópia. Backup das alterações antigas antes da unificação: [chatroot]/work/backups/VOIDEX-antes-unificacao-20261108.tar.gz, sem node_modules/caches. Não desenvolver no backup.
As instruções históricas para preservar a pasta original como cópia antiga estão superadas por esta unificação expressamente pedida pelo dono. Arquivos de autenticação CLI continuam privados em [chatroot]/work/github-auth e work/vercel-auth, fora do repositório.

## B1 parcial — sentinelas, 08/11/2026
Código d7d7279 enviado à branch GitHub. Comparação no preset: vida/escudos/armadura, usando somente catálogo sincronizado (não dataset legado manual). Diriga base700/150/80, mesmos valores com o preset atual de utilidade sem gatilhos. Suporte numérico para Enhanced Vitality, Calculated Redirection e Metal Fiber por rank; Linked mods sem Warframe deixam a linha sem cálculo; desconhecidos bloqueiam resultados. Pets/modulares ainda sem regras próprias, arma do companheiro continua separada. Não declarar B1 concluído nem arcanos por tipo já verificados.
verify370 testes0falhas, tipos/lint/build aprovados; log /tmp/acervo-companion-verify.log. Publicação READY: dpl_7aUGx78vtdbPNEGJZEkJA6qyBWfj; endpoint público Dante200, valores Diriga700/150/80 antes/depois e coberturaPARCIAL conferidos. Próximo: expandir B1 para pets/modulares com fontes atuais e cobertura explícita, depois B2.

# Acervo Void — retomada rápida
Atualizado em 08/11/2026. Leia AGENTS.md, este resumo e somente a próxima seção necessária do PLANO_MESTRE.md. Respostas curtas, sem agentes extras por padrão, sem repetir verificações já aprovadas quando não há alteração relevante.

## Estado e caminhos
- Produção gratuita: https://acervovoid.vercel.app — Vercel Hobby, projeto alpha-7ce7/voidex. Sem domínio pago, cobrança ou doações.
- Pasta ATIVA: /home/anderson/Documentos/GitHub/VOIDEX ; branch release/acervovoid-beta.
- Alterações antigas da pasta original preservadas no backup compactado; original agora é o projeto atualizado.
- GitHub privado andersonalvessouzaa1-cell/VOIDEX sincronizado na branch release/acervovoid-beta; main preservada em0b2ec02. Autorização CLI concluída. Não repetir envio por conector em lote gigante.
- Último código publicado91f7aef, implantação dpl_Bk7s8aYxK58cdxtkSRPzp99jNcpt. Commits posteriores são documentação.
- next-env.d.ts tem alteração gerada preexistente; não incluir sem necessidade.

## Contas concluídas
- Supabase Free São Paulo, projeto pforidkmdcrgzzwtotkf. Projeto antigo ckbdzkydzodbfvuxabjc pausado: preservar.
- Google Cloud elated-parser-514106-v1, marca Acervo Void, cliente Web criado, provedor Google ENABLED. Audiência EXTERNA EM PRODUÇÃO confirmada, com autorização do dono. Não recriar credenciais nem adicionar testadores.
- Login real, sessão privada, logout e proteção de /conta aprovados no navegador. Dono confirmou que nickname/plataforma continuam salvos após atualizar a página. Esta persistência foi confirmada pelo usuário, não inspecionada novamente pelo agente.
- /entrar, /conta, /auth/callback, /privacidade, /termos publicados. Links públicos e homepage salvos com sucesso no branding Google.
- Conta real separada dos perfis/anúncios locais da demonstração. Nenhuma verificação de identidade no jogo, nenhuma senha do jogo ou troca automática.
- profiles com RLS e privilégios por coluna: usuário só lê/cria/edita próprio nickname/plataforma. Migrations aplicadas, testes SQL com rollback e REST anônimo401 aprovados; advisors sem avisos após restringir função auto-RLS. Não reaplicar migrations.
- SDKs Supabase SSR0.12.7/JS2.119.0 fixados. Chaves públicas nas variáveis Vercel; segredos OAuth somente no Supabase. Nunca imprimir .env.local, configuração Vercel ou chaves privadas.

## Produto atual e limitações
- Tema Matrix Green preservado. Build Lab: preset completo experimental somente Dante/Roar, NAO_TESTADO em jogo. Demais personagens ainda sem presets completos.
- Cálculos parciais; editor livre de armas/mods com ranks e modos de ataque. Catálogo não equivale a builds completas.
- Mercado demonstrativo local com preços/vendedores de exemplo. LiveMarketAnalysis não montado, /api/market ausente nesta cópia; não dizer integração real pronta.
- Responsividade conferida em trechos desktop/375px, não no site inteiro. Não prometer100%concluído.

## Validação e publicação
- Último npm run verify aprovado:359 testes,0falhas, tipos/lint/build; /tmp/acervo-privacy-verify.log. /privacidade e /termos HTTP200 com conteúdo conferido.
- Vercel CLI65.12.1 já autenticada em work/vercel-auth (não ler arquivos secretos); executável cache /tmp/acervo-npm-cache/_npx/69f9afb961c37556/node_modules/.bin/vercel. Deploy --prod --yes --scope alpha-7ce7 --global-config [chatroot]/work/vercel-auth.
- vercel.json outputDirectory .next-build; não trocar por .next. Domínio associado acompanha produção automaticamente.

## Próxima tarefa
Concluir B1companheiros: pets/modulares e revisão de arcanos por tipo; sentinelas têm comparação parcial. Depois B2capacidade/polaridades, B3/B4cálculos, B5curadoria, M1–M3mercado real e limites compartilhados, acessibilidade/responsividade e validação final. Seguir critérios do PLANO_MESTRE.

## GitHub concluído
Autorização oficial GitHub CLI concluída. Branch release/acervovoid-beta enviada e hash remoto9f4d35b conferido igual ao local antes desta atualização documental. origin/main atualizado por fetch para0b2ec02; sem commits de main ausentes na branch ativa. Main preservada. Credenciais privadas em work/github-auth; nunca imprimir hosts.yml/token. Usar GH_CONFIG_DIR específico e credential helper somente no comando, pois ~/.gitconfig é somente leitura. CLI oficial /tmp/acervo-github-cli/gh v2.103.3. Conferência de arquivos versionados sem credenciais reais; único marcador sb_secret é fixture fictícia no teste. Este resumo substitui estados antigos em documentos históricos.

Unificação concluída: arquivos versionados, hash Git e configuração local/Vercel conferidos antes da remoção da cópia. Caminho anterior convertido em link simbólico para a pasta canônica (uma só cópia física).370 testes, tipos e lint passaram em /tmp/acervo-unificacao-verify.log; primeira compilação falhou sem detalhe, reprodução de build com --debug terminou exit0 sem alterar código (/tmp/acervo-unificacao-build-debug.log). Não afirmar causa da falha inicial como diagnosticada. Sem necessidade de nova publicação: apenas mudança da pasta local e documentação.

Fonte WFCD Mods.json consultada nesta etapa não trouxe campos de incompatibilidade/família nas entradas Intensify/ArchonIntensify/PrimedContinuity; manter registro explícito com fontes, sem inferir regra por atributo.
