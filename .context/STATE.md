---
schema: agent-state/v1
updated: 2026-10-10
branch: eder
base_head: 188f96c
status: specified
---

# Intent

01_COMUNA: especificar seis páginas del Jefe de Comuna e infraestructura demo compartida mínima persistente. Esta fase no implementa código.

# Done

Creada .context/specs/002-comuna-ayuda/spec.md con cinco historias, treinta requisitos, diez criterios y checklist de calidad documental. audit.md registra fuentes, precedencia, restricciones y auditoría estática de acceso/shell.

001-demo-reto21 es el prototipo visual /demo; su evidencia queda en su quickstart y no acredita comportamiento operativo COM.

# Now

Especificación COM lista para planificación con ruta explícita .context/specs/002-comuna-ayuda. .specify/feature.json conserva la demo anterior por prohibición de editar tooling/HUMAN_MANAGED. Usar SPECIFY_FEATURE_DIRECTORY con esa ruta y SPECIFY_FEATURE_NO_PERSIST=1, opciones existentes en common.ps1.

# Evidence

Git inicial: eder, HEAD 188f96c, staging vacío, numerosos cambios ajenos. Plantilla resuelta por script existente; no extensions.yml ni hooks. Constitution y fuentes consultadas. Auditoría estática: login/cookie/shell existentes; homeByRole apunta a prefijos; acceso cruzado lleva a acceso-denegado; layout superior se llama layoui.tsx; no se hallaron páginas por rol. Véase audit.md.

Checklist acredita solo calidad documental. No se ejecutaron build, UI 360 px, servidor, reinicio, exportaciones ni pruebas operativas en esta fase.

# Boundaries

Preservar cambios ajenos, login y cookie. No editar Constitution, skills, AGENTS ni tooling. SQLite en servicio demo aislado es restricción explícita para fase posterior. Sin matching real, prioridad inventada ni páginas de otros roles. Despacho/llegada fixture persistidos SIMULADO. XLSX enviado y PDF recibido/diferencias solo tras recepción propia finalizada; discrepancias no reactivan matching.

# Next

Ejecutar speckit-plan con contexto explícito sin persistir puntero. Reutilizar acceso/shell y corregir solo incompatibilidades verificadas de integración. Separar evidencia documental actual de aceptación operativa futura.
