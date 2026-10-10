<!--
Project Verification Testing Template

Materialization mode: ADAPT
Target: .agents/skills/project-verification/references/testing.md
Ownership: HUMAN_MANAGED
Git: YES
-->

# Testing Rules

## Test Placement

```text
[TEST_PLACEMENT_RULES]
```

## Test Scope

```text
test específico
→ unidad o componente afectado
→ integration boundary
→ project scope
```

El test scope permanece en el nivel más cercano que proporcione evidencia suficiente sobre el comportamiento modificado.

## Selection

La selección de tests considera:

- comportamiento modificado;
- public contracts afectados;
- dependencias directas;
- shared state;
- cross-boundary effects;
- failure modes plausibles;
- regresiones relacionadas.

La cercanía física de archivos no sustituye la relación con el comportamiento afectado.

## New Tests

Los cambios de comportamiento verificable requieren cobertura suficiente.

Los tests nuevos o modificados cubren gaps reales de evidencia y evitan duplicar comportamiento ya validado adecuadamente.

## Failing Tests

Ante un failure:

1. se determina si está relacionado con el cambio;
2. se conserva el output mínimo necesario para diagnosticarlo;
3. se corrige la causa cuando pertenece al scope;
4. se vuelve a ejecutar primero el test o check más específico;
5. la verification se amplía después de recuperar una base válida.

Los tests no se deshabilitan ni debilitan para obtener éxito artificial.

## Project Conventions

```text
[PROJECT_TESTING_CONVENTIONS]
```
