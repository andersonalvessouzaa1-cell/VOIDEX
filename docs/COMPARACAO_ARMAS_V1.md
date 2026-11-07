# Comparação parcial das armas — 07/11/2026

## Resultado
As quatro armas do conjunto experimental passam a mostrar antes/depois por modo de ataque: Phantasma Prime, Spectra Vandal, Glaive Prime e Burst Laser Prime. O código é separado da composição do Dante e pode receber outros equipamentos, mas apenas as regras revisadas são calculadas. A entrega não conclui o editor livre de armas, a curadoria de todos os personagens ou o cálculo completo de dano.

## Cobertura
Chance crítica, multiplicador crítico, chance de status e cadência. A base vem dos ataques separados na sincronização WFCD. Campos crit_chance/status_chance dos ataques já são porcentagens; os campos gerais criticalChance/procChance são frações e só são convertidos no fallback explicitamente identificado como base geral da fonte. Valores ausentes, não finitos ou negativos permanecem sem dado.

Os operadores relativos são registrados por slug de mod e por atributo conferido. Não se infere fórmula de qualquer texto percentual. A leitura se limita às linhas estáticas antes de condições como On Kill. Mods sem regra revisada bloqueiam os resultados modificados; mods revisados cujos efeitos estão fora desses quatro atributos são listados na cobertura. Ranks inválidos e duplicatas são recusados.

Cadência efetiva de rajadas, cargas e modos especiais fica sem cálculo. Sacrificial Steel na Glaive só tem o bônus crítico calculado no ataque normal; nos demais modos ele permanece bloqueado até conferir a regra específica. Isso evita usar o dobro de crítico pesado no arremesso errado ou apresentar a frequência da fonte como DPS.

Fora da conta: dano total, DPS, dano elemental/facção/status, multishot, sequências de ataque, arcanos, bônus do Warframe/companheiro e condições de missão. Também não se certificam quantização interna do crítico, arredondamento no jogo ou encaixe/capacidade. O estado do conjunto continua NAO_TESTADO.

## Referências consultadas
- WFCD/warframe-items: dados locais sincronizados de armas, ataques e níveis dos mods.
- https://wiki.warframe.com/w/Critical e https://wiki.warframe.com/w/Critical_multiplier: bônus relativos de chance e multiplicador crítico, distinção de bônus absolutos e quantização.
- https://wiki.warframe.com/w/Status_Effect: referência de status; os casos numéricos também foram confrontados com os presets publicados consultados na etapa anterior.
- https://wiki.warframe.com/w/Fire_rate: diferenças entre cadência, rajadas e cargas.
- Fontes dos presets: links já registrados por parte em PRESET_DANTE_COMPLETO_V1.md e na interface. Testes matemáticos não representam prova de teste no jogo.

## Evidências
- Spectra máxima: chance crítica 57,4%, multiplicador 4,2x, status 84%, cadência 19,2/s. Reproduzido também o status de 58,8% da configuração publicada quando os dois mods virais voltam ao nível 0.
- Phantasma, modo Feixe: status 66,6%, cadência 16,8/s. Modos de bombas não recebem cadência efetiva inferida.
- Glaive, ataque normal: chance crítica 70,4%, multiplicador 3,7x. Na detonação do arremesso carregado a base crítica é 26%, mas o resultado modificado fica sem cálculo.
- Burst Laser: chance crítica 60%, multiplicador matemático 3,22x, status 42%; cadência efetiva de rajada não calculada.
- A suíte nova falhou por módulo ausente antes da implementação. Depois: 30 verificações do motor e seis verificações novas de integração aprovadas.
- npm run verify terminou com código 0: 290 passaram, nenhum falhou; tipos, lint e build de produção aprovados. A mensagem de depreciação de next lint permanece informativa.
- Navegador: Spectra mostra os valores acima; Glaive e Phantasma trocam modos e bloqueiam os campos sem regra; escolher Nova remove as quatro comparações; voltar ao Dante reinicia a Glaive no ataque normal. Burst Laser conferida na tela.
- Revisão independente dos arquivos desta tarefa: nenhum problema acionável identificado.

## Próximo passo
Editor de armas com seleção e níveis individuais, regras de compatibilidade/capacidade e comparação própria do companheiro; depois ampliar as regras de dano e a curadoria para o catálogo inteiro. Não promover a comparação parcial a simulador completo enquanto faltarem essas regras.
