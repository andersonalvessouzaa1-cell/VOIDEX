# VOIDEX DATA ENGINE — DATA VERSIONING & CHANGE DETECTION

## 1. Versões de Dataset

O dataset do VOIDEX é versionado semanticamente:
* `v1.0`: Fundação inicial.
* `v1.1`: Implementação do Variant System, Data Provenance e escopos A/B/C/D.

## 2. Detecção de Alterações (Diff Engine)

O motor compara versões de entidades e classifica deltas em:
* `ADDED`: Novos itens adicionados no patch.
* `REMOVED`: Itens descontinuados.
* `MODIFIED`: Itens que sofreram buffs/nerfs ou alteração de drain/scalings.
* `DEPRECATED`: Itens marcados como obsoletos.
* `CONFLICT`: Dados divergentes entre fontes.

## 3. Impacto em Builds Salvas

Ao detectar uma modificação em um Mod ou Warframe, o sistema executa `ChangeDetectionEngine.analyzeImpactOnBuilds()` e alerta o usuário sobre o delta exato de atributos da sua build salva.
