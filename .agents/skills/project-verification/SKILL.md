---
name: project-verification
description: Verifica cambios usando la evidencia mínima suficiente para su scope y riesgo.
---

<!--
Project Verification Skill Template

Materialization mode: ADAPT
Target: .agents/skills/project-verification/SKILL.md
Ownership: HUMAN_MANAGED
Git: YES
-->

# Project Verification

## Purpose

Verificar cambios de forma proporcional a su scope y riesgo, usando únicamente evidencia realmente observada y evitando checks innecesarios o repetidos.

## Process

1. Inspeccionar el changed-file set real.
2. Identificar comportamiento, contracts, boundaries y dependencias afectadas.
3. Consultar `references/checks.md` y seleccionar el check más específico aplicable.
4. Ejecutar primero checks locales y tests cercanos al cambio.
5. Consultar `references/testing.md` cuando la verification requiera decidir alcance, ubicación o nivel de testing.
6. Ampliar verification únicamente cuando el cambio, un failure o el riesgo lo justifiquen.
7. Consultar `references/safety.md` antes de cualquier validation con efectos externos, irreversibles o sensibles.
8. Ejecutar el closing gate cuando corresponda según `references/checks.md`.
9. No repetir un check exitoso si sus inputs relevantes no cambiaron y sigue cubriendo el scope actual.
10. Detener la expansión cuando exista evidencia suficiente para sostener el cambio.

## Evidence

- Un check no ejecutado no cuenta como superado.
- No inferir resultados a partir de ejecuciones anteriores cuyos inputs relevantes hayan cambiado.
- Conservar únicamente la información necesaria para explicar el resultado y la siguiente acción.
- No silenciar failures, warnings ni validaciones para obtener falso éxito.
- Distinguir entre resultado observado, limitación y supuesto.

## Output

Informar al finalizar:

- checks ejecutados;
- resultado observado de cada check;
- checks relevantes no ejecutados;
- failures o limitaciones pendientes;
- si el closing gate fue ejecutado o no.

## Stop Condition

La verification termina cuando la evidencia disponible es suficiente para el scope y riesgo del cambio, o cuando un failure o limitación impide continuar de forma válida.
