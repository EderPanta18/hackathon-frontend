---
schema: agent-state/v1
updated: 2026-10-11
branch: eder
base_head: 97b682e
status: planned
---

# Intent

01_COMUNA: seis páginas COM e infraestructura demo compartida mínima persistente. Fase actual: aclaración y planificación; no implementación.

# Done

Spec COM: cinco historias, treinta requisitos, diez criterios y checklist documental 16/16. Opción A aceptada: demo-api verifica JWT actual y resuelve identidad/entidad en SQLite. Plan, research, data-model, tres contratos y quickstart diseñan servicio separado, autenticación servidor-servidor, transacciones, auditoría, idempotencia, semilla y exportaciones.

Checklist especializada de calidad COM creada con 22 criterios trazables, todos sin marcar para evaluación humana. Incluye rutas/redirects, auth, estados, permisos, conciliación, fixtures, archivos, 360 px, persistencia y frontera futura.

001-demo-reto21 es el prototipo visual /demo; su evidencia queda en su quickstart y no acredita comportamiento operativo COM.

# Now

Revisar/completar `.context/specs/002-comuna-ayuda/checklists/comuna.md` antes de speckit-tasks; los marcadores requieren decisión humana. .specify/feature.json conserva la demo anterior por prohibición de editar HUMAN_MANAGED. Para Spec Kit usar SPECIFY_FEATURE_DIRECTORY=.context/specs/002-comuna-ayuda y SPECIFY_FEATURE_NO_PERSIST=1. No se creó tasks.md.

# Evidence

Git al iniciar plan: eder, HEAD 97b682e, staging vacío, numerosos cambios ajenos preservados. setup-plan con ruta explícita/NO_PERSIST; sin extensions.yml. Node v24.19.0, pnpm 12.11.2 y ayuda install comprobados. SQLite en memoria: 3.53.3, FK=1, backup disponible; no acredita persistencia. Paths DB/WAL/SHM/backups/.env.local ignorados; sin SQLite rastreado. Contratos y enlaces revisados, diff documental sin errores de espacio.

Checklist acredita solo calidad documental. No se ejecutaron lint/build, UI 360 px, HTTP de dominio, reinicio persistente o exportaciones. No se instalaron dependencias ni creó servicio/BD.

# Boundaries

Preservar trabajo ajeno, login/cookie y archivos auth listados en contracts/auth-boundary.md. No editar Constitution, skills, AGENTS ni tooling. Servicio .mjs con paquete propio evita cambios tsconfig/workspace; Node observado, datos ficticios en .development/demo-api. Sin matching/inventario ni páginas de otros roles. XLSX enviado y PDF recibido/diferencias solo tras recepción propia finalizada.

Limitaciones observadas: JWT demo no tiene aud; JWT_AUDIENCE debe quedar vacía. Formulario normal /auth/login no tiene backend demo; usar DevRoleSwitcher actual. Llamada sign-out difiere de carpeta sign.out, sin corrección en esta fase. Dashboards no COM ausentes: no acreditar su recorrido visual. Correcciones propuestas solo transporte BFF y navegación existente.

# Next

Ejecutar speckit-tasks con feature explícita. Entregar primero servicio/SQLite y reglas probadas, luego solicitudes COM, recepción UI y XLSX/PDF. Verificaciones futuras en quickstart.md; no confundir diseño conforme con aceptación operacional.
