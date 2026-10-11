---
description: "Tasks for 01_COMUNA demo service and community pages"
---

# Tasks: 01_COMUNA · Servicio demo persistente y páginas de Comuna

**Input**: `.context/specs/002-comuna-ayuda/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `checklists/comuna.md`)

**Prerequisites**: Design artifacts above. The custom quality checklist is reviewer-owned and remains unchecked; it is not implementation evidence.

**Tests**: Acceptance and independent scenarios are explicit in the spec and quickstart. Add the focused service/UI checks in the owning tasks below. No root `test` script exists; use the commands recorded in each task and quickstart.

**Organization**: Sequential setup and service foundation, then spec user stories in priority order. Service authorization and persistence precede COM screens; reception precedes document generation.

## Format: `[ID] [P?] [Story] Description`

- `[P]` appears only when work can proceed independently without editing shared files or waiting on unfinished tasks. This sequence has no safe parallel implementation tasks.
- Story labels map to the five user stories in `spec.md`; Setup, Foundational and Polish tasks have no story label.
- Each item names its owning path/layer, input, output, dependency and a concrete check. Commands are future checks; they have not been run as part of task generation.
- Preserve pre-existing work in the shared checkout. Commit each implementation task only after its own check passes; never stage unrelated changes.

## Phase 1: Setup — audit and adapters

**Purpose**: Confirm the access contract and prepare the trusted adapter path without rebuilding authentication.

- [ ] T001 Auditar la sesión y documentar contrato observado en `.context/specs/002-comuna-ayuda/contracts/auth-boundary.md`, leyendo `src/app/(public)/login/page.tsx`, `src/modules/dev-auth/dev-auth.server.ts`, `src/modules/dev-auth/dev-auth.constants.ts`, `src/lib/server/session.server.ts`, `src/lib/server/jwt.server.ts`, `src/lib/config/security.config.ts` y `src/lib/bff/backend-proxy.server.ts`. **Dueña**: auditoría de sesión. **Entrada**: checkout y contrato actual. **Salida**: nombres/claims/configuración verificados, flujos que usan DevRoleSwitcher y discrepancias conocidas; sin cambios a archivos de auth. **Depende**: —. **Check**: ejecutar `rg -n 'signDevAuthToken|DEV_AUTH_ISSUER|authCookieNames|verifyAccessJwt|REQUEST_HEADERS' 'src/app/(public)/login' src/modules/dev-auth src/lib/server/session.server.ts src/lib/server/jwt.server.ts src/lib/config/security.config.ts src/lib/bff/backend-proxy.server.ts`; comparar con Network de `/login` usando el selector existente y registrar destinos ausentes sin crear páginas ni divulgar el JWT.
- [ ] T002 Alinear el contrato de confianza y crear DTO/puerto tipado en `src/core/contracts/comuna.contracts.ts` y `src/lib/api/comuna-api.ts` sobre `src/lib/api/api.ts`, usando el JWT y la identidad persistida descritos en `contracts/auth-boundary.md` y solo rutas demo de `contracts/demo-api.md`; no declarar rutas de API real. **Dueña**: `core/` y adaptador `lib/`. **Entrada**: auditoría T001 y contratos. **Salida**: tipos/puerto para contexto, catálogo, solicitudes, recepciones, intentos y archivos; el adaptador solo traduce HTTP y puede mapear a una API real cuando exista contrato confirmado. **Depende**: T001. **Check**: `pnpm exec tsc --noEmit` sin errores atribuibles a estos archivos; inspección de imports confirma que no incluyen SQLite ni reglas de dominio.
- [ ] T003 Adaptar el transporte existente en `src/lib/bff/backend-proxy.server.ts` para filtrar cabeceras entrantes, inyectar `DEMO_API_SERVICE_TOKEN` solo al destino loopback demo y reenviar `Idempotency-Key`, manteniendo CSRF, streaming, status y errores. Crear cobertura focalizada en `src/lib/bff/backend-proxy.server.test.ts`. **Dueña**: BFF servidor. **Entrada**: contrato T001/T002 y transporte existente. **Salida**: frontera servidor-servidor comprobable; ningún token de servicio aportado por el navegador. **Depende**: T002. **Check**: `pnpm exec vitest run src/lib/bff/backend-proxy.server.test.ts --environment node`; incluir origen no permitido, URL/secretos mal configurados y cabecera falsificada.
- [ ] T004 Crear el paquete privado independiente y exclusiones locales en `demo-api/package.json`, `demo-api/pnpm-lock.yaml` y `demo-api/.gitignore`, conforme a `plan.md`; fijar runtime Node observado y dependencias solo del servicio. No modificar manifests, lockfiles, workspace ni tsconfig de raíz. **Dueña**: paquete de demo-api. **Entrada**: investigación y contrato de confianza. **Salida**: paquete ESM `.mjs` instalable aislado. **Depende**: T003. **Check**: `pnpm --dir demo-api --ignore-workspace install --frozen-lockfile` y comprobar que `node_modules` del servicio no se rastrea.

---

## Phase 2: Foundational — SQLite, identidad y permisos

**Purpose**: Una fuente persistida compartida, identidad verificada, acceso por entidad y primitivas de escritura seguras. Ninguna pantalla COM comienza antes de terminar esta fase.

- [ ] T005 Añadir primero checks de esquema/up/down en `demo-api/tests/persistence.test.mjs`; después implementar apertura de BD, ruta canónica, migraciones y backup en `demo-api/src/database.mjs`, `demo-api/src/migrations/` y `demo-api/scripts/`. Conservar “Tablas STRICT; FK activadas por conexión, WAL, synchronous FULL, busy_timeout de 1000 ms”, checksum y orden de migraciones; derivar la ruta desde el módulo y no de `process.cwd()`. **Dueña**: almacenamiento/migraciones. **Entrada**: package T004 y modelo de datos. **Salida**: up/down reversible para BD temporal y backup consistente en la ubicación ignorada; ningún down/reset en arranque. **Depende**: T004. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/persistence.test.mjs`; up/down/up solo sobre directorio temporal y `git check-ignore` de los archivos runtime.
- [ ] T006 Crear esquema y seed idempotente en `demo-api/migrations/` y `demo-api/src/seed.mjs`, conservando “Exactamente siete iniciales, nombres Área DEMO Piura01…07 (FICTICIA)” y `role comuna/ong/brigada/defensaCivil; entity_id UNIQUE; COM/ONG/BRI requieren entidad del mismo tipo, DC requiere NULL`. Preservar además “Unidad fija no vacía; semilla divisible=false”, emergencias “ACTIVA/FINALIZADA; una activa precargada y una histórica ficticia”, `UNIQUE(approval_id,request_line_id); positivo, misma solicitud/producto; suma de aprobados ≤ solicitado` y `UNIQUE(dispatch_id,approval_line_id); positivo; producto/unidad heredados; total enviado contra aporte ≤ aprobado`. FK/triggers verifican tipo de entidad, solicitud/producto, ONG/comuna de despacho y pertenencia de líneas de recepción al despacho. **Dueña**: modelo y fixtures. **Entrada**: T005 y entidades/reglas de `data-model.md`. **Salida**: cinco productos, subjects demo existentes, seis jefaturas COM fixture y despachos `SEED_SIMULATED`; registrar `seed_versions` después de validar, usar `INSERT` dirigido a PK y nunca `OR REPLACE`. **Depende**: T005. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/persistence.test.mjs`; contar áreas, verificar vínculos 1:1 y comparar dos seeds sin reabrir recepciones.
- [ ] T007 Añadir primero casos de autenticación/RBAC a `demo-api/tests/service.test.mjs`; después verificar credencial de servicio y JWT existente y resolver subject/rol/entidad contra SQLite en `demo-api/src/auth.mjs`. Conservar “role comuna/ong/brigada/defensaCivil”, `entity_id UNIQUE` y “DC requiere NULL”; validar sujeto activo y entidad del tipo correspondiente antes de cada acceso. **Dueña**: autenticación/autorización del servicio. **Entrada**: contrato T001 y seed T006. **Salida**: identidad fiable o 401/403, sin nuevo login, claims, emisor o cookie. **Depende**: T006. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs`; token vencido/alterado o credencial ausente→401; rol/desvinculación/entidad ajena→403.
- [ ] T008 Añadir primero escenarios de replay/concurrencia/rollback en `demo-api/tests/service.test.mjs`; después implementar transacción, hash canónico, idempotencia y auditoría en `demo-api/src/idempotency.mjs`, `demo-api/src/audit.mjs` y `demo-api/src/database.mjs`. Conservar `PK(subject,operacion,recurso,key)`, “respuesta exitosa guardada con agregado/auditoría”, “No expiración durante demo” y eventos append-only. **Dueña**: primitivas de escritura del dominio. **Entrada**: esquema T006 y actor autorizado T007. **Salida**: agregado, evento y respuesta guardados atómicamente; misma clave/contenido reproduce respuesta y otra carga da conflicto. **Depende**: T007. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs`; concurrencia y error antes de commit dejan una escritura o cero escrituras parciales.
- [ ] T009 Implementar `/contexto`, `/catalogo` y validación compartida de rutas/errores en `demo-api/src/server.mjs` y `demo-api/src/contexto.mjs`, reutilizando autorización T007 y envelope de `contracts/demo-api.md`. **Dueña**: HTTP base de demo-api. **Entrada**: identidad y datos de T006–T008. **Salida**: cuatro roles leen su contexto persistido; catálogo solo COM; capacidades DC limitadas, sin acceso operativo global. **Depende**: T008. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs`; assertions HTTP por rol, status 401/403 y ausencia de datos ajenos.

**Checkpoint**: migraciones y seed repetibles, identidad enlazada con datos persistidos, permisos cerrados y respuestas idempotentes; aún no hay reglas de solicitud/recepción ni pantallas.

---

## Phase 3: User Story 1 — Presentar una necesidad de mi comuna (Priority: P1)

**Goal**: Capturar, revisar y presentar una solicitud propia inmutable, disponible por identificador después de guardar.

**Independent Test**: Con identidad COM fixture y emergencia activa, presentar una solicitud válida con 1 y 5 productos; rechazar 0/6, duplicados y cantidades inválidas; reintentar una respuesta incierta y consultar la misma solicitud persistida.

- [ ] T010 [US1] Añadir primero casos de alta válida/inválida, permisos e idempotencia en `demo-api/tests/service.test.mjs`; después implementar alta en `demo-api/src/solicitudes.mjs` y `demo-api/src/server.mjs`. Conservar “Población entera positiva; textos trim no vacíos; creador COM titular”, “UNIQUE(request_id,product_id); cantidad positiva; unidad snapshot coincide con catálogo; 1…5 líneas por agregado” y “API rechaza fracciones, NaN, infinito y valores fuera de Number.MAX_SAFE_INTEGER; sumas también verificadas”. **Dueña**: comando POST de solicitud. **Entrada**: fundamento T005–T009 y reglas US1. **Salida**: solo `PRESENTADA`, sin prioridad calculada ficticia, con identidad/entidad/fecha/líneas del servidor; no acepta identidad o estado del cuerpo. **Depende**: T009. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs`; alta 1/5 válida, 0/6/duplicado/unidad/campos inválidos sin filas parciales, replay de misma clave igual, carga incompatible en conflicto y clave nueva crea solicitud independiente.
- [ ] T011 [US1] Crear formulario y revisión en la misma URL en `src/modules/comuna/components/solicitud-form.tsx` y `src/app/(platform)/(workspace)/comuna/solicitudes/nueva/page.tsx`, reutilizando Form, RHF/Zod y controles de `src/ui/`. **Dueña**: página de alta COM. **Entrada**: T002/T010, catálogo y `CrearSolicitud`. **Salida**: población, situación, urgencia y 1–5 productos únicos; revisar/corregir antes de enviar y feedback solo tras respuesta del servicio. **Depende**: T010. **Check**: recorrido navegador con identidad demo: revisión no persiste, campos inválidos identifican error y confirmación aceptada enlaza al detalle; `pnpm build`.
- [ ] T012 [US1] Añadir primero caso de lectura propia/ajena a `demo-api/tests/service.test.mjs`; después implementar consulta de bandeja/detalle en `demo-api/src/solicitudes.mjs`, `src/modules/comuna/components/solicitudes-list.tsx`, `src/modules/comuna/components/solicitud-detail.tsx`, `src/app/(platform)/(workspace)/comuna/solicitudes/page.tsx` y `src/app/(platform)/(workspace)/comuna/solicitudes/[solicitudId]/page.tsx`. **Dueña**: lecturas API y páginas de solicitudes. **Entrada**: registros T010 y componentes de T011. **Salida**: solicitud confirmada accesible, solo lectura, identificadores/datos propios; solicitud ajena no filtra contenido. **Depende**: T011. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs` y, tras reiniciar frontend y servicio, crear, listar y abrir el mismo ID; recurso ajeno no revela datos.

**Checkpoint**: alta y consulta básica se sostienen por datos del servicio y permiten completar la prueba independiente de US1.

---

## Phase 4: User Story 2 — Consultar mi atención sin confundir etapas (Priority: P1)

**Goal**: Resumir solo la comuna titular y mostrar saldos por producto sin contar propuestas o tránsito como recepción.

**Independent Test**: Consultar el fixture 100/70/20 y una segunda comuna; comprobar 100/50/20/30/80, aislamiento y estados de carga/vacío/error.

- [ ] T013 [US2] Añadir primero pruebas de saldos/estados por comuna en `demo-api/tests/service.test.mjs`; después implementar proyección en `demo-api/src/solicitudes.mjs` y `demo-api/src/dashboard.mjs`, preservando `P=A−Σ(enviado de F), R=Σ(conforme de F)`, `sin_asignar=max(0,S−R−P)` y `aun_no_satisfecho=max(0,S−R)`. Conservar además: “PRESENTADA si no hay atención registrada; EN_ATENCION si existe aporte/despacho pero R=0; PARCIAL si alguna recepción conforme existe y falta alguna línea; ATENDIDA solo si todas las líneas alcanzan S.” **Dueña**: consultas y saldos del servicio. **Entrada**: solicitudes T010 y hechos seed/aprobación/despacho. **Salida**: valores por línea/unidad y comuna autenticada, sin reglas de negocio en Route Handlers. **Depende**: T012. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs`; fixture presenta 100/50/20/30/80, segunda comuna aislada y llegada sin recepción no aumenta conformes.
- [ ] T014 [US2] Componer dashboard y saldos de detalle en `src/modules/comuna/components/comuna-dashboard.tsx`, `src/modules/comuna/components/solicitud-detail.tsx` y `src/app/(platform)/(workspace)/comuna/dashboard/page.tsx`, usando claves de consulta por subject y estados UI existentes. **Dueña**: consultas visibles COM. **Entrada**: DTO T002 y proyección T013. **Salida**: resumen propio, cinco saldos por producto, carga/vacío/error sin cifras sustitutas. **Depende**: T013. **Check**: `pnpm exec tsc --noEmit` y recorrido navegador comparado con el mismo fixture del check T013.
- [ ] T015 [US2] Reutilizar `src/app/(platform)/(workspace)/layout.tsx` y reglas existentes de destino por rol, prefijo exacto y menú en `src/lib/config/routes.config.ts`, `src/middleware/access-policy.ts`, `src/middleware/middleware-flow.ts` y `src/modules/app/config/navigation.config.ts`; añadir solo enlaces COM y destino al dashboard COM que ya existe desde T014. No crear sidebar, guard, login ni páginas de otros roles. **Dueña**: navegación/política existente. **Entrada**: auditoría T001 y página T014. **Salida**: rutas COM enlazadas y redirección COM sin bucles; conservar y documentar el resultado real para otros destinos ausentes. **Depende**: T014. **Check**: `pnpm exec vitest run src/middleware/route-policy.test.ts --environment node` más recorrido navegador de `/` y `/comuna` con identidad COM; comprobar destino dashboard sin asumir que los demás roles tienen páginas.

**Checkpoint**: dashboard, bandeja y detalle presentan una vista privada de estados y cantidades, con navegación integrada en el shell vigente.

---

## Phase 5: User Story 3 — Conciliar y finalizar una recepción propia (Priority: P1)

**Goal**: Registrar una única conciliación terminal por despacho solo tras llegada y guardar observaciones/diferencias.

**Independent Test**: En despacho esperado rechazar escritura; en fixture llegado conciliar 70 = 65 + 2 + 1 + 2, repetir concurrentemente y confirmar efecto único sin reactivar matching.

- [ ] T016 [US3] Añadir primero pruebas de bandejas/estados/destino en `demo-api/tests/service.test.mjs`; después exponer lecturas en `demo-api/src/recepciones.mjs` y `demo-api/src/server.mjs`, conservando `AUTORIZADO/RECOJO_INICIADO/EN_TRANSITO/LLEGADA_REGISTRADA` y “Llegada requiere llegada_at.” **Dueña**: lecturas de recepción. **Entrada**: fixture coherente T006 y permisos T007. **Salida**: líneas enviadas/estado/llegada propios; `puedeConfirmar` es informativo. **Depende**: T015. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs`; la proyección fixture esperado/llegada/finalizada es excluyente y una consulta ajena no expone el despacho.
- [ ] T017 [US3] Añadir primero pruebas de conciliación válida/inválida, cierre duplicado y concurrencia a `demo-api/tests/service.test.mjs`; después implementar confirmación en `demo-api/src/recepciones.mjs` y `demo-api/src/server.mjs`. Respetar `dispatch_id UNIQUE`, `dispatch_line_id UNIQUE`, “categorías enteras ≥0; CHECK suma=enviado_snapshot; diferencias requieren observación no vacía” y `FINALIZADA_CONFORME/FINALIZADA_CON_OBSERVACIONES`; transacción/auditoría/idempotencia. **Dueña**: comando terminal de recepción. **Entrada**: contrato `ConfirmarRecepcion`, T008 y T016. **Salida**: cierre único conforme o con observaciones; ninguna diferencia reactiva matching ni crea operación. **Depende**: T016. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs`; antes de llegada/conciliación inválida sin efectos, 70=65+2+1+2 conserva 5 diferencias, concurrencia/replay produce un solo evento y otra clave sobre despacho finalizado recibe 409.
- [ ] T018 [US3] Crear bandejas esperadas/llegadas/finalizadas en `src/modules/comuna/components/recepciones-list.tsx` y `src/app/(platform)/(workspace)/comuna/recepciones/page.tsx`. **Dueña**: lista de recepciones COM. **Entrada**: DTO y lectura T016. **Salida**: listas privadas con estados en texto y acceso a detalle; carga/vacío/error. **Depende**: T017. **Check**: `pnpm build` y recorrido navegador de las tres bandejas con el fixture, incluida llegada pendiente.
- [ ] T019 [US3] Crear composición del detalle, formulario, revisión y resultado de solo lectura en `src/modules/comuna/components/recepcion-detail.tsx`, `src/modules/comuna/components/recepcion-form.tsx`, `src/modules/comuna/components/recepcion-review.tsx` y `src/app/(platform)/(workspace)/comuna/recepciones/[despachoId]/page.tsx`. **Dueña**: detalle/acción de recepción COM. **Entrada**: T017/T018 y componentes Form/UI existentes. **Salida**: envío persistido, reconciliación por línea, observación condicional y confirmación explícita; sin éxito anticipado ni segunda edición. **Depende**: T018. **Check**: recorrido navegador esperado→bloqueado, llegado→revisión→confirmación y recarga→solo lectura; errores de servidor siguen visibles por campo.

**Checkpoint**: recepción única y persistida; saldos y estado derivan del servicio.

---

## Phase 6: User Story 5 — Conservar identidad y datos entre roles y reinicios (Priority: P1)

**Goal**: Los cuatro roles consumen la misma fuente mediante sus permisos; esta entrega no añade páginas de otros roles.

**Independent Test**: Con cuatro subjects existentes y COM fixture adicional, leer contexto/referencias tras reiniciar y negar cambios/recursos ajenos.

- [ ] T020 [US5] Añadir primero pruebas de lectura permitida/denegada y reinicio a `demo-api/tests/service.test.mjs` y `demo-api/tests/persistence.test.mjs`; después completar proyecciones ONG/BRI y lectura limitada DC en `demo-api/src/referencias.mjs` y `demo-api/src/server.mjs`, aprovechando el contexto T009. **Dueña**: consultas interrol mínimas. **Entrada**: identidades/relaciones seed, despachos T006 y matriz de `data-model.md`. **Salida**: ONG/BRI solo referencias propias, DC sin inventario ni lecturas globales, sin escrituras no COM ni pantallas nuevas. **Depende**: T019. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs tests/persistence.test.mjs`; cuatro identidades consultan la misma BD tras reiniciar servicio y Next, y tres identidades no COM no crean solicitud ni confirman recepción.

---

## Phase 7: User Story 4 — Obtener documentos de envío y recepción (Priority: P2)

**Goal**: Descargar XLSX de enviado y PDF de recibido/diferencias únicamente para una recepción propia finalizada.

**Independent Test**: Descargar ambos archivos del fixture finalizado, abrir con lectores independientes y contrastar cada línea con la BD; acceso pendiente/ajeno no devuelve archivo.

- [ ] T021 [US4] Añadir primero casos XLSX a `demo-api/tests/documents.test.mjs`; después generar el manifiesto en `demo-api/src/documentos.mjs`, usando ExcelJS y líneas ENVIADAS de hechos finalizados. **Dueña**: generador XLSX del servicio. **Entrada**: despacho/recepción T017 y metadatos de `contracts/demo-api.md`. **Salida**: archivo XLSX real inspeccionable, cantidades/unidad correctas, texto de entrada literal incluso si inicia `=,+,-,@`, marca DEMO/SIMULADO. **Depende**: T020. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/documents.test.mjs`; abrir con lector XLSX distinto del generador y comparar filas con fixture.
- [ ] T022 [US4] Añadir primero casos PDF a `demo-api/tests/documents.test.mjs`; después generar el acta en `demo-api/src/documentos.mjs`, usando pdf-lib/fontkit y fuente local licenciada. **Dueña**: generador PDF del servicio. **Entrada**: recepción finalizada T017 y metadatos del contrato. **Salida**: enviado, desglose recibido, faltante, diferencias, observaciones, fecha/responsable y marca simulada, con texto envuelto y páginas legibles. **Depende**: T021. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/documents.test.mjs`; inspeccionar el PDF con lector independiente y observaciones largas/tildes.
- [ ] T023 [US4] Añadir descargas autorizadas en `demo-api/src/documentos.mjs` y rutas XLSX/PDF de `demo-api/src/server.mjs`, comprobando titularidad y recepción finalizada antes de producir contenido. **Dueña**: endpoints binarios del servicio. **Entrada**: generadores T021/T022. **Salida**: MIME/disposition correctos, `no-store`, error recuperable sin alterar el cierre. **Depende**: T022. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/documents.test.mjs`; propias finalizadas→archivo, pendiente/ajena→sin contenido protegido.
- [ ] T024 [US4] Conectar descargas en `src/modules/comuna/components/recepcion-detail.tsx` y `src/lib/api/comuna-api.ts`, usando la descarga Blob del cliente existente. **Dueña**: adaptador/UI de documentos. **Entrada**: endpoint T023 y `RecepcionDTO`. **Salida**: acciones habilitadas solo según respuesta del servicio y archivos con nombre/extensión adecuados. **Depende**: T023. **Check**: recorrido BFF real recibe archivos binarios íntegros y abre ambos; fallo de generación informa error y conserva la recepción.

**Checkpoint**: archivos son reproducibles desde hechos guardados, autorizados y separados por magnitud.

---

## Phase 8: Polish — regresión y cierre

**Purpose**: Verificar aislamiento, recorridos móviles, persistencia y estado del repositorio para cada entrega implementada.

- [ ] T025 Completar regresión de migraciones, seed, backup y reinicio en `demo-api/tests/persistence.test.mjs` y `demo-api/scripts/backup.mjs`; ejercitar exclusivamente BD temporal. **Dueña**: persistencia. **Entrada**: T005–T024. **Salida**: reinicio conserva solicitudes/recepciones/eventos y seed no duplica; restauración temporal íntegra. **Depende**: T024. **Check**: `pnpm --dir demo-api --ignore-workspace exec node --test tests/persistence.test.mjs`; `git check-ignore` cubre DB/WAL/SHM/backups/.env.local y `git ls-files '*.sqlite' '*.sqlite-wal' '*.sqlite-shm'` no lista BD.
- [ ] T026 Regresar sesión, BFF, RBAC, idempotencia, rutas y archivos con los casos ya añadidos en `src/lib/bff/backend-proxy.server.test.ts`, `src/middleware/route-policy.test.ts` y `demo-api/tests/`. **Dueña**: integración de fronteras. **Entrada**: servicio y UI completos. **Salida**: evidencia de 401/403, titularidad, mismo origen, cabecera de servicio filtrada, replay y límites de rol; registrar por separado cualquier destino de rol sin página. **Depende**: T025. **Check**: `pnpm exec vitest run src/middleware/route-policy.test.ts src/lib/bff/backend-proxy.server.test.ts --environment node` y `pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs tests/persistence.test.mjs tests/documents.test.mjs`.
- [ ] T027 Revisar las seis rutas y los flujos de solicitud/recepción con teclado y viewport de 360 × 800, reportando accesibilidad/overflow sin alterar primitivas UI por fuera del scope. **Dueña**: validación UI COM. **Entrada**: `quickstart.md` y pantallas T011–T024. **Salida**: evidencia concreta de foco, labels, errores, carga/vacío/fallo y ausencia de desplazamiento horizontal crítico. **Depende**: T026. **Check**: completar los recorridos manuales de “Integración BFF y pantallas” en `quickstart.md`; registrar páginas y resultados observados.
- [ ] T028 Ejecutar cierre técnico y revisar el diff del feature antes de entregar en `.context/specs/002-comuna-ayuda/quickstart.md` y staging Git. **Dueña**: verificación/cierre. **Entrada**: resultados T025–T027 y estado Git inicial documentado. **Salida**: comandos/resultados reales, limitaciones restantes y commits individuales por tasks verificadas; ningún cambio ajeno en staging. **Depende**: T027. **Check**: ejecutar `pnpm lint`, `pnpm build`, `pnpm exec tsc --noEmit`, Vitest de middleware/BFF y los tres comandos Node indicados en T026; reportar fallos preexistentes sin ocultarlos.

---

## Dependencias y orden de ejecución

### Dependencias de fases

- **Setup (Phase 1)**: T001 → T002 → T003 → T004. Audita sesión antes de definir la frontera; el adaptador precede al paquete de servicio.
- **Foundational (Phase 2)**: T005 → T006 → T007 → T008 → T009. Migración y seed preceden autorización/idempotencia y API compartida; bloquea todas las historias.
- **US1 (Phase 3)**: T010 → T011 → T012. El servicio confirma antes de integrar alta; la lectura propia deja consultable la solicitud.
- **US2 (Phase 4)**: T013 → T014 → T015. Saldos del servicio preceden su presentación y navegación.
- **US3 (Phase 5)**: T016 → T017 → T018 → T019. Lectura precede escritura; contrato terminal precede UI de conciliación.
- **US5 (Phase 6)**: T020. Completa proyecciones limitadas de los otros roles antes de los archivos.
- **US4 (Phase 7)**: T021 → T022 → T023 → T024. Generadores preceden endpoints y descargas UI.
- **Polish (Phase 8)**: T025 → T026 → T027 → T028. Persistencia antes de regresión integrada y cierre.

No se marcan tareas `[P]`: la secuencia pedida comparte contrato, BD, servicio y cliente, por lo que dividir fases entre personas produciría solapamientos o saltaría prerrequisitos.

### Ejecución paralela por historia

No hay tareas concurrentes seguras dentro de una historia: los comandos de escritura deben estar listos antes de su UI, y los archivos XLSX/PDF comparten `demo-api/src/documentos.mjs` y `demo-api/tests/documents.test.mjs`.

| Historia | Orden ejecutable |
| --- | --- |
| US1 | T010 → T011 → T012 |
| US2 | T013 → T014 → T015 |
| US3 | T016 → T017 → T018 → T019 |
| US5 | T020 |
| US4 | T021 → T022 → T023 → T024 |

### Orden de historias

- **US1 (P1)**: después de la fundación; no requiere matching ni UI de otros roles.
- **US2 (P1)**: depende de solicitudes/fixtures de US1 para mostrar estados y saldos.
- **US3 (P1)**: depende del despacho llegado persistido por seed; no implementa flujo Brigada.
- **US5 (P1)**: depende de identidad/DB de la fundación y verifica proyecciones que usan referencias creadas por US3.
- **US4 (P2)**: depende de recepción finalizada de US3.

## Estrategia de entregas

### MVP incremental

1. Completar auditoría/adaptador y servicio compartido T001–T009.
2. Entregar alta/lista/detalle de solicitud T010–T012 como primer incremento COM.
3. Añadir dashboard/saldos y navegación COM T013–T015.
4. Completar conciliación y acceso compartido por rol T016–T020.
5. Añadir XLSX/PDF autorizados T021–T024; la exportación es P2 en la spec.
6. Ejecutar regresión/cierre T025–T028. Cada task se revisa y verifica antes de su commit individual.

### Alcance excluido de las tasks

No crear login, emitir otra cookie, crear sidebar o guards alternos, agregar pantallas ONG/Brigada/DC, inventar endpoints de una API real, implementar matching/prioridad/inventario ni modificar `.specify/`, `.agents/skills/`, `.codex/`, `AGENTS.md`, Constitution, tsconfig o workspace raíz. Los destinos compartidos que el audit registra como ausentes se informan; no se cubren con páginas placeholder.

## Notes

- Las pruebas del servicio usan Node integrado y directorios/puertos temporales; no la BD demo persistida. Down/reset nunca se ejecuta sobre datos conservados.
- Los comandos de servicio son ejecutables cuando sus archivos/manifiesto hayan sido creados; hoy el paquete no existe. No son verificaciones ya ejecutadas.
- `pnpm lint`, `pnpm build`, Vitest y `pnpm exec tsc --noEmit` son comandos raíz existentes o respaldados por dependencias/scripts inspeccionados; no hay `pnpm test`.
- Revisar el diff antes de cada commit: el workspace ya contiene cambios ajenos, incluso en archivos próximos a la integración.
