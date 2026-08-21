# VOIDEX DATA ENGINE — DATA VALIDATION SPECIFICATION

## 1. Regras de Validação Estrutural

1. **Warframes**:
   * Deve possuir exatamente 4 habilidades ativas com efeitos estruturados.
   * Deve possuir 1 passiva.
   * Vida, Escudos e Energia base devem ser $> 0$.
2. **Mods**:
   * Deve possuir exatamente `max_rank + 1` ranks modelados.
   * Cada rank deve ter `drain` e `display_description`.
3. **Armas**:
   * Dano base total $> 0$.
   * Multiplicador crítico $\ge 1.0$.
4. **Traduções**:
   * Devem estar vinculadas a um `entity_id` existente e idioma válido (15 idiomas).
