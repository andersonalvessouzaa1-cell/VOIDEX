# VOIDEX DATA ENGINE — DATA PIPELINE & IMPORT ARCHITECTURE

## 1. Fluxo de Ingestão e Validação

O pipeline de dados opera em etapas estritas:

$$\text{RAW DATA} \longrightarrow \text{PARSER / NORMALIZER} \longrightarrow \text{VALIDATION} \longrightarrow \text{NORMALIZED DATA} \longrightarrow \text{DATABASE} \longrightarrow \text{CALCULATION ENGINE}$$

## 2. Estrutura de Diretórios de Ingestão

```
/data-import/
  ├── /raw/          # Arquivos brutos de exportação oficial
  ├── /normalized/   # Estruturas normalizadas no formato JSON/TS
  ├── /validated/    # Dados auditados aprovados pelo ValidationEngine
  ├── /errors/       # Relatórios de entidades rejeitadas
  └── /versioned/    # Snapshots imutáveis por versão de patch
```

## 3. Regras de Ingestão

1. Nunca persistir dados no banco com `verification_status = 'VERIFIED'` sem validação de ranks e checagem de integridade de 4 habilidades.
2. Itens sem todos os ranks comprovados entram como `UNVERIFIED` e não alimentam o cálculo final do Build Engine.
