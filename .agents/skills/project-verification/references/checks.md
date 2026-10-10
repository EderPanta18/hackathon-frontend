<!--
Project Verification Checks Template

Materialization mode: ADAPT
Target: .agents/skills/project-verification/references/checks.md
Ownership: HUMAN_MANAGED
Git: YES
-->

# Verification Checks

## Local Checks

```text
[LOCAL_CHECK_COMMANDS]
```

## Component Checks

```text
[COMPONENT_CHECK_COMMANDS]
```

## Shared Boundary Checks

```text
[SHARED_BOUNDARY_CHECK_COMMANDS]
```

## Static Analysis

```text
[STATIC_ANALYSIS_COMMANDS]
```

## Integration Checks

```text
[INTEGRATION_CHECK_COMMANDS]
```

## Closing Gate

```text
[CLOSING_GATE_COMMANDS]
```

## Selection

```text
check específico
→ componente o package afectado
→ boundary compartido
→ workspace o project scope
→ closing gate
```

La verification se amplía cuando:

- el cambio atraviesa más de un boundary;
- afecta contracts compartidos;
- no puede aislarse de forma fiable;
- un check más específico revela un failure relevante;
- el riesgo exige evidencia adicional;
- corresponde ejecutar el closing gate.

## Repetition

Un command exitoso no se repite cuando:

- sus inputs relevantes no han cambiado;
- su resultado sigue cubriendo el scope actual;
- no existe nueva evidencia que invalide el resultado.
