# Referências e primeira melhoria visual — 08/11/2026

Preferência do dono: Noxsframe como principal referência de clareza visual, sem abandonar as demais. Preservar Matrix Green e implementar uma experiência própria. Esta é uma inspeção inicial das páginas públicas, não auditoria integral dos produtos nem validação das fórmulas deles.

| Referência conferida | Evidência pública observada | O que aproveitar | Cuidado para nosso produto |
|---|---|---|---|
| [Noxsframe](https://noxsframe.com/) e [/builder](https://noxsframe.com/builder) | Página apresenta atributos, imagens dos mods, arcanos e fragmentos; entrada do editor pede login Discord e exibe demonstração. | Hierarquia com personagem, números e equipamentos identificáveis; separar tarefas. | Não copiar a composição nem prometer cálculos por causa de uma demonstração visual. Nosso modo livre segue sem login. Editor autenticado deles não foi testado. |
| [FrameLegend](https://framelegend.com/) | Navegação Wiki/Builds/Guides e entrada direta no planejador; proposta de compartilhamento por link. | Fluxo claro para planejar e compartilhar. | Compartilhamento nosso exige implementação/validação; não anunciar pronto. |
| [Pandaahh](https://pandaahh.com/warframe/en/builds) | Biblioteca com busca, datas e várias builds por personagem; separa guias e Theorycraft. | Indicar versão/data e finalidade; quantidade de presets varia. | Não tratar número de votos como evidência de eficácia; excesso de áreas pode distrair da tarefa. Isso é um risco de design, não falha comprovada deles. |
| [Overframe](https://overframe.gg/) | Busca de builds, atualizações, autores e destaques com votos. | Descoberta e crédito de autoria; fonte para curadoria. | Verificar descrição, atualização e composição; destaque não certifica resultado atual. |
| [Voidforge](https://void-forge.org/) | Ferramentas apresentadas por equipamento e gerenciador de conjunto completo. | Separar Warframes, armas e companheiros sem perder visão do conjunto. | Não mostrar campos calculados sem cobertura no nosso motor. |
| [TheKengineer](https://www.thekengineer.com/catalogue) | Catálogo por temas, com guias datados e alguns conteúdos explicitamente antigos. | Explicações e histórico de validade das recomendações. | Conferir cada guia antes de usar; ler catálogo não equivale a assistir/testar todos os vídeos. |
| [Warframe.market](https://warframe.market/) / [regras de integração](https://docs.warframe.market/docs/rules/overview/) | Página dinâmica sem texto extraível nesta inspeção; regras oficiais já consultadas proíbem clone e pedem valor adicional. | Dados reais e fluxo de consulta/contato como referência de necessidade. | Percurso atual de ofertas ainda precisa revisão interativa. Não copiar interface nem depender da API como backend de clone. |

## Aplicado nesta entrega

- Navegação separa presets completos, teste de Warframes, teste de armas e referências; painéis permanecem montados para preservar rascunhos.
- Retrato do Warframe com força, duração, eficiência e alcance em destaque, usando os valores já calculados.
- Mods em grade com imagens maiores e efeitos por expansão; arcanos com imagem. Demais equipamentos fechados inicialmente, Warframe aberto.
- Cinco fragmentos com imagens normal/tauforjada resolvidas no catálogo WFCD e bônus individual explícito. Fonte, nível, condições e limitações preservados.
- Correção de orientação para personagem sem preset: indicar botão Testar Warframe.

Verificação no navegador: desktop e largura 375px, valores 313%/181,5%/45%/145%, cinco imagens dos fragmentos carregadas, seleção preservada ao alternar modos e Nova sem resultado antigo. Build Lab medido sem transbordamento horizontal em 375px. Isso não certifica todas as páginas/dispositivos ou cálculos dentro do jogo.

## Próximas entregas

1. P0: tornar o projeto reproduzível em clone limpo, conferindo arquivos ainda não versionados; necessário antes de prévia pública.
2. Preparar hospedagem gratuita elegível e subdomínio disponível, sem comprar domínio; nome VoidAcervo ainda provisório e marca pendente. Nenhuma publicação nesta entrega.
3. Continuar comparações dos companheiros e cobertura das regras; ampliar presets com fontes. Ainda só Dante tem composição completa experimental.
4. Continuar matriz R1 por fluxos reais, especialmente mercado → custo da build, teclado e celular. Não considerar todos os sites auditados.
5. Antes de publicar, revisar textos vindos das traduções: navegador ainda mostra alegações antigas como Anti-Ban na abertura/rodapé, apesar de textos locais mais cautelosos. Registrar e corrigir em tarefa própria; não certificar publicação com essas alegações.

Validação final: npm run verify concluiu com código 0; 329 testes aprovados, tipos, lint e build. Árvores locais anteriores continuam contendo arquivos não versionados, portanto clone limpo ainda não certificado.
