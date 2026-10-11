# Implementation Plan: 01_COMUNA · Servicio demo persistente y páginas de Comuna

**Branch**: `eder` | **Date**: 2026-10-11 | **Spec**: [spec.md](spec.md)

**Input**: `.context/specs/002-comuna-ayuda/spec.md`, aclaración A y petición de planificación del usuario. Ruta resuelta con SPECIFY_FEATURE_DIRECTORY y SPECIFY_FEATURE_NO_PERSIST=1; el puntero protegido conserva la demo anterior. El BRANCH de setup-plan es el identificador de feature, no una rama Git nueva.

## Summary

Implementar seis páginas COM sobre acceso/shell actuales. Un proceso privado demo-api concentra SQLite, validación de identidad/entidad, reglas de SIMULACIÓN, transacciones, idempotencia, auditoría y documentos finales. Next compone UI y transporta HTTP; no importa SQLite ni implementa reglas de dominio en handlers. Una BD compartida sirve a los cuatro roles según permisos, sin añadir páginas funcionales de otros roles.

La opción A conserva el JWT actual: demo-api lo verifica y resuelve subject en SQLite. El BFF añade además una credencial de servicio desde entorno para autenticar el proceso llamante, descartando cabeceras equivalentes del cliente. Contrato detallado en [auth-boundary.md](contracts/auth-boundary.md).

## Technical Context

**Language/Version**: Frontend TypeScript 5, React 19.3.0, Next 16.4.0 según package.json existente. Servicio ESM JavaScript `.mjs` en Node 24.19.0 local verificado, con DTOs TypeScript puros y validación runtime. pnpm 12.11.2.

**Primary Dependencies**: Reutilizar jose, Zod, React Hook Form, TanStack Query, axios y UI locales. Paquete servicio independiente con jose/Zod; ExcelJS, pdf-lib y fontkit para exportación, más fuente local licenciada. Usar node:http, node:sqlite y node:test; sin ORM, framework servidor, driver nativo ni runner nuevo. Dependencias se fijarán en lockfile propio durante implementación, sin instalar nada en planificación.

**Storage**: Única `.development/demo-api/operational.sqlite`, WAL/FK/synchronous FULL, migraciones SQL up/down, semilla idempotente y backup consistente. Secretos en entorno/.env.local ignorado; DB/WAL/SHM/backups en carpeta ya ignorada. Servicio no accede a datos reales.

**Testing**: Tests de servicio node:test en temporales, contratos HTTP y procesos separados para concurrencia/reinicio. Frontend: Vitest ya presente, comandos explícitos; raíz no tiene script test. pnpm lint y pnpm build son scripts reales. Guía en [quickstart.md](quickstart.md); pruebas operativas aún pendientes.

**Target Platform**: Demo local Windows/PowerShell, Node 24.19, navegador desde 360 px y escritorio. API en loopback; sin despliegue ni acceso de navegador directo a su puerto.

**Project Type**: Web frontend existente + un servicio demo independiente dentro del repo, sin nueva configuración workspace/tsconfig/CI.

**Performance Goals**: Feedback de carga y errores recuperables; no adoptar métricas RNF propuestas como compromisos. Transacciones breves; generación de documentos fuera del bloqueo de escritura. El timeout BFF existente es 30 s, no una meta de rendimiento.

**Constraints**: Solo COM y servicio mínimo. Sin matching, fórmula de prioridad, inventario/decisiones ONG, mutaciones Brigada/DC, mapas o API futura inventada. No editar Constitution, skills, AGENTS o tooling. .mjs evita que tsconfig raíz incluya SQLite con tipos Node 20. node:sqlite es release candidate: limitar al runtime demo observado.

**Scale/Scope**: Siete áreas/comunas ficticias, ONG y brigada demo, emergencias activa/histórica, cuatro identidades de acceso existentes y seis jefaturas COM fixture adicionales; solicitudes de 1 a 5 productos y una recepción terminal por despacho. No prueba de escala de producción.

## Constitution Check

_GATE: evaluación antes de Phase 0 y después de Phase 1. PASS significa conformidad del diseño, no ejecución operativa._

| Principio | Antes de investigar | Después de diseñar / evidencia |
| --- | --- | --- |
| I: Next limitado a UI/sesión/coordinación | PASS: servicio separado requerido | PASS: node:sqlite/reglas/archivos solo demo-api; handler BFF conserva transporte; DTOs puros y lib adaptador |
| I: responsabilidades/dependencias | PASS: estructura actual inspeccionada | PASS: core contratos, lib HTTP, modules COM, app composición; servicio no importa implementaciones Next |
| II: roles/entidades y demo aislada | PASS: identidad actual reconocida | PASS: JWT+credencial de servicio, binding 1:1 y autorización final API; credenciales de producción no aceptadas |
| III: etapas/cantidades/idempotencia | PASS: spec diferencia etapas | PASS: modelo de hechos, FK/UNIQUE/CHECK, BEGIN IMMEDIATE, replay persistido y diferencias sin matching |
| III: exportaciones válidas | PASS: alcance explícito | PASS: generadores XLSX/PDF sobre recepción final, inspección futura independiente definida |
| IV: reutilización y cambios mínimos | PASS: login/BFF/UI comprobados | PASS: seis páginas, correcciones de integración respaldadas, sin reescritura de auth/tooling; evidencia futura acotada |
| IV: documentación honesta | PASS: fase de planificación | PASS: distingue propuesto/existente/simulado/pendiente, sin declarar tests de dominio ejecutados |

No hay excepciones a Constitution ni enmiendas propuestas. Los contratos de API real y supervisión DC no se resuelven por inferencia.

## Project Structure

### Documentation (this feature)

```text
.context/specs/002-comuna-ayuda/
  spec.md                         # funcional y aclaración aceptada
  audit.md                        # auditoría inicial, conservada
  plan.md
  research.md
  data-model.md
  quickstart.md
  contracts/
    auth-boundary.md
    demo-api.md
    ui-adapter.md
  checklists/requirements.md       # calidad documental, no aceptación operativa
  tasks.md                        # siguiente fase, NO generado por plan
```

### Source Code (repository root)

Árbol propuesto; todavía no creado:

```text
demo-api/
  package.json                    # paquete privado runtime independiente
  pnpm-lock.yaml                  # propio; no nuevo workspace
  .gitignore                      # node_modules; sin datos runtime en source
  src/
    server.mjs                    # node:http, rutas y manejo de errores
    auth.mjs                      # JWT existente + credencial servicio + vínculo DB
    database.mjs                  # conexión, transacciones y migraciones
    seed.mjs                      # fixture idempotente explícito
    solicitudes.mjs               # consultas y comando de alta
    recepciones.mjs                # conciliación y único cierre
    documentos.mjs                # XLSX/PDF desde hechos finalizados
  migrations/                     # pares numerados up/down SQL
  assets/fonts/                   # fuente local y licencia
  scripts/                        # CLI migrate/seed/backup, sin reset de inicio
  tests/
    service.test.mjs
    persistence.test.mjs
    documents.test.mjs
src/
  core/contracts/comuna.contracts.ts
  lib/api/comuna-api.ts            # puerto tipado sobre apiClient existente
  lib/bff/backend-proxy.server.ts  # dos ajustes de transporte concretos
  modules/comuna/                  # pantallas, hooks y formulario/revisión
  modules/app/config/navigation.config.ts # entradas COM
  app/(platform)/(workspace)/comuna/
    dashboard/page.tsx
    solicitudes/page.tsx
    solicitudes/nueva/page.tsx
    solicitudes/[solicitudId]/page.tsx
    recepciones/page.tsx
    recepciones/[despachoId]/page.tsx
.development/demo-api/             # BD/WAL/SHM/backups, ya ignorado
```

**Structure Decision**: Servicio .mjs autónomo, dependencias propias instalables con pnpm --dir demo-api --ignore-workspace, sin modificar pnpm-workspace.yaml ni tsconfig raíz. El frontend TypeScript solo importa DTO/adaptador; las dependencias de documento permanecen en el paquete servicio. Nuevos scripts de servicio se validarán contra su manifiesto real al implementarlo; no se afirma que existan hoy.

## Diseño de dominio, integración y UI

- [data-model.md](data-model.md): entidades, semilla, integridad, estados, saldos, transacciones y reversión.
- [demo-api.md](contracts/demo-api.md): rutas demo propuestas, DTOs, envelope/error compatibles, reintentos y documentos. No se atribuyen a backend real.
- [ui-adapter.md](contracts/ui-adapter.md): composición por ruta, caché por identidad, validación visual, revisión y 360 px.
- [auth-boundary.md](contracts/auth-boundary.md): identidad A y autenticación del proceso servidor, mínimos ajustes y archivos de auth intocables.

### Cambios de integración justificados

1. BFF descarta hoy Idempotency-Key y no acredita al proceso llamante: añadir ese header permitido e inyectar token de servicio, solo modo demo. Conservar streaming/errores/CSRF/destino, sin nuevas reglas de negocio ni BFF duplicado.
2. homeByRole apunta a prefijos y el rol cruzado se manda a acceso-denegado: corregir en configuración/política existentes, normalizando pathname para redirigir solo prefijo exacto. No generar bucles para subrutas. COM tendrá su dashboard real.
3. Sidebar ofrece solo una raíz por rol: extender configuración COM con tres secciones, sin reemplazar shell.
4. layoui.tsx no es layout reconocido, pero workspace/layout.tsx ya verifica sesión. No renombrar por estética ni duplicar guard: solo cambiarlo si ejecución demuestra necesidad concreta.

Auditoría no encontró dashboards de otros roles ni página acceso-denegado. Esta fase no construye sus pantallas: se comprueba sesión/destino del redirect y consumo API permitido. Su navegación completa permanece pendiente; no prometer que un redirect prueba una página inexistente.

### Auth que no se tocará

Login/page/LoginClientShell; módulos auth y dev-auth; rutas api/dev-auth; session.server/jwt.server/security.server; security.config; backend-cookie.server. No cambiar subjects, roles, claims, firma, cookie o selector. Lista de paths exactos en contrato de frontera. Solo runtime env de conexión/credencial y ajustes BFF/navegación ya descritos.

## Secuencia de entregas verificables

Cada entrega futura termina con evidencia focalizada, revisión de diff/staging y commit propio. Esto es secuencia de diseño, no tasks.md ni trabajo ya completado.

| Entrega | Alcance | Evidencia para continuar |
| --- | --- | --- |
| 1 · Servicio/SQLite | Paquete privado, migraciones, seed, conexión/backup, JWT/credencial/RBAC, contexto y referencias mínimas | Seed dos veces; siete áreas y vínculos 1:1; no datos rastreados;401/403; up/down solo temporal; restart conserva fixtures; cuatro roles consumen contexto persistido |
| 2 · Solicitudes autoritativas | Catálogo, crear/listar/detalle/dashboard API, idempotencia/auditoría/saldos | Casos1/5/0/6, duplicados/unidades, rollback, replay/mismo contenido/distinto, permisos dos comunas y transacciones concurrentes |
| 3 · Recepción autoritativa | Bandejas/detalle, conciliación/cierre terminal, informe interno | Antes llegada409;70=65+2+1+2; cierre único concurrente, saldos35 sin rematching, auditoría y restart; sin UI todavía |
| 4 · BFF y pantallas COM | Frontera transporte, adaptador DTO, rutas/shell/menu, dashboard y solicitudes con revisión | Prueba BFF real conserva idempotencia/status; cookie actual funciona; rutas/teclado a 360 px/errores; identidad cache aislada; login diff sin cambios |
| 5 · Recepciones COM | Form/revisión/solo lectura, intentos inciertos y feedback | Bloqueo por estado, conciliación por campo, reintento y cierre único visibles; no éxito antes de servidor; sesión/rol/entidad revisados |
| 6 · Archivos y cierre | XLSX/PDF de servicio, descarga UI, guía/evidencia final | Lectores independientes, español/textos largos/paginación/strings Excel, finales propios solo; reinicio completo; pnpm lint/build y tests pertinentes con resultados registrados |

Los contratos no requieren implementar inventario/ONG/Brigada para demostrar recepción: referencias precargadas y llegada SIMULADO están persistidas desde entrega 1. Generación de documentos nunca bloquea el commit del cierre de recepción.

## Riesgos y mitigaciones

- SQLite integrado está en release candidate; usar Node 24.19 observado, registrar versión y probar persistencia/concurrencia antes de UI. No instalar runtime alternativo de oficio.
- JWT_AUDIENCE configurada rompe el token demo sin aud; precondición explícita del entorno, sin reescribir login.
- El ingreso demo usa DevRoleSwitcher existente. El formulario normal llama /auth/login, que este servicio no implementa; conservar sus errores sin prometer autenticación de credenciales. BFF valida destino loopback demo antes de inyectar la nueva credencial de servicio.
- El selector llama `/api/dev-auth/sign-out`, pero la ruta actual se llama `sign.out`: discrepancia estática preexistente. Registrar el resultado de cierre de sesión en la verificación futura; este plan no modifica esos archivos ni acredita ese recorrido.
- Root lint/build puede fallar por cambios previos o red de fuentes. Registrar comando/error real, distinguir del cambio, no cambiar tooling/fuentes para ocultarlo ni declarar aprobado.
- Datos demo falsos están etiquetados en seed/pantallas/archivos y eventos precargados. No inventar cartografía ni stock.
- Down destructivo y restauración real requieren autorización; pruebas usan BD temporal. Backup consistente, nunca copiar DB abierta ni borrar WAL.
- Dashboards no COM ausentes limitan verificación visual de otros roles; servicio compartido y redirects sí se prueban sin añadir UI fuera de scope.

## Complexity Tracking

Sin violaciones que justificar. No ORM, nuevo login, nuevo provider, tablas de inventario, motor matching, materialización de saldos ni configuración de tooling adicional. Se admite un proceso/paquete demo porque la separación de backend es requisito explícito.

## Resultado de planificación

Phase 0 resuelta en research.md; Phase 1 en modelo/contratos/guía. Constitution Check reevaluado: diseño conforme. Próximo comando speckit-tasks con ruta COM explícita y NO_PERSIST. No se generó tasks.md ni se implementó código en esta fase.
