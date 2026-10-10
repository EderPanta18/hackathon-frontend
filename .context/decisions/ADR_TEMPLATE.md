---
schema: agent-decision/v1
id: [DECISION_ID]
status: [DECISION_STATUS]
date: [DECISION_DATE]
supersedes: [SUPERSEDED_DECISIONS]
---

# [DECISION_TITLE]

## Context

[DECISION_CONTEXT]
<!--
Problema, restricción o situación que requiere una decisión durable.

Incluir sólo el contexto necesario para entender por qué la decisión existe.
No convertir esta sección en historial completo de la implementación.
-->

## Decision

[DECISION]
<!--
Decisión exacta que futuras tasks deben respetar mientras siga vigente.

Debe ser suficientemente concreta para evitar reinterpretaciones ambiguas.
-->

## Rationale

[RATIONALE]
<!--
Razón principal por la que se eligió esta opción.

Registrar únicamente alternativas o trade-offs relevantes para comprender la decisión.
-->

## Consequences

[CONSEQUENCES]
<!--
Efectos durables de la decisión.

Puede incluir:
- qué habilita;
- qué restringe;
- qué obliga a mantener;
- qué complejidad introduce;
- qué futuros cambios condiciona.
-->

## Supersession

[SUPERSESSION_NOTES]
<!--
Completar sólo cuando la decisión sustituya o sea sustituida por otra.

Referenciar decisiones relacionadas por ID o path.
No borrar el rationale histórico cuando quede superseded.
-->

## References

[REFERENCES]
<!--
Referencias relevantes al momento de tomar la decisión.

Pueden incluir:
- specs;
- contratos;
- paths;
- issues;
- documentación estable;
- otras decisiones.

Las referencias pueden volverse históricas conforme evoluciona el proyecto.
No asumir que todos los paths continúan existiendo.

Referenciar, no duplicar contenido.
-->
