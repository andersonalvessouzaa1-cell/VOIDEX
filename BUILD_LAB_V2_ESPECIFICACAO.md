# VOIDEX: Build Lab v2 (especificação)

Colocar em `C:\Projetos\VOIDEX\docs\BUILD_LAB_V2_ESPECIFICACAO.md`. Complementa `docs/CORRECOES_IMAGENS_E_BUILD_LAB.md` (dados e níveis N1 a N4) e `docs/PLANO_PARIDADE_WARFRAME_MARKET.md`. Regras do `AGENTS.md` valem aqui.

## 1. O que o dono quer (fluxo)
1. Escolher **o que testar**: Warframe, arma primária, secundária, corpo a corpo, companheiro. (A confirmar com o dono: "terceira arma" = corpo a corpo? Entram também Archwing, Necramech, Kitgun, Zaw e Amp?)
2. Escolher o item numa busca **com imagem** (todos os do jogo, não só o Dante).
3. Escolher um **preset de build** do item: por exemplo Dano, Suporte, Tanque, Equilibrada (pode haver mais, por item).
4. Ver o **preset completo**: lista de mods (imagem, nome, nível), arcanos, **fragmentos de Archon** (cor e efeito) e **Helminth** (habilidade trocada).
5. Mudar o **nível dos mods** (ex.: nível 10) e ver **antes e depois** dos atributos, com o ganho em pontos percentuais, como já existe para o Dante.
6. Ver sempre o **selo de verificação** e a **fonte** da build.

Hoje existe só o passo 5, só para o Dante, com 4 mods de uma lista fixa.

## 2. Regra central: nada de número inventado
Cada build tem um estado, sempre visível na tela:

| Estado | Significa | Pode afirmar |
|---|---|---|
| `TESTADO_NO_JOGO` | Alguém do projeto montou e conferiu no jogo; registra quem, quando, versão do jogo e prova (captura ou vídeo) | "Testado no jogo em <data>, versão <x>" |
| `FONTE_COMUNITARIA` | Montada por terceiros em fonte pública, com link e data de consulta; não conferida por nós | "Build da fonte <nome>, não testada por nós" |
| `NAO_TESTADO` | Combinação sem fonte nem teste; só o cálculo | "Não testada. Estes números são um cálculo com os efeitos dos mods" |

Em qualquer estado, os números mostrados vêm de **duas origens apenas**: dados do jogo sincronizados (atributos base, efeitos dos mods) e a conta feita pelo motor. Nada digitado de memória. Dado ausente aparece como "sem dado", nunca como zero. Hoje **nenhuma build foi testada**, então todas começam como `FONTE_COMUNITARIA` ou `NAO_TESTADO`. O estado só sobe para `TESTADO_NO_JOGO` com prova anexada.

O Build Lab mostra o que o jogador **não vê no jogo** antes de gastar: como ficariam os atributos se comprasse um mod que ainda não tem (ex.: Stretch).

## 3. Modelo de dados (TypeScript, em `lib/data-engine/`)
```ts
type BuildStatus = 'TESTADO_NO_JOGO' | 'FONTE_COMUNITARIA' | 'NAO_TESTADO';
type BuildRole = 'dano' | 'suporte' | 'tanque' | 'equilibrada' | 'personalizada';

interface BuildPreset {
  id: string;
  targetType: 'warframe' | 'primaria' | 'secundaria' | 'melee' | 'companheiro';
  targetSlug: string;            // slug do item nos dados sincronizados
  name: string;                  // ex.: "Dante: Suporte"
  role: BuildRole;
  mods: { modSlug: string; rank: number; slot: string }[];
  arcanes: { slug: string; rank: number }[];
  shards: { slot: number; color: 'carmesim' | 'ambar' | 'azul' | 'violeta' | 'topazio'; tauforged: boolean; effectId: string }[];
  helminth?: { replacedAbility: string; subsumed?: string };
  status: BuildStatus;
  source: { kind: 'proprio' | 'comunidade'; name?: string; url?: string; retrievedAt: string };
  gameVersion: string;
  test?: { by: string; at: string; proof: string };   // só se TESTADO_NO_JOGO
  notes?: string;
}
```
Validações obrigatórias (testes automáticos): mods sem repetição, número de vagas por tipo respeitado, **capacidade total de mods** dentro do limite considerando polaridades e catalisador/reator, nível dentro do máximo de cada mod, todos os `slug` existem nos dados sincronizados.

## 4. Arcanos, fragmentos de Archon e Helminth
- **Fragmentos de Archon:** cinco cores (carmesim, âmbar, azul, violeta, topázio), com versão tauforjada. Cada cor tem efeitos próprios. Mostrar a cor, se é tauforjado e o efeito com o valor. Os valores e o número de vagas por Warframe vêm de fonte sincronizada; **conferir na fonte antes de exibir**.
- **Helminth:** o dono escreveu "helmet"; interpretado como o sistema Helminth (trocar uma habilidade por outra subsumida). Se for outra coisa, corrigir aqui antes de implementar.
- **Arcanos:** nome, nível e efeito, por Warframe e por arma quando aplicável.
- O "antes e depois" passa a somar o efeito dos fragmentos e arcanos separadamente dos mods, para o jogador ver de onde vem cada ganho.

## 5. Tela (resumo)
Seletor de categoria → busca com imagem → abas de preset (Dano, Suporte, Tanque, outras) → quadro com mods (imagem, nível ajustável), arcanos, fragmentos e Helminth → painel "Antes e depois" com variação e selo de verificação + fonte + data. Item sem preset mostra "Ainda sem preset" e permite montar a build manualmente. Celular: uma coluna, painel de resultado fixo no topo.

## 6. Onde os presets vêm
Os presets **não são escritos de cabeça por IA** (builds mudam a cada patch). Caminhos:
1. O dono monta e testa no jogo e cadastra (`TESTADO_NO_JOGO`).
2. Cadastro com link de fonte pública, ex.: Overframe (já usada nos efeitos dos mods), marcado `FONTE_COMUNITARIA` com data de consulta.
3. Combinação livre do jogador, sempre `NAO_TESTADO`.
Decisão do dono: quem cadastra e em que ordem (começar pelos Warframes mais usados).

## 7. Ordem de execução
**BL1.** Tipos, validações e testes (seção 3). Preset atual do Dante vira o primeiro registro, estado `FONTE_COMUNITARIA`.
**BL2.** Tela nova: seletor de item + abas de preset + selo de verificação, ainda só com o Dante.
**BL3.** Dados completos sincronizados (Warframes, armas, mods, arcanos, fragmentos) conforme `CORRECOES_IMAGENS_E_BUILD_LAB.md` I2 e I3.
**BL4.** Cálculo para qualquer Warframe (nível 30) e mods compatíveis.
**BL5.** Arcanos, fragmentos e Helminth no cálculo e na tela.
**BL6.** Armas (primárias, secundárias, corpo a corpo) e companheiros.
**BL7.** Cadastro dos presets, um item por vez, com fonte e estado.
Cada etapa: `npm run verify` verde, commit pequeno e registro em `docs/EXECUTION_STATUS.md`.

## 8. Critérios de aceite
- Escolho um Warframe qualquer, vejo imagem e pelo menos o estado "sem preset" ou presets com selo.
- Cada preset mostra fonte, data e estado; nenhum número sem origem.
- Alterar o nível de um mod muda o "antes e depois" de forma conferida por teste com valor de referência público.
- Fragmentos e Helminth aparecem no preset e entram no cálculo.
- Capacidade de mods inválida é recusada com mensagem clara.

## 9. Decisões pendentes do dono
- "Terceira arma" e categorias extras (Archwing, Necramech, Kitgun, Zaw, Amp).
- Quem cadastra os presets e se aceita builds de fonte comunitária marcadas como tal.
- Confirmar que "helmet" significa Helminth.
- Quais Warframes e armas entram primeiro.

## 10. Comando curto para outra IA
```
Leia só AGENTS.md e docs/BUILD_LAB_V2_ESPECIFICACAO.md e execute APENAS a próxima etapa (BL1 a BL7) ainda não feita. Não invente builds nem números. Responda em no máximo 10 linhas: arquivos alterados, comando executado, resultado real, próximo passo.
```
