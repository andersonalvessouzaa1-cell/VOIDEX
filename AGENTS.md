# VOIDEX: instruções para agentes de IA

Projeto: site de trocas de Warframe (Next.js 15, React 18, Tailwind). Pasta: `/home/anderson/Documentos/GitHub/VOIDEX`. Idioma da interface e dos commits: PT-BR.

## Regras que nunca mudam
1. Não invente dados. Preços de exemplo são rotulados como exemplo. A consulta real (Warframe Market) nunca usa os dados da demonstração.
2. O VOIDEX não acessa conta do jogo, não executa trocas e não faz "análise por IA". Não escreva texto que sugira isso.
3. Não altere o sentido dos textos de limitação. Pode reorganizar, não pode suavizar nem remover.
4. Edite o mínimo. Não reescreva arquivo inteiro, não renomeie, não apague. Preserve as quebras de linha (CRLF) dos arquivos.
5. Uma tarefa por vez. Por regra expressa do dono: executar apenas as suítes específicas afetadas (`npm test -- tests/arquivo.test.ts`), sem bateria completa por padrão; verificações de tipos/build somente quando necessárias. Depois, commit pequeno. Se uma verificação falhar 2 vezes na mesma causa, pare e relate o erro. Não "conserte" apagando teste.
6. Leia só os arquivos que a tarefa exige. Não varra o repositório inteiro.
7. Nunca declare "pronto" sem a saída do comando que prova.

## Sistema visual (tema Matrix Green, ja aplicado; siga, nao reinvente)
- Fonte do tema: 21st.dev (serafimcloud/matrix-green). Valores: borda `#003B00`, destaque/anel `#00FF41`, graficos `#00FF41/#008F11/#003B00/#0D0208`, raio 0, sombra `#00FF41` 20% (10px, espalhar 1px), fonte VT323.
- Tokens Tailwind: `void-*` (fundo preto e superficies verdes escuras), `energy-cyan` = VERDE `#00FF41` (nome antigo mantido; e a unica cor de acao e foco), `orokin-gold` = AMBAR `#FFB000` (somente valores de platina/ducats e avisos), `slate-*` = cinzas esverdeados de texto. `emerald/green/cyan` = verde, `amber/orange/yellow` = ambar, `rose/red` = erro.
- Fontes: `font-display` (VT323, so titulos, numeros grandes e rotulos curtos; nunca em paragrafos) e `font-sans` (Geist) para texto corrido.
- Raio zero: nao use `rounded-full` em selos; apenas em pontos de status e avatares. Painel de destaque: `.chamfer` + `.chamfer-in`.
- Evite: degradê em texto, brilho exagerado, manchas desfocadas, cards identicos em grade, cores fora da paleta acima.
- Logo: `public/voidex-mark.svg`, `public/voidex-logo.svg` e `app/icon.svg`.

## Fila de tarefas (nesta ordem)
**T0. Linha de base.** Crie branch `checkpoint-visual`, commite o estado atual, rode `npm install`, `npm run dev` e `npm run verify`. Registre o resultado em `docs/EXECUTION_STATUS.md`.

**T1. Restaurar testes.** `package.json` chama `scripts/run-tests.cjs`, que falta, e `tests/` foi apagado do disco. O commit antigo do Git ainda tem `tests/data-engine.test.ts`. Recupere com `git show HEAD:tests/data-engine.test.ts`, recrie o runner e deixe `npm test` verde. Procure antes se os testes de evidência, clipboard e dados locais existem em outra pasta ou branch.

**T2. Reforçar `lib/market-api.ts`.** Retry com backoff para 429 e 5xx (máximo 2), respeitar `Retry-After`, manter timeout, erro claro em PT-BR. Testes com `fetch` simulado. Sem novas dependências.

**T3. Modais** (`AuthModal`, `CreateListingModal`, `UserDashboardModal`). Aplicar o sistema visual (painel chanfrado) e acessibilidade: `role="dialog"`, `aria-modal`, foco preso, `Esc` fecha, foco volta ao botão que abriu.

**T4. Revisão visual.** Conferir em 375, 768 e 1280 px: sem rolagem horizontal, contraste legível, foco visível, `prefers-reduced-motion`. Trocar o SVG inline da Navbar por `/voidex-mark.svg`. Reduzir `font-mono` e degradês restantes em `MarketDemo`, `Comparison` e modais.

**T5. Documentação.** `docs/HANDOFF_NEXT_AGENT.md` está desatualizado (diz que não há rotas de API; existe `app/api/market`; cita outro caminho de pasta). Atualize.

**T6. Build Lab.** Só depois de T1 a T5 verdes: expandir para mais Warframes, armas e mods, com fonte de evidência por entidade.

## Formato da resposta de cada tarefa
Máximo 10 linhas: arquivos alterados, comando executado, resultado real, próximo passo. Sem repetir o código.

## Economia extrema (instrução do dono)
Buscas cirúrgicas com rg; ler assinaturas/tipos e somente os trechos necessários para editar. Respostas em diff mínimo, sem explicações conceituais. Não imprimir arquivos completos.
