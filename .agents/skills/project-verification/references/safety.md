<!--
Project Verification Safety Template

Materialization mode: ADAPT
Target: .agents/skills/project-verification/references/safety.md
Ownership: HUMAN_MANAGED
Git: YES
-->

# Verification Safety

## General Rules

- Se prefieren entornos, fixtures, sandboxes, simulaciones o mecanismos equivalentes que eviten efectos reales.
- Los recursos reales no se usan únicamente como mecanismo de verification cuando existe una alternativa segura y representativa.
- Las acciones destructivas requieren autorización explícita y un mecanismo de recuperación adecuado.
- Secrets, credentials, personal data e información sensible no aparecen en commands, logs ni evidencia.
- Un successful local check no sustituye una validation de boundary cuando el riesgo depende de interacción externa.
- La verification se detiene cuando el siguiente paso requiere asumir un riesgo no autorizado.

## Sensitive Boundaries

```text
[SENSITIVE_BOUNDARIES]
```

## Safe Validation Paths

```text
[SAFE_VALIDATION_PATHS]
```

## Prohibited Verification Actions

```text
[PROHIBITED_VERIFICATION_ACTIONS]
```

## Escalation

Se requiere intervención humana cuando:

- la única validation disponible tiene efectos irreversibles o sensibles;
- faltan credentials o permisos necesarios;
- el entorno seguro requerido no está disponible;
- existe ambigüedad material sobre el impacto de la acción;
- la verification puede afectar recursos ajenos al scope autorizado.

## Evidence

La evidencia persistida contiene únicamente lo necesario para demostrar qué se validó y bajo qué condiciones.

Secrets y datos sensibles no forman parte de la evidencia.
