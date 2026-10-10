<!--
Repository Agent Contract Template

Materialization mode: ADAPT
Target: AGENTS.md
Ownership: HUMAN_MANAGED
Git: YES
-->

# [PROJECT_NAME] Repository Agent Contract

<!-- Router operativo breve. La arquitectura y las reglas de dominio pertenecen a la Constitution. -->

## Start

- Leer `[WORKING_STATE_PATH]` una sola vez y contrastarlo con Git y el workspace real.
- Recuperar sólo el contexto necesario; no precargar historical sessions ni docs.
- Preservar cambios existentes sin asumir autoría.

## Clarify & Plan

- No inventar requisitos, contracts ni acceptance criteria; preguntar sólo por decisiones materiales no verificables.
- Usar `[PLANNING_CAPABILITY]` para trabajo no trivial; evitar planning ceremonial en cambios pequeños.
- Dividir goals/plans en tasks delimitadas y verificables; no crear un `PLAN.md` paralelo por defecto.

## Retrieve

Seleccionar la capacidad mínima y acotar el search scope:

```text
texto exacto / rutas             → [LITERAL_SEARCH_CAPABILITY]
patrón sintáctico                → [STRUCTURAL_CODE_CAPABILITY]
símbolos / referencias           → [SEMANTIC_CODE_CAPABILITY]
arquitectura / dependencias      → [REPOSITORY_INTELLIGENCE_CAPABILITY]
documentación externa           → [EXTERNAL_DOCS_CAPABILITY]
```

- Buscar antes de leer archivos completos; contrastar índices y docs con el código vigente.

## Implement & Bugs

- Respetar `[PROJECT_GOVERNANCE_SOURCE]` y los contracts vigentes.
- Resolver la causa con el cambio mínimo correcto; reutilizar antes de añadir abstractions o dependencies.
- Aplicar `[IMPLEMENTATION_DISCIPLINE]` ante riesgo de sobreingeniería; revisar el diff.
- Reproducir bugs cuando sea viable; ante failures repetidos, reevaluar el enfoque sin silenciar errores.
- No ejecutar acciones destructivas o con efectos externos reales sin autorización explícita.

## Delegate

- Delegar sólo tareas independientes cuando el beneficio supere el coste de coordinación.
- Separar exploración (read-only), implementación (edición acotada) y review (read-only) según los permisos efectivos del runtime.
- Dar objetivo, scope, permisos, condición de finalización y retorno breve con evidencia.
- Evitar edición simultánea de los mismos archivos o contracts compartidos.
- El agente principal conserva integración, verification y commits; los subagents no hacen commits.

## Verify & Commit

- Usar `[PROJECT_VERIFICATION_SKILL]`; ejecutar checks específicos primero y ampliar según riesgo.
- Un check no ejecutado no cuenta como aprobado; repetirlo si cambiaron sus inputs relevantes.
- **Cada task completada y verificada genera un commit de su propio scope; no esperar al cierre del goal/plan.**
- Revisar diff y staging; no incluir trabajo ajeno ni usar staging ciego.
- Si la task no está completa o verificada, informar el bloqueo en vez de forzar un commit de cierre.

## Continuity

- Usar `[SESSION_CONTINUITY_SKILL]` en checkpoints, handoffs, compaction relevante y cierres.
- El transcript no es memoria durable; mantener working state mínimo y consultar historial bajo demanda.
- Un checkpoint puede actualizar continuidad sin producir commit.

## Ownership & Authority

- `[PROTECTED_INFRASTRUCTURE_PATHS]` son `HUMAN_MANAGED`: no editarlos sin solicitud humana explícita.
- Los cambios previos en rutas protegidas no amplían el scope autorizado.
- El estado de trabajo autorizado es `AGENT_MANAGED`; índices, caches y outputs regenerables son `TOOL_MANAGED`.
- `[PROJECT_GOVERNANCE_SOURCE]` establece normas; Git y código verificado establecen hechos. No inventar reglas si la fuente aún no existe.

## Done

- Cerrar sólo con scope satisfecho, verification válida, diff revisado y commit acotado.
- Informar qué cambió, qué checks se ejecutaron y qué quedó pendiente.
