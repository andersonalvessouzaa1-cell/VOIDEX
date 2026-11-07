# VOIDEX: correções de imagens e Build Lab completo

Colocar em `C:\Projetos\VOIDEX\docs\CORRECOES_IMAGENS_E_BUILD_LAB.md`. Vale junto com o `AGENTS.md` (regras, tema e formato de resposta). Em conflito, vale o `AGENTS.md`.

## 1. O que já funciona (não refazer)
- Imagem do Dante no Build Lab, via `/api/warframe-image?name=Dante` (confirmado em print pelo dono do projeto).
- Proxy `/api/market-image?path=...` e componente `components/ItemImage.tsx` (aceita `path` do Warframe Market ou `src` interno; cai para a marca do VOIDEX se falhar).
- Busca de preços reais (`LiveMarketAnalysis`) com catálogo do Warframe Market (3893 itens). **Pendente confirmar** se as miniaturas aparecem: o texto "N itens (X com imagem)" mostra o número.
- Tema Matrix Green, `lib/market-api.ts` com retry, 21 testes passando.

## 2. Problemas reportados (com evidência)
1. **Mercado de exemplo sem imagens.** Todo item (ex.: Hildryn Prime Set, Sevagoth, Nova) mostra só o ícone da marca. Os 77 "Destaques" vêm de uma lista local (`WARFRAME_ITEMS_DB` em `components/MarketDemo.tsx`), sem imagem, com preços de exemplo. As peças (Projeto/Blueprint, Neurovisores/Neuroptics, Chassi/Chassis, Sistemas/Systems) também não têm imagem.
2. **Build Lab só tem o Dante** (`lib/build-simulator.ts`, 4 mods calculados). O dono quer **todos os Warframes, todas as armas primárias, secundárias e corpo a corpo, e todos os mods**, com imagem.
3. **A base do motor tem muitos valores vazios.** Em `lib/data-engine/dataset/*` os números aparecem como `{ value, status: 'MISSING', confidence: 0 }`. Não são dados reais verificados.
4. A suíte antiga `tests/_pending/data-engine.legacy.ts` está defasada em relação a esse formato.

## 3. Decisão de arquitetura (recomendada)
**Uma fonte única de dados reais, sincronizada por script, usada por mercado e Build Lab.** Nada digitado à mão e nada inventado.
- Itens negociáveis (conjuntos Prime, peças, mods, armas negociáveis): catálogo do Warframe Market (`https://api.warframe.market/v2/items`, campos `i18n.<idioma>.name/icon/thumb`, `tags`, `ducats`). Imagem em `https://warframe.market/static/assets/<thumb>` (já temos o proxy).
- Warframes base, armas e mods com estatísticas: base comunitária **warframestat.us** (`https://api.warframestat.us/...`, campo `imageName`, imagem em `https://cdn.warframestat.us/img/<imageName>`) ou o pacote npm `@wfcd/items`, que reúne os dados oficiais exportados pelo jogo. **Verificar antes de usar:** disponibilidade, formato dos campos, licença e termos de uso. Os nomes de campos acima vêm de documentação pública, não foram testados neste ambiente.
- Imagem: continuar servindo pelo próprio site (proxy com cache). Baixar e guardar no repositório só se o dono decidir, pelo peso e pelos direitos de imagem da Digital Extremes.

## 4. Tarefas (nesta ordem; uma por vez)
**I0. Verificação rápida (portão).** Rodar `npm run dev`. Na busca real, anotar "N itens (X com imagem)". Abrir `/api/market-image?path=<um thumb real>` e `/api/warframe-image?name=Excalibur`. Registrar o resultado em `docs/EXECUTION_STATUS.md`. Se X = 0, o campo de imagem do catálogo tem outro nome: inspecionar `/api/market` e ajustar `parseMarketCatalog` + teste.

**I1. Proxy genérico de imagem da CDN.** Criar `/api/cdn-image?name=<imageName>` (valida com `validCdnImageName`, cache longo). Os dados sincronizados já trarão `imageName`, então não é preciso consultar a API por nome a cada pedido. Manter `/api/warframe-image` só como reserva.

**I2. Script de sincronização `scripts/sync-game-data.mjs` (`npm run sync:data`).** Baixa Warframes, armas primárias, secundárias, corpo a corpo, mods, arcanos, fragmentos e Helminth; normaliza para o schema do `lib/data-engine` com `value`, `status` (`VERIFIED` quando vier da fonte, `MISSING` quando faltar), `confidence`, `source`, `fetchedAt`; grava em `lib/data-engine/dataset/generated/*.json` e `manifest.json` (data, versão do jogo, contagens por categoria). Proibido preencher valor ausente por estimativa. Rodar na máquina do dono (precisa de internet).

**I3. Cobertura e imagem por entidade.** Campo `image` em todas as entidades. Gerar `docs/DATA_COVERAGE.md` com: total por categoria, quantas têm imagem, quantas têm stats completos, o que está `MISSING`. Teste automático: nenhuma entidade sem `slug`, `name` e fonte.

**I4. Mercado unificado e com imagens.** O mercado de exemplo passa a usar o catálogo real:
- categorias e busca a partir de `tags` do `/v2/items` (Warframes Prime, armas, mods, arcanos, fragmentos etc.);
- imagem pelo `thumb` de cada item; ducats reais;
- peças do conjunto resolvidas pelos slugs reais (ex.: `<nome>_prime_set`, `_blueprint`, `_neuroptics_blueprint`, `_chassis_blueprint`, `_systems_blueprint`), **conferidos contra o catálogo, sem montar slug por suposição**;
- preços só reais (consulta já existente). Se algo de exemplo permanecer, o rótulo "exemplo" continua visível;
- anúncios locais (criar/pausar) ficam como estão;
- paginar ou virtualizar a lista (milhares de itens).

**I5. Build Lab, fase A: todos os Warframes.** Seletor com busca e imagem de todos os Warframes. Calcula vida, escudos, armadura e energia no nível 30 e as estatísticas de habilidade (força, duração, eficiência, alcance) a partir dos dados sincronizados. Lista completa de mods de Warframe com filtro de compatibilidade, polaridade e capacidade. Generalizar `calculateBuild` (hoje só aceita `DANTE_BASE`).

**I6. Build Lab, fase B: todas as armas.** Seletor por categoria (primárias, secundárias, corpo a corpo) com imagem e estatísticas base. Mods de arma, regras de combinação de elementos, crítico, status, multishot, cadência e DPS. **Cada fórmula precisa de fonte citada e de pelo menos um caso de teste com valor conferido em fonte pública (wiki).** Sem caso verificado, o resultado não aparece como número.

**I7. Fase C: extras.** Arcanos, fragmentos de Archon, Helminth, companions e Riven.

**I8. Fechamento.** Reescrever os testes do motor para o schema novo (substituir `tests/_pending/data-engine.legacy.ts`), atualizar `docs/EXECUTION_STATUS.md` e `docs/HANDOFF_NEXT_AGENT.md`.

## 5. O que significa "completo" (níveis)
- **N1** catálogo + imagem de 100% dos Warframes, armas, mods e peças negociáveis.
- **N2** estatísticas base e mods de todos os Warframes.
- **N3** armas com DPS e elementos.
- **N4** efeitos condicionais, arcanos e interações especiais.

Entregar e validar N1 e N2 antes de N3. N4 é trabalho contínuo: o jogo muda a cada patch, então o `manifest.json` registra a versão e a data da última sincronização, e a tela deve mostrar isso. "Exatamente completo" no sentido do jogo inteiro só se garante com testes de referência por fórmula.

## 6. Regras
1. Nenhum número, preço ou imagem inventado. Ausente fica `MISSING` e aparece como "sem dado", não como zero.
2. Cada valor guarda a fonte. A tela mantém os avisos de cobertura e de "não é simulador completo de combate" até N4.
3. Edição mínima, uma tarefa por vez, `npm run verify` e commit pequeno depois de cada uma. Se falhar 2 vezes pela mesma causa, parar e relatar.
4. Imagens só pelo proxy do site. Nunca `<img>` apontando direto para fonte externa.
5. Tema e fontes seguem o `AGENTS.md` (Matrix Green, raio 0).

## 7. Decisões pendentes do dono do projeto
- Fonte de dados dos Warframes, armas e mods: warframestat.us/`@wfcd/items` (recomendada) ou outra.
- Imagens: servir pelo proxy com cache (recomendado) ou baixar para o repositório.
- Manter algum conteúdo de exemplo no mercado ou usar só dados reais.
- Prioridade se o prazo apertar: N1 e N2 primeiro.

## 8. Comando curto para outra IA
```
Leia só o AGENTS.md e docs/CORRECOES_IMAGENS_E_BUILD_LAB.md na raiz do projeto e execute APENAS a próxima tarefa (I0 a I8) ainda não feita. Siga as regras. Ao terminar, responda em no máximo 10 linhas: arquivos alterados, comando executado, resultado real, próximo passo.
```
