# Build Lab visual — plano de implementação

Objetivo: reduzir a extensão inicial do laboratório e destacar imagens e valores sem mudar tema, fórmulas ou cobertura.
Arquitetura: navegação por botões com painéis preservados no cliente; imagens dos fragmentos resolvidas no servidor pela identidade da base WFCD. React/Next.js/Tailwind existentes.

- [x] Adicionar regressão de identidade normal/tauforjada dos fragmentos e observar falha.
- [x] Resolver imagem dos fragmentos no loadout-reader; usar null quando sem imagem confirmada.
- [x] Separar presets, editor de Warframes, armas e referências; manter estado ao alternar e foco visível.
- [x] Destacar retrato e quatro atributos; ampliar imagens dos mods e arcanos, mostrar efeitos por expansão, representar cada fragmento com sua imagem e bônus. Manter fontes e limitações.
- [x] Conferir no navegador desktop e 375px, alternância preservada, imagens, valores e personagem sem preset; npm run verify; commit somente da etapa.

Direção: preto #0D0208, superfícies verdes existentes, borda #003B00, ação #00FF41, avisos #FFB000; VT323 para atributos e títulos, Geist para leitura. Uma área principal por vez, retrato e números como foco, sem novas animações. Em celular, empilhar conteúdo e oferecer resultados antes dos detalhes.
