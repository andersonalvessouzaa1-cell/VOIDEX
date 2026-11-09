# Comparação parcial das armas por modo — plano

Escopo: próximo incremento de docs/BUILD_LAB_COMPLETO.md e PRESET_DANTE_COMPLETO_V1.md. Comparar as quatro armas do equipamento cadastrado, com estrutura reutilizável para outros equipamentos e modos. Não declarar o editor completo nem DPS implementado.

- Criar lib/data-engine/weapon-stat-comparison.ts, cálculo puro de chance crítica, multiplicador crítico, chance de status e cadência. Bases por ataque WFCD têm probabilidades em porcentagem; campos gerais têm frações, com conversão explícita. Ausência/valor inválido vira null.
- Registrar operadores relativos apenas para slugs e linhas de efeitos conferidos; não inferir fórmula de texto arbitrário. Galvanizados só aplicam a primeira parcela incondicional. Mods conhecidos sem efeito nesses quatro atributos são listados como fora da comparação; mod não revisado bloqueia todos os resultados modificados. Recusar ranks inválidos/duplicatas.
- Sacrificial Steel em Glaive: crítico normal calculável; demais modos ficam sem resultado crítico até regra de ataque pesado conferida. Cadência efetiva de rajadas/cargas/ataques especiais não é extrapolada do campo speed. Sem caps artificiais ou números inventados.
- Enriquecer ResolvedEquipment no loadout-reader com comparação opcional para primary/secondary/melee/companion_weapon. Nenhum cálculo de dano, elementos, multishot, arcanos ou bônus do Warframe/companheiro.
- Criar components/WeaponStatComparison.tsx com seletor de modo e tabela acessível; montar nas quatro partes do preset. Sem alterar a escolha do Warframe/preset nem o modo livre.
- Testes antes do código: Spectra 57,4%/4,2x/84%/19,2 por segundo; Phantasma 66,6% de status e 16,8 de cadência; Burst Laser 60%/3,22x/42%, cadência efetiva não calculada; Glaive normal 70,4%/3,7x e crítico especial bloqueado. Testar condicionais, desconhecidos, dados ausentes, rank e não mutação.
- npm run verify, navegador com troca de modos, revisão e commit da etapa. Atualizar fila com limites reais.

Fontes de regras consultadas em 07/11/2026: https://wiki.warframe.com/w/Critical, https://warframe.fandom.com/wiki/Critical_Hit, https://wiki.warframe.com/w/Status_Effect e https://wiki.warframe.com/w/Fire_rate. Operadores gerais verificados na documentação comunitária, dados numéricos de mods/ataques vêm da sincronização WFCD. O cálculo parcial não é teste no jogo.
