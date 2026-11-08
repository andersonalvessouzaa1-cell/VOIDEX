# Editor livre de armas — primeira etapa

Permite escolher entre 595 entradas do catálogo local (197 primárias, 149 secundárias, 225 corpo a corpo e 24 armas de sentinela), adicionar/remover até oito mods comuns revisados e ajustar seus níveis. Componentes de Zaw não são armas montadas e ficam fora da lista.

A comparação parcial mostra crítico, multiplicador crítico, status e cadência onde existe regra conferida. Mudanças de arma limpam a seleção; duplicatas e famílias incompatíveis conhecidas são recusadas. Os presets continuam separados do rascunho.

Identidades de mods normais são fixadas pelo caminho da fonte WFCD para evitar variantes Beginner. O Power Throw do preset experimental também foi corrigido para a versão normal, nível máximo 5.

Limitações: estado NAO_TESTADO, sem teste dentro do jogo; catálogo inicial de mods restrito; compatibilidade geral não valida capacidade, polaridades, slots dedicados, Incarnon ou montagem modular. Dano/DPS, arcanos e efeitos condicionais não são calculados. Não representa presets completos para todos os Warframes.

Validação: npm run verify passou com 325 testes, tipos, lint e build. Navegador: Spectra Vandal com Primed Pistol Gambit passou de 57,4% no máximo para 23,4% no nível zero; conflito com Creeping Bullseye recusado; troca de arma limpou o rascunho; Power Throw normal exibido até nível 5. Produção local: API respondeu 200 para catálogo e detalhes, 400 para categoria inválida e 404 para arma ausente.

Próxima tarefa: comparação própria do companheiro com regras e fontes conferidas. Capacidade/polaridades, dano/DPS e expansão da curadoria para todos os Warframes permanecem pendentes.

A verificação corresponde à árvore local, que contém arquivos preexistentes ainda não versionados; não certifica um clone limpo.
