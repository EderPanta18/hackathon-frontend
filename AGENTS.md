# hackathon-frontend — Development Contract

<!-- HUMAN_MANAGED · Contrato operativo para desarrolladores y agentes. -->

## Start

- Revisar Git, cambios existentes, estructura y scripts de `package.json`; no sobrescribir trabajo ajeno.
- Si existe `.context/STATE.md`, leerlo una vez y contrastarlo con el workspace. Recuperar sólo contexto relevante, no sesiones ni documentación completas.
- Consultar las secciones pertinentes de `.specify/memory/constitution.md` ante cambios de arquitectura, datos, seguridad o reglas del producto.

## Scope & Implementation

- Implementar requisitos confirmados; no inventar APIs, datos geográficos de Piura ni criterios de aceptación. Preguntar sólo ante bloqueos materiales.
- Resolver cambios pequeños directamente; descomponer trabajo no trivial en tasks verificables. Reutilizar primero y evitar abstracciones, dependencias y refactors ajenos a la task.
- Diferenciar comportamiento real, mock y pendiente. No presentar rutas, sincronización offline, entregas ni exportaciones como operativas sin verificarlo.

## Tools & Skills — On Demand

- **No hay herramientas especiales obligatorias.** Detectar disponibilidad antes de invocar; si falta una capacidad, usar su fallback y continuar. No instalar, actualizar ni configurar herramientas por iniciativa propia. No recorrer todas las herramientas al inicio.
- **Texto y rutas:** `rg` (ripgrep); fallback: búsqueda del editor o `Select-String` / `Get-ChildItem` en PowerShell.
- **Patrones sintácticos:** `sg` (ast-grep), si está disponible; fallback: `rg` e inspección del código.
- **Símbolos, referencias e implementaciones:** Serena; fallback: LSP del editor o `rg`. Limitar la consulta a los archivos/símbolos pertinentes.
- **Arquitectura, relaciones e impacto:** Repowise; fallback: imports, estructura y código verificado. No usarlo para búsquedas literales.
- **Documentación de dependencias externas:** Context7 / skill `find-docs`; fallback: documentación oficial accesible. Para código propio, usar búsquedas locales.
- **Specs y planificación:** Spec Kit (`speckit-*`) para trabajo no trivial; fallback: tasks breves y verificables sin artefactos ceremoniales.
- **Disciplina de implementación:** Ponytail si está activo; fallback: cambio mínimo y revisión de diff.
- **UI:** utilizar, según la tarea y disponibilidad, `frontend-design`, `project-ui`, `web-design-guidelines` y skills `antislop-*`; fallback: convenciones y componentes existentes del repositorio.
- **Verificación:** skill `project-verification`; fallback: scripts reales del proyecto y comprobaciones manuales explícitas.
- **Continuidad:** skill `session-lifecycle`; fallback: actualizar `.context/STATE.md` si existe.
- Leer `SKILL.md` únicamente al necesitar una skill. Si no existe o falla, no bloquear la task; señalar la limitación sólo si afecta el resultado.

## Verify & Deliver

- Ejecutar checks relevantes al cambio y ampliar según riesgo. No inventar scripts ni declarar aprobadas verificaciones no ejecutadas.
- En cambios logísticos críticos, revisar según corresponda inventario, duplicados, estados de entrega, rutas bloqueadas/desconocidas y exportaciones Excel/PDF; en UI, comprobar el uso móvil.
- Revisar diff y staging; realizar un commit por task completada y verificada si hay permisos. Nunca incluir cambios ajenos ni forzar un cierre incompleto.
- No desplegar, destruir datos ni modificar servicios externos reales sin autorización.
- Entregar resumen de cambios, evidencia de checks, limitaciones y siguiente acción. Si se mantiene `.context/STATE.md`, conservar un solo `Now` y máximo 4 KiB.

## Ownership & Authority

- La Constitution gobierna invariantes; Git y el código verificado describen la realidad. Las specs desarrollan el alcance de cada task.
- `AGENTS.md`, `.specify/`, `.agents/skills/`, `.codex/`, `.opencode/`, `.serena/`, `.repowise/` y configuraciones de tooling son `HUMAN_MANAGED`: no editar sin autorización explícita.
- Los archivos de trabajo de `.context/` son `AGENT_MANAGED` dentro del scope autorizado; cachés, índices y logs son `TOOL_MANAGED`.
