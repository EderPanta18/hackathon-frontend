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

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.codex/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.codex/skills/antislop-ui/SKILL.md`
- Copy & text: `antislop-copywriting`: `.codex/skills/antislop-copywriting/SKILL.md`
- People: `antislop-human`: `.codex/skills/antislop-human/SKILL.md`
- Mobile / responsive: `antislop-layoutmobile`: `.codex/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `antislop-code`: `.codex/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->
