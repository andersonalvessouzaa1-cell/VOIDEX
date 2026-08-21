# VOIDEX DATA ENGINE — DATA MODEL SPECIFICATION v1.1

## 1. Escopo de Datasets

O VOIDEX organiza seus dados em 4 escopos estritamente delimitados:

1. **A — Market Dataset (`MARKET`)**: Focado exclusivamente em itens negociáveis in-game, maestria necessária (MR), impostos em créditos do Dojo e cotações.
2. **B — Build Dataset (`BUILD`)**: Modelagem atômica de atributos que afetam diretamente o cálculo de builds (ranks de mods, drain, multiplicadores de habilidades, Archon Shards, Helminth, etc.).
3. **C — Combat Dataset (`COMBAT`)**: Fórmulas matemáticas de dano, status, armadura, resistências, EHP e Shield Gating.
4. **D — Reference Dataset (`REFERENCE`)**: Taxonomias, variantes (Prime, Umbra, Kuva), facções e traduções nos 15 idiomas.

## 2. Variant System (Herança e Variação)

Itens não são duplicados arbitrariamente. O sistema mapeia:
$$\text{Base Entity} \longrightarrow \text{Variant Entity}$$

Exemplo:
* `Excalibur` (Base) $\rightarrow$ `Excalibur Prime` (Prime) / `Excalibur Umbra` (Umbra)
* `Torid` (Base) $\rightarrow$ `Torid Incarnon` (Incarnon Evolution)
* `Epitaph` (Base) $\rightarrow$ `Epitaph Prime` (Prime)

## 3. Estrutura de Proveniência (`DataProvenance`)

Todo dado relevante armazena:
* `source_id`: Identificador da fonte.
* `source_type`: `official_export`, `community_api`, `manual_verification`.
* `retrieved_at` & `verified_at`: Timestamps ISO 8601.
* `dataset_version`: Versão do dataset do VOIDEX.
* `patch_version`: Versão do patch oficial do Warframe.
* `verification_status`: `VERIFIED`, `PARTIALLY_VERIFIED`, `UNVERIFIED`, `MISSING`, `CONFLICT`.
* `confidence`: Índice de confiança (0.0 a 1.0).
