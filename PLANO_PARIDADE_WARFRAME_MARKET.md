# VOIDEX: plano mestre (paridade com o Warframe Market, melhorias e pendências)

Colocar em `C:\Projetos\VOIDEX\docs\PLANO_PARIDADE_WARFRAME_MARKET.md`. Vale junto com `AGENTS.md` e `docs/CORRECOES_IMAGENS_E_BUILD_LAB.md` (este arquivo organiza e prioriza; o outro detalha Build Lab e dados). Em conflito, vale o `AGENTS.md`.

Referência de produto: **warframe.market**. Meta: ter tudo o que ele tem, melhor, mais algumas coisas que ele não tem. Documentação oficial da API: `https://docs.warframe.market` (base de imagens: `https://warframe.market/static/assets/`).

## 1. Estado atual
| Área | Estado |
|---|---|
| Tema Matrix Green, logo SVG, fonte VT323 | Feito |
| `lib/market-api.ts` (retry, Retry-After, cache) + testes | Feito |
| Busca de preços reais: catálogo de 3893 itens, menor venda e maior compra por variante | Parcial |
| Imagem do Dante no Build Lab (`/api/warframe-image`) | Feito |
| **Imagens dos itens no mercado** (catálogo diz "3893 com imagem", mas todas aparecem como ícone vazio) | **Bloqueado** (ver 2) |
| Mercado de exemplo (`MarketDemo`): lista local de 77 itens, preços de exemplo, sem imagens | Pendente |
| Build Lab: só Dante e 4 mods; dados do motor com valores `MISSING` | Pendente |
| Três modais: sem visual novo e sem foco por teclado (`lib/modal-a11y.ts` com 2 avisos de lint) | Pendente |
| Testes do motor de dados (suíte antiga em `tests/_pending`) | Pendente |

## 2. Bloqueio 1: imagens do mercado
Fatos: o caminho de imagem vem no catálogo (`i18n.<idioma>.thumb`, ex.: `lich_weapons/images/thumbs/kuva_bramma.<hash>.128x128.png`) e a URL final é `https://warframe.market/static/assets/<thumb>`. O site do Market bloqueia acessos automatizados (detecção de robô), então o carregamento pelo servidor pode falhar.
Ação:
1. `components/ItemImage.tsx` tenta (a) direto no navegador, (b) pelo proxy `/api/market-image`, (c) marca do VOIDEX.
2. Se ainda falhar, abrir `http://localhost:3000/api/diagnostico-imagens` (só em desenvolvimento) e registrar `amostra`, `urlCompleta` e `tentativas` em `docs/EXECUTION_STATUS.md`. Colar a `urlCompleta` numa aba para ver se o navegador a abre.
3. Se o navegador abrir e o site não, a causa é o `referrerPolicy` ou uma extensão: testar sem `no-referrer`.
4. Se nenhum caminho funcionar, alternativa: baixar as imagens uma vez (script local) para `public/items/` e servir do próprio site. **Decidir com o dono** (peso do repositório e direitos de imagem).
Critério de aceite: busca "nova prime" mostra a imagem de cada resultado e do item selecionado.

## 3. Paridade com o Warframe Market
Coluna "Visto" = confirmado nos vídeos do dono. "Confirmar" = existe pelo conhecimento público, validar em `docs.warframe.market` antes de implementar.

| Recurso do Market | Visto | VOIDEX hoje | Meta no VOIDEX (melhorada) |
|---|---|---|---|
| Página do item com imagem grande, MR, taxa de troca, ducats | Sim | Só nome e ducats | Cabeçalho com imagem, MR, taxa de troca, ducats, ducats por platina, selo "no cofre" quando houver dado |
| Abas Ofertas / Estatísticas / Origens de drop | Sim | Só resumo de preço | Três abas (ver abaixo) |
| **Lista de ofertas por jogador** (vendedores e compradores, status Online/No jogo/No site, reputação, preço unitário, quantidade) | Sim | **Não existe** (só menor venda e maior compra) | Tabela completa, ordenável por status, reputação, preço, quantidade; filtros de status e preço mín./máx. |
| Botão "Comprar" que copia a mensagem de negociação | Sim | Só nos anúncios de exemplo | Copiar mensagem por oferta real; no console, copiar só o nick; modelo de mensagem editável |
| Seletor de plataforma | Sim | Sim (PC, PS4, Xbox, Switch, Mobile) | Manter e adicionar comparação lado a lado entre plataformas |
| Composição do conjunto (peças com quantidade ×1) | Sim | Lista de peças só no exemplo | Conjunto Prime com cada peça (imagem, preço, ducats) e total das peças vs preço do conjunto |
| Estatísticas de preço (histórico 48 h e 90 dias, média, mediana, volume) | Sim (aba) | Não | Gráfico com mediana, volume e indicador de tendência |
| Origens de drop | Sim (aba) | Não | Lista de onde farmar, com chance quando a base tiver |
| Rank do mod (0 e máximo) | Confirmar | Não | Seletor de nível para mods |
| Contratos: Rivens, Liches, Sisters | Sim (menu) | Não | Fase posterior |
| Perfis, reputação, avaliações, login, criar e gerir ofertas | Sim (menu) | Anúncios locais sem conta | Manter anúncios locais; não criar login nem mover platina |
| Ferramentas | Sim (menu) | Parcial | Definir após revisar a documentação |

Regras: respeitar limites de requisição da API (conferir na documentação), reaproveitar `lib/market-api.ts`, nunca guardar credenciais de ninguém.

## 4. Melhorias que o Market não tem (propostas, em ordem de valor)
1. **Conjunto vs peças:** calcular se compensa comprar as peças e montar o conjunto, com preços reais das ofertas mais baratas.
2. **Ranking de ducats por platina:** lista de itens que mais rendem ducats por platina, filtrável.
3. **Favoritos e alertas locais** (salvos no navegador): preço-alvo por item, aviso ao abrir o site.
4. **Comparação entre plataformas:** mesmo item em PC, PS4, Xbox e Switch.
5. **Oportunidades de revenda:** diferença entre maior compra e menor venda, com aviso de que não é preço de venda concluída.
6. **Ligação com o Build Lab:** a partir de um mod ou arma, "ver no Build Lab" e ver o preço.
7. **Português de primeira classe** (o catálogo traz nomes em PT) e uso em celular como segunda tela.
8. **Acessibilidade e teclado** em todos os fluxos.
Nenhuma dessas promete lucro. Cada uma mostra a fonte e a data dos dados.

## 5. Build Lab
Seguir `docs/CORRECOES_IMAGENS_E_BUILD_LAB.md` (tarefas I0 a I8 e níveis N1 a N4): todos os Warframes, todas as armas (primárias, secundárias, corpo a corpo) e todos os mods, com imagem. Fonte única de dados sincronizada por script; nenhum valor sem fonte; fórmulas só com caso de teste conferido em fonte pública.

## 6. Visual e experiência
- Redesenhar os 3 modais no tema (painel chanfrado, raio 0) com `role="dialog"`, `aria-modal`, foco preso, `Esc` fecha, foco volta ao botão. Corrigir os 2 avisos de `react-hooks/exhaustive-deps` em `lib/modal-a11y.ts` (copiar `ref.current` para variável dentro do efeito).
- Mercado de exemplo: substituir pela lista real do catálogo (ver tarefa M3). Nada de preço de exemplo sem rótulo.
- Revisar títulos em VT323 (fonte pequena), contraste do texto verde e responsividade em 375, 768 e 1280 px.
- Mais movimento e profundidade, no nível das referências (originkit, skiper-ui, cult-ui, 21st.dev): fundo animado discreto, cards com brilho, números animados nos preços. Respeitar `prefers-reduced-motion`.

## 7. Qualidade
Restaurar e reescrever os testes do motor; manter `npm run verify` verde a cada tarefa; avaliar as 9 vulnerabilidades do `npm audit` sem usar `npm audit fix` às cegas; atualizar o Next (o aviso "outdated" aparece no desenvolvimento) só com os testes passando.

## 8. Ordem de execução
**M0 (feito nesta rodada):** `ItemImage` com 3 etapas, proxy com cabeçalhos de navegador, rota `/api/diagnostico-imagens`.
**M1.** Fechar o bloqueio das imagens (seção 2) e registrar o resultado.
**M2.** Página do item no mercado real: cabeçalho com imagem, MR, taxa, ducats; lista de ofertas por jogador com filtros, ordenação e copiar mensagem.
**M3.** Substituir o mercado de exemplo pelo catálogo real (categorias por `tags`, imagem por item, peças do conjunto resolvidas pelos slugs reais do catálogo, nunca por montagem de texto).
**M4.** Estatísticas (gráfico 48 h e 90 dias) e origens de drop.
**M5.** Modais no tema e acessibilidade.
**B1 a B8.** Build Lab e dados (ver `CORRECOES_IMAGENS_E_BUILD_LAB.md`).
**X1.** Melhorias da seção 4, uma por vez, por valor.
Cada tarefa: arquivos alterados, `npm run verify`, commit pequeno, status em `docs/EXECUTION_STATUS.md`.

## 9. Regras
1. Nenhum dado, preço ou imagem inventado. Ausente aparece como "sem dado".
2. O VOIDEX não acessa conta do jogo, não executa trocas e não promete lucro.
3. Tema Matrix Green e fontes conforme `AGENTS.md`.
4. Edição mínima, uma tarefa por vez; se `verify` falhar 2 vezes pela mesma causa, parar e relatar.

## 10. Decisões pendentes do dono
- Imagens: carregar da fonte (padrão) ou baixar para o projeto.
- Manter algum conteúdo de exemplo ou só dados reais no mercado.
- Quais itens da seção 4 entram primeiro.
- Fonte dos dados do Build Lab (warframestat.us/`@wfcd/items` recomendada).

## 11. Comando curto para outra IA
```
Leia só AGENTS.md e docs/PLANO_PARIDADE_WARFRAME_MARKET.md e execute APENAS a próxima tarefa (M1 a M5, B1 a B8, X1) ainda não feita. Siga as regras. Responda em no máximo 10 linhas: arquivos alterados, comando executado, resultado real, próximo passo.
```
