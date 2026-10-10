---
schema: agent-state/v1
session: 0
updated: 2026-10-10
branch: eder
head: 2cc4278
status: idle
---

# Intent

Especificar el prototipo visual y navegable DEMO del Reto 21, aislado bajo /demo.

# Done

Especificación y checklist en .context/specs/001-demo-reto21; puntero local .specify/feature.json.
Cuatro recorridos, 23 requisitos y 9 criterios de éxito; sin aclaraciones materiales.

# Now

Especificación lista para planificación. No se ha implementado el prototipo.

# Evidence

Revisión documental de alcance y checklist: 16/16 criterios satisfechos.
Template resuelto mediante .specify/scripts/powershell/resolve-template.ps1.
No existen .specify/extensions.yml ni hooks que ejecutar.
Sin build ni pruebas de interfaz: sólo documentación.

# Relevant Paths

.context/specs/001-demo-reto21/spec.md
.context/specs/001-demo-reto21/checklists/requirements.md
.specify/feature.json (local, ignorado por Git)
src/lib/config/routes.config.ts: acceso autenticado por defecto; sólo /login público.

# Durable References

La Constitution exige coherencia de inventario y distinguir reservado/despachado/recibido.
El encargo limita rutas a ilustraciones y documentos a previsualizaciones DEMO.

# Open Questions

Ninguna para especificar. Cambios previos ajenos: package.json, pnpm-lock.yaml,
src/ui/UI_COMPONENTES.md y src/ui/UI_COMPONENTS_AGENTS.md; no se modifican.

# Next

Ejecutar $speckit-plan sobre .context/specs/001-demo-reto21 cuando se solicite.
Contemplar apertura pública limitada a /demo sin cambiar acceso de otras rutas.
