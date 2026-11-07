# Primeiro equipamento completo cadastrado — 07/11/2026

## Entrega local
Seletor do catálogo inteiro (123 Warframes) com o primeiro conjunto experimental do Dante. Não equivale a presets prontos para todos os personagens. Escolher outro personagem sem curadoria limpa a seleção e mostra a ausência explicitamente. O modo livre e os resumos antigos foram preservados.

A composição tem seis partes e 56 mods equipados: Dante, Phantasma Prime, Spectra Vandal, Glaive Prime, Diriga e Burst Laser Prime. Todos os mods/arcanos escolhidos estão no máximo. Cada parte resolve nome, imagem e efeitos na base sincronizada; referência ausente é erro, não dado inventado. Ausência de descrição de postura aparece como sem dado.

Estado obrigatório: NAO_TESTADO. As builds individuais são públicas, mas não foi encontrada prova de teste deste conjunto montado pela VOIDEX. Nenhum teste unitário representa teste no jogo.

## Fontes consultadas
- Guia de opções e sinergias: https://overframe.gg/build/638612/ (ninjase).
- Warframe / Roar: https://overframe.gg/build/817819/ (patch 38.5 indicado na fonte).
- Phantasma Prime: https://overframe.gg/build/374667/ (patch 44.0).
- Spectra Vandal: https://overframe.gg/build/638360/ (patch 35.5).
- Glaive Prime: https://overframe.gg/build/270712/ (patch 38.5).
- Diriga: https://overframe.gg/build/541464/ (patch 41.0).
- Burst Laser Prime: https://overframe.gg/build/737345/ (patch 41.0).
- Base nível 30: https://www.warframe.com/en/game/warframes/dante.
- Roar subsumido a 30%: https://www.warframe.com/en/patch-notes/switch/29-0-0.
- Fragmentos: https://wiki.warframe.com/w/Crimson_Archon_Shard e https://wiki.warframe.com/w/Amber_Archon_Shard.
- Valores/ranks e efeitos de mods/arcanos: arquivos WFCD/warframe-items sincronizados localmente. O navegador foi necessário para ler as configurações carregadas do Overframe; a consulta textual antes de carregar os mods exibia apenas a base, e não foi usada como resultado final.

## Ajustes declarados, sem herdar selo de teste
A Spectra original usa Pistol Pestilence e Frostbite no nível 0; a variante VOIDEX usa o máximo, como pedido. Nenhum DPS da configuração original foi reaproveitado para esta variante. Os três fragmentos âmbar tauforjados (+37,5% lançamento cada) e dois carmesins tauforjados (+15% duração cada) são uma escolha explícita a partir dos efeitos/cores sugeridos pelo guia, que não define tauforjado. Diriga usa Duplex Bond entre as alternativas do guia, substituindo Seismic Bond, sem presumir habilidade canalizada após trocar Noctua por Roar. Arcanos máximos são escolhidos conforme a base, sem inferir níveis não visíveis na fonte. Mods de facção devem ser revistos conforme os inimigos; isto não foi apresentado como uma combinação ótima para toda missão.

## Comparação numérica com cobertura restrita
Mods estáticos do Dante, sem fragmentos: força 313%, duração 151,5%, eficiência 45%, alcance 145%. Com os fragmentos escolhidos: duração 181,5% e bônus de velocidade de lançamento +112,5%. Roar ao lançar com força 313%: +93,9% de bônus. Energia bruta 769,5 (270 × 2,85); fonte arredonda/exibe 769, e o arredondamento no jogo permanece não conferido. Não foi atribuída precisão de teste no jogo a essa diferença.

Fora da conta: efeitos condicionais e de arcanos, sinergias do companheiro, dano/DPS das armas, capacidade e polaridades. Presets exibidos não certificam encaixe ou desempenho. Próxima fase: comparações próprias e regras do editor para armas/companheiros, seguida da expansão da curadoria para o catálogo inteiro.

## Verificação
- Testes novos reproduziram módulo ausente antes da implementação; 31 verificações novas passaram.
- npm run verify: código 0; 254 passaram, nenhum falhou; tipos, lint e build aprovados. A depreciação da ferramenta next lint continua informativa.
- Navegador: seleção do preset mostra seis equipamentos e tabela; Nova mostra sem preset e remove o resultado; voltar ao Dante permite selecionar novamente. Valores acima conferidos na tela.
- Smoke da produção em 127.0.0.1:3213: Dante HTTP 200 com um preset/seis partes; Nova HTTP 200 com zero; slug inválido HTTP 400. Servidor temporário encerrado.
- Revisão independente: nenhum problema acionável identificado. A revisão não certifica jogabilidade ou teste no jogo.
- Verificação realizada sobre a cópia local com alterações anteriores preservadas; não é declaração de reprodução de um clone limpo.
