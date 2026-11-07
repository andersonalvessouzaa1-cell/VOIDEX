# Recuperação do motor — 07/11/2026

## Problema e resultado
A cópia local combinava interfaces de versões diferentes do motor, um módulo de simulador ausente e testes com uma variável que escondia a classe importada. A checagem parava antes de executar a suíte. Os contratos foram reconciliados e a verificação completa voltou a passar, sem remover testes ou desativar verificações.

## Alterações
- Recuperado lib/build-simulator.ts para a interface legada existente: Dante nível 30 (390 de vida, 240 de escudos, 145 de armadura e 270 de energia), conforme https://www.warframe.com/en/game/warframes/dante, consultada em 07/11/2026. Intensify, Continuity, Stretch e Blind Rage foram conferidos nos levelStats sincronizados de WFCD/warframe-items. Entradas inválidas/repetidas são recusadas.
- Restaurada compatibilidade das funções estáticas a partir de old_engine.ts, arquivo histórico UTF-16 preservado. A cópia em legacy-stat-calculator.ts mantém as fórmulas legadas para não perder a cobertura existente. Elas NÃO foram auditadas como reprodução completa do jogo e NÃO alimentam a nova calculadora da página.
- Migrados acessos de testes ao contrato de ataques, removido o sombreamento de CalculationEngine e preservadas as asserções.
- Tipos agora representam metadados ausentes e perfis parciais de dano sem inserir zeros ou alegar verificações inexistentes; Helminth histórico passa para efeitos com evidência parcial e operadores desconhecidos.
- Adaptador usa registros existentes em vez de fixtures inventadas de Braton/Serration. Seus operadores continuam UNKNOWN, sem transformar descrições textuais em fórmulas verificadas.
- Condições desconhecidas deixam de conceder bônus; condições não ativadas e atributos não suportados não entram no cálculo simples de dano. Testes reproduziram as falhas antes das correções.
- Corrigidas aspas no JSX antigo e anotações TypeScript em dois arquivos .js históricos. Nenhuma exclusão de testes, renomeação ou dependência nova.

## Verificação
- npm run verify: código 0, 223 verificações passaram, nenhuma falhou; TypeScript, lint sem erros/avisos e build de produção aprovados.
- next lint ainda informa depreciação da ferramenta (não erro de código).
- A primeira tentativa de build falhou sem diagnóstico detalhado; após permitir o download das fontes Google já usadas pelo projeto, a compilação e a verificação completa passaram.
- Smoke da produção em 127.0.0.1:3213: página com Build Lab HTTP 200; API de Warframes HTTP 200 com 123 registros; API de mods de habilidade HTTP 200 com 31 registros. Servidor temporário encerrado. Servidor de desenvolvimento anterior preservado.
- Revisão independente dos arquivos do motor: nenhuma regressão introduzida identificada. A precisão das fórmulas históricas permaneceu fora do escopo dessa revisão.

## Limites e próximo passo
Esta recuperação não implementa presets completos, armas/companheiros no editor nem certifica os dados históricos. Continuam as limitações de BUILD_LAB_COMPLETO.md. Próximo passo: curar o primeiro equipamento completo do Dante, com fontes por parte e valores conferidos, e conectar ao seletor. A lista de mods da fonte ainda contém variantes com nomes iguais; distingui-las antes de recomendações.

## Preservação do trabalho local
Commit desta etapa contém apenas correções do motor e testes relacionados. Mudanças anteriores do usuário, arquivos gerados, novas telas de etapas anteriores e package-lock.json não foram incluídos. O rótulo da fonte em components/BuildSimulator.tsx foi corrigido para WFCD, mas esse arquivo preexistente não rastreado fica fora do commit para não incluir todo o trabalho anterior nele.
