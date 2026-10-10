---
schema: agent-state/v1
session: 0
updated: 2026-10-10
branch: eder
head: b3f2679
status: idle
---

# Intent

Planificar el prototipo frontend DEMO del Reto 21, aislado bajo /demo, sin implementar.

# Done

Respuesta A integrada: reservas nuevas no crean ni modifican despachos de ejemplo.
Spec actualizada con formularios acotados y offline sólo visual (25 FR, 10 SC).
Plan, research, data-model, contracts/demo-ui y quickstart en la misma feature Spec Kit.

# Now

Plan técnico terminado y listo para generar tasks; ninguna implementación DEMO.

# Evidence

Checklist revalidado: 16/16 → 16/16, sin regresiones; una aclaración respondida.
setup-plan.ps1 resolvió la feature; rama Git real eder (no el ID reportado por el script).
Código local, APIs UI y documentación oficial de dependencias consultados.
No existen .specify/extensions.yml ni hooks que ejecutar.
Sin build ni pruebas de interfaz: sólo documentación.

# Relevant Paths

.context/specs/001-demo-reto21/spec.md
.context/specs/001-demo-reto21/plan.md
.context/specs/001-demo-reto21/data-model.md
.context/specs/001-demo-reto21/contracts/demo-ui.md
.context/specs/001-demo-reto21/checklists/requirements.md
.specify/feature.json (local, ignorado por Git)
src/lib/config/routes.config.ts: acceso autenticado por defecto; sólo /login público.

# Durable References

La Constitution exige coherencia de inventario y distinguir reservado/despachado/recibido.
MapLibre 6.13.0 instalado; OpenFreeMap/worker requieren comprobación posterior.
Rutas ilustrativas, documentos HTML sin archivos finales, sin API/DB/Valhalla/offline real.

# Open Questions

Ninguna material para planificar. Cambios previos ajenos: package.json, pnpm-lock.yaml,
src/ui/UI_COMPONENTES.md y src/ui/UI_COMPONENTS_AGENTS.md; no se modifican.

# Next

Ejecutar $speckit-tasks sobre .context/specs/001-demo-reto21 cuando se solicite.
No implementar hasta recibir autorización de esa fase.
