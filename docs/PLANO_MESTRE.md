# VOIDEX — plano mestre até a publicação

Atualizado em 08/11/2026. Projeto local: `/home/anderson/Documentos/GitHub/VOIDEX`.
Documento vivo: atualizar ao concluir cada tarefa. Não é uma declaração de que o produto já está completo.

## Decisões de nome, visual e orçamento — 08/11/2026

- Dono confirmou manter tudo gratuito: não comprar nem renovar domínio pago, não contratar serviços e não habilitar cobrança.
- VoidAcervo é somente candidato provisório. VOIDEX permanece no código até concluir a consulta de marcas e confirmar a mudança. VoidTroca foi alternativa considerada.
- Consultas anteriores ao RDAP da Verisign não encontraram registro de voidacervo.com e voidtroca.com; não houve reserva ou compra. Isso não confirma marca disponível. A consulta ao INPI retornou erro e permanece pendente.
- Publicação deve usar subdomínio gratuito da hospedagem. voidacervo.vercel.app é apenas exemplo: disponibilidade e elegibilidade da hospedagem ainda não confirmadas.
- Revisão visual autorizada: preservar identidade Matrix Green, reduzir textos repetidos e apresentar detalhes progressivamente. Não remover limitações nem funcionalidades. Revisão responsiva completa continua pendente.
- frontend-design instalada a pedido do dono. Não instalar outros pacotes para suposta economia de tokens. Não há garantia de economia percentual.

## 1. Objetivo e decisões

Criar um site gratuito, útil em português e no celular, que conecte planejamento de equipamentos de Warframe a informações reais de mercado. Referência de mercado: Warframe.market. Referências de builds: Overframe, TheKengineer, Pandaahh, FrameLegend, Noxsframe e Voidforge. Comparar funções e problemas de uso; implementar soluções próprias, preservando o tema Matrix Green.

Orçamento inicial: zero para hospedagem, domínio e serviços de IA adicionais. Não contratar serviços ou habilitar cobrança automática. Não exigir API paga para o funcionamento do site. Não acessar conta do jogo, executar trocas ou movimentar platina. O site ajuda a planejar e contatar jogadores; a troca acontece no jogo.

Todos os Warframes, armas e companheiros devem ser pesquisáveis. Presets completos devem cobrir todos os Warframes do catálogo suportado; papéis variam conforme suas especialidades, sem impor três builds artificiais por personagem. Para armas e companheiros, manter catálogo, editor e presets próprios com relatório de cobertura. Não declarar cobertura completa enquanto existirem itens pendentes. Exceções justificadas precisam aparecer no relatório e ser aprovadas pelo dono.

Incremento visual de 08/11/2026: primeira comparação pública das referências e apresentação do Build Lab melhorada; consulte `REFERENCIAS_VISUAL_V1.md`. Não altera cobertura de presets/cálculos. Noxsframe é a referência visual preferida pelo dono. Preparação de clone limpo continua necessária antes da prévia pública gratuita.

Beta Acervo Void publicada em https://acervovoid.vercel.app no Vercel Hobby em 08/11/2026. Cópia ativa e resultados no início de RESUMO_RETOMADA.md; 335 testes aprovados, build remoto e APIs públicas conferidos. H1 concluído; H2 apenas na condição de beta. Restante do escopo continua pendente; GitHub remoto ainda precisa receber a versão publicada.

## 2. Estado real conhecido

| Área | Situação e evidência |
|---|---|
| Visual | Tema Matrix Green e identidade existentes; falta revisão final de acessibilidade e celular. |
| Catálogo | Dados locais sincronizados: Warframes, armas, mods, arcanos, companheiros e fragmentos. Quantidade de itens não equivale a quantidade de presets. |
| Mercado | Há consulta de preços e imagens implementadas; documentos anteriores registram validação local. Fluxo inteiro deve ser reconferido antes da publicação. Ofertas completas, histórico e demais funções não estão certificados como concluídos. |
| Motor | Recuperado no commit `bc3efac`; a verificação local voltou a passar. |
| Presets completos | Somente primeiro conjunto experimental do Dante/Roar, commit `5d6368c`. Estado NAO_TESTADO: não testado por nós dentro do jogo. |
| Armas | Comparações parciais por modo de ataque, commit `b11b3e9`. Crítico, multiplicador crítico, status e cadência apenas onde a regra foi implementada. |
| Editor de armas | Commit `bb84374`: escolha de armas, até oito mods comuns revisados, níveis individuais, remoção e conflitos conhecidos. Catálogo com 595 entradas nesta base. Power Throw corrigido para versão normal. |
| Qualidade | Última execução registrada: `npm run verify`, 335 testes aprovados, tipos, lint e build; navegador e respostas da API conferidos. Isso não substitui nova verificação após alterações. |
| Publicação | Beta pública em https://acervovoid.vercel.app, Hobby gratuito, conferida em 08/11/2026; não significa escopo completo. |
| Reprodutibilidade | Existem muitos arquivos locais modificados/não versionados. A aprovação local não prova que um clone limpo compila. Resolver antes de publicar. Não adicionar tudo ao Git sem revisar. |

Detalhes históricos: `RECUPERACAO_MOTOR_2026-11-07.md`, `PRESET_DANTE_COMPLETO_V1.md`, `COMPARACAO_ARMAS_V1.md`, `EDITOR_ARMAS_V1.md`. Especificação do Build Lab: `BUILD_LAB_COMPLETO.md`. Documentos antigos continuam como histórico; estados antigos não devem substituir esta tabela e evidências recentes.

## 3. Fila de execução e critérios de aceite

Executar uma tarefa por vez. Cada entrega registra arquivos, validação, commit e pendências; não marcar uma fase inteira por ter implementado só a interface.

| ID | Entrega pendente | Critério para concluir |
|---|---|---|
| P0 | Retomada e organização | Este plano e RESUMO_RETOMADA presentes; fila apontando para eles; arquivos necessários ao projeto identificados e versionados sem misturar alterações alheias. |
| R1 | Análise das referências | Matriz com URL, data, função observada, dificuldade reproduzida, melhoria proposta, evidência e prioridade. Começar pelo percurso buscar item → avaliar custo → escolher build. |
| B1 | Companheiros | Comparação própria com base, resultado, unidade, fonte e regras verificadas. Tratar sentinelas, pets e suas armas segundo suas diferenças; confirmar arcanos por tipo em fonte atual. |
| B2 | Regras dos editores | Slots, capacidade, polaridades, dreno, aura/exilus/stance, conflitos e requisitos. Forma e demais alterações devem ser explícitas, nunca implícitas. |
| B3 | Warframes completos | Conferir atributos por nível, limites e interações; fragmentos normais/tauforjados, arcanos e Helminth com habilidade substituída. Condições ativas e desconhecidos visíveis. |
| B4 | Armas completas | Implementar dano, elementos, multishot, recarga, críticos, status e demais métricas por modo, com hipóteses explícitas. DPS depende do cenário; não usar pontuação universal inventada. Tratar Incarnon, modulares e condições como subetapas. |
| B5 | Curadoria de todo o catálogo | Registro de cobertura por item e variante. Para cada Warframe, selecionar papéis úteis e compor mods/níveis, arcanos, cinco fragmentos quando indicados, Helminth, primária, secundária, corpo a corpo e companheiro com equipamentos próprios. Ausência de indicação é explícita. Presets próprios para armas/companheiros e alternativas acessíveis. |
| B6 | Edição e comparação | Preset carrega o conjunto; edição vira rascunho separado. Tabelas antes/depois por equipamento, limitações e origem. Salvar/compartilhar por meio compatível com orçamento, inicialmente local. |
| M1 | Dados de mercado confiáveis | Conferir contrato atual da API, identidade do cliente, cache, limite compartilhado de requisições, atualização e tratamento de indisponibilidade. Não misturar exemplos com dados reais. |
| M2 | Consulta e contato | Página do item, ofertas reais e filtros úteis; plataforma/rank/quantidade claros; copiar mensagem preservando exigências da fonte. Sem anunciar compra concluída ou troca automática. |
| M3 | Histórico e farm | Histórico com período e origem; composição de conjuntos; drops com fonte. Não apresentar spread ou preço anunciado como lucro garantido ou venda concluída. |
| D1 | Diferenciais úteis | Build → lista de equipamentos faltantes → custo estimado datado; conjunto versus peças; alternativas baratas de mods com perdas calculadas; favoritos e alvos locais; explicações e uso em celular. Implementar um por vez e medir utilidade. |
| Q1 | Revisão do produto | Celular 375/768/1280 px, teclado, foco, contraste, movimento reduzido, carregamento, erros e dados ausentes; remover controles que aparentam funcionar sem funcionar. |
| Q2 | Segurança e operação | Dependências e segredos, rotas de diagnóstico, limites/cache e proteção contra abuso; créditos e política de dados adequados ao que é realmente coletado. Sem guardar credenciais do jogo. |
| Q3 | Entrega reproduzível | Instalação e verify em clone limpo; catálogo presente ou sincronização documentada; nenhuma dependência em arquivo local esquecido. |
| H1 | Prévia pública gratuita | Confirmar termos/cotas, conectar repositório, gerar prévia HTTPS e testar APIs, imagens e dados no servidor real. |
| H2 | Lançamento | Escolher endereço disponível, testar no celular, configurar metadados/ícone e indexação, publicar guia básico e verificar rotas principais. Registrar URL, data, versão e como reverter. |
| H3 | Manutenção | Atualizações de jogo e builds, revisão de fontes, acompanhamento de cotas/erros e backups/exportação. Nunca prometer gratuidade ilimitada ou disponibilidade eterna. |

Ordem sugerida a partir deste documento: concluir P0 → R1 (levantamento curto e verificável) → B1; depois B2–B6, M1–M3 e D1 em entregas pequenas conforme dependências. Q1/Q2 acompanham as fases; Q3 precede H1. Uma prévia pode sair antes da cobertura total, identificada como beta. Ela não significa produto 100% concluído.

## 4. Padrão obrigatório para cada build

Registrar identificador do item, variante, função, dificuldade/custo, autor, URL, data de consulta, atualização/versão do jogo quando conhecida, equipamentos e níveis exatos, condições e limitações. Separar: recomendação comunitária, cálculo nosso com fórmula e prova externa de teste no jogo. Vídeo demonstra somente o cenário mostrado; votos não provam validade atual. Guardar referências e resumo próprio; verificar permissão/licença antes de importar grandes conjuntos ou reproduzir textos/imagens.

Usar níveis máximos na variante recomendada quando viável, mas registrar e recalcular qualquer diferença em relação à fonte. Não tornar fragmentos tauforjados obrigatórios sem justificativa. Validar dados ausentes em vez de completar por suposição. Publicar relatório com total de itens, cobertos, pendentes e data da base.

## 5. Comparação de sites e pesquisa automatizada

É possível observar páginas públicas, testar fluxos manualmente e usar APIs/documentação públicas para montar uma matriz de funções. Um script pode organizar os resultados ou verificar links, respeitando os limites da fonte. Isso não revela o código interno nem certifica as fórmulas de outro site. Não realizar extração massiva, contornar bloqueios ou copiar identidade/conteúdo.

A matriz deve separar fatos observados de hipóteses de melhoria. Não afirmar que um concorrente não tem uma função sem conferir. Para cada proposta: problema do usuário, como a referência resolve, nossa solução própria, esforço, dependências e teste de utilidade.

Warframe.market exige cliente identificável, economia de requisições e valor adicional; proíbe clones apoiados na infraestrutura da API. O plano antigo de “ter tudo igual, melhor” deve ser interpretado como referência de necessidades, não reprodução do serviço. A integração do Build Lab com custos e alternativas é a principal proposta de diferenciação, ainda a validar com usuários.

Referências para a matriz: https://warframe.market ; https://overframe.gg ; https://www.thekengineer.com/catalogue ; https://pandaahh.com/warframe/en/builds ; https://framelegend.com ; https://noxsframe.com/builds ; https://void-forge.org . A lista não certifica cobertura ou precisão desses sites.

## 6. Publicação sem gasto inicial

Proposta inicial: Vercel Hobby, pela integração com Next.js já utilizado, SOMENTE se o projeto atender ao uso pessoal/não comercial permitido. Usar endereço gratuito fornecido pela plataforma, por exemplo `nome-disponivel.vercel.app`; disponibilidade não foi consultada. Confirmar cotas e elegibilidade novamente antes de escolher. Nenhuma conta foi criada ou publicação realizada.

Alternativa: Cloudflare Workers com adaptador OpenNext, sujeito à compatibilidade e às cotas do plano gratuito. Exige teste de APIs, arquivos de dados e imagens; não é troca automática sem esforço. GitHub Pages sozinho não atende as rotas de servidor atuais sem mudar a arquitetura.

“Domínio” é o nome do endereço. Um domínio próprio como `voidex.com` normalmente envolve registro e renovação; não está incluído no orçamento zero nem teve disponibilidade verificada. Começar com subdomínio gratuito e manter domínio próprio como opcional. Nome usado no projeto: VOIDEX; confirmar grafia antes de qualquer registro.

Não contratar banco de dados no lançamento se favoritos/rascunhos locais resolverem a necessidade. Login, anúncios públicos próprios, reputação e moderação exigiriam uma fase adicional de backend, segurança e operação: não estão concluídos nem são requisito do lançamento inicial proposto. O produto inicial consulta dados e facilita contato; não é uma bolsa independente com contas próprias.

Antes do lançamento: contas no nome do dono, integração do GitHub, variáveis de ambiente sem segredos no código, build em clone limpo, implantação de prévia, HTTPS, revisão de custos/cotas e teste público. Se gratuidade não suportar o escopo, reduzir carga/funções ou pausar; não gerar cobrança para manter aparência de completude.

## 7. Retomada econômica e colaboração com outra IA

Não é preciso instalar skill/plugin para este fluxo. Nenhuma ferramenta elimina leitura de contexto ou garante economia percentual. Após limite/reinício, ler AGENTS.md, RESUMO_RETOMADA.md e somente o trecho da tarefa no plano. Conferir git status/log e arquivos relacionados antes de editar. Não varrer toda a pasta nem reler todos os documentos históricos.

Ao encerrar: atualizar tarefa atual/próxima, commit, testes e bloqueios no resumo. Agrupar pesquisas, guardar fontes, reduzir saídas de ferramentas e evitar agentes extras/revisões/testes duplicados sem necessidade. Preservar as verificações exigidas pelo projeto. Respostas curtas; instruções Linux detalhadas só quando o dono precisar agir. Limite de uso não é memória permanente, e não há garantia de retomada sem nenhuma leitura.

Outra IA gratuita pode ajudar em pesquisas, matriz de referências, tradução e revisão de documentação. Entregar apenas o resumo e uma tarefa delimitada, sem credenciais. Pedir resultado em arquivo separado ou patch, com fontes; uma única pessoa/agente integra alterações para evitar conflitos. Verificar o resultado antes de considerar concluído. Planos gratuitos também têm limites; nenhum serviço externo é necessário para continuar.

## 8. Definição de conclusão

O produto estará completo para este escopo quando a cobertura prometida estiver demonstrada por relatório, os fluxos de mercado e builds funcionarem com dados rastreáveis, cálculos e editores tiverem cobertura explícita, o site for acessível no celular, o clone limpo passar nas verificações e a URL pública HTTPS estiver testada dentro do orçamento. Falhas/limitações devem ser visíveis. Publicar uma landing page ou só o preset do Dante não satisfaz o escopo. Atualizações futuras do jogo continuam exigindo manutenção.

## 9. Fontes conferidas para as decisões de plataforma e integração

- Skills e carregamento por necessidade: https://learn.chatgpt.com/docs/build-skills
- Consumo depende de contexto, ferramentas, modelo e tarefa: https://learn.chatgpt.com/docs/pricing
- Regras oficiais da integração e proibição de clones: https://docs.warframe.market/docs/rules/overview/
- Plano Hobby e restrição de uso: https://vercel.com/docs/plans/hobby
- Endereço fornecido pela Vercel: https://vercel.com/docs/domains/working-with-domains
- Next.js na Cloudflare: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Cotas Workers: https://developers.cloudflare.com/workers/platform/limits/

Conferência em 08/11/2026. Revalidar termos e cotas na fase de implantação.
