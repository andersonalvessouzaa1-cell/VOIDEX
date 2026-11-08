# Editor livre de armas — plano de implementação

Objetivo: escolher armas do catálogo e testar até oito mods comuns revisados, com níveis individuais, sem alterar presets.
Arquitetura: índice/detalhes no servidor a partir de WFCD; regras puras de seleção e cálculo no cliente; comparação parcial já existente reutilizada.
Tecnologias: Next.js, React, TypeScript, dados locais sincronizados.
Spec: docs/BUILD_LAB_COMPLETO.md; incremento posterior a COMPARACAO_ARMAS_V1.md.

1. Testes primeiro para catálogo, grupos gerais e variantes; seleção inválida, duplicatas, famílias incompatíveis, ranks e limite de oito; valores reais de Spectra e Braton com versões normais dos mods.
2. Ampliar explicitamente os operadores revisados com versões normais de mods básicos. Não usar os slugs curtos que nesta base apontam para variantes Beginner/Expert. Fixar a identidade única dos novos mods e seus ranks; não inferir um operador para mods desconhecidos. Arcos e crítico pesado continuam bloqueados onde falta regra.
3. Criar weapon-lab.ts (tipos, compatibilidade inicial e rascunho puro), weapon-lab-reader.ts (catálogo e filtros no servidor) e API /api/game-data/weapon-lab?category=...&weapon=... . Categorias: primary, secondary, melee, sentinel_weapons. Não listar componentes de Zaw como armas montadas. Compatibilidade incerta retorna lista de mods vazia, nunca classe inventada.
4. Criar WeaponFreeLab.tsx: categoria, busca/arma selecionada, adicionar/remover mod, rank 0..máximo, limpar seleção e tabela por modo. Troca de arma/categoria limpa mods e resultados; respostas antigas são ignoradas. Estado experimental, não testado. Seletor inicial restrito a mods revisados e grupos gerais; regras especiais, exilus/stance dedicados, capacidade e polaridades não certificados.
5. Montar na página preservando presets e modo livre de Warframes. Testar navegador com Spectra, Primed Pistol Gambit máximo/nível 0, tentativa de Creeping Bullseye junto e troca de arma; verificar ausência de resultado antigo.
6. Rodar npm run verify, revisar e fazer commit só da etapa. Atualizar registro com cobertura real.

Fontes: WFCD/warframe-items (valores e identidades); Warframe Wiki Critical/Fire_rate (operadores já conferidos), Module:Mods/data (incompatibilidade de Creeping Bullseye), Mods e famílias de variantes. Seleção experimental não é validação completa do jogo. Não inclui DPS/dano, riven, arcanos, efeitos condicionais, evolução Incarnon ou montagem modular.
