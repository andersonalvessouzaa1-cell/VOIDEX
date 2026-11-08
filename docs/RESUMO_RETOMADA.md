## B2 parcial — posturas e auras, 08/11/2026
Commit6188429: API de detalhes das armas oferece Astral Twilight e Gleaming Talon somente para Glaive/Glaive Prime (compatibilidade explícita). Editor seleciona postura/rank/vaga neutra, igual ou diferente, soma bônus após Catalisador; não calcula combos/dano da postura. Demais armas sem postura revisada não ganham bônus presumido. Limpar mods também limpa postura.
Base sincronizada tem baseDrain-2, rankmáximo3 e polaridade, mas NÃO levelStats dessas posturas. Não inventar descrições/combos nem exigir levelStats para capacidade: slotCapacityBonus usa só custo/rank confirmados. Auras continuam exigindo seus dados existentes. Regra oficial https://www.warframe.com/en/news/przewodnik-po-modach : posturas somam capacidade como auras; bônus neutro5, igual10 e diferente4 no máximo. Quatro auras continuam publicadas: Corrosive Projection, Energy Siphon, Steel Charge, Growing Power (só capacidade).
59 verificações específicas (stance-capacity, weapon-lab, aura-capacity), tipos e lint direcionado aprovados. Código enviado ao GitHub; deploy READY dpl_9wPncf71cTEYUj63tr5it1y1wRLt. UI pública validada GlaivePrime/AstralTwilight: neutra35semCatalisador; igual70comCatalisador; diferente64; nível0diferente61; limpar60. Troca para primária remove seletor de postura. Sem teste dentro do jogo. Restam B2outras famílias de posturas, polaridade diferente de mods comuns, Exilus, Forma universal e certificação de encaixe. B1modulares/arcanos segue pendente. Próximo: ampliar classificação de armas com fonte para não inferir família por nome/ataque.

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
