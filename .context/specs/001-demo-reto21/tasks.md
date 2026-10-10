---
description: "Tareas delimitadas para materializar el prototipo frontend DEMO del Reto 21"
---

# Tasks: Prototipo visual DEMO del Reto 21

**Input**: Documentos de `.context/specs/001-demo-reto21/`.
**Prerequisites**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contrato UI](contracts/demo-ui.md), [quickstart.md](quickstart.md) y [checklist visual](checklists/prototipo-visual.md).
**Estado**: Sólo descomposición de trabajo; las 25 tareas están pendientes. No se implementa con esta invocación.
**Organization**: Preparación documental, fundamentos y US1–US4, seguidos de integración transversal y verificación. Las fases 2–8 corresponden exactamente a los siete pasos de construcción solicitados.
**Tests**: Comprobaciones focalizadas de integridad, cantidades, transiciones y acceso dentro de sus tareas; verificación técnica/visual en la fase final. Sin TDD impuesto, snapshots masivos o infraestructura nueva de tests.

## Format: `[ID] [P?] [Story] Description`

- IDs secuenciales T001–T025; `[US1]` a `[US4]` sólo en las fases de historia.
- `[P]` sólo indica archivos independientes después de completar sus dependencias; nunca autoriza saltar el orden de fases.
- Cada tarea define archivos, límite de alcance y criterio de terminación. Verificación satisfactoria y diff revisado antes de marcarla; commit por tarea verificada, sin cambios ajenos.

## Path Conventions

Rutas relativas a la raíz del repositorio. `src/app/` compone; `src/modules/demo/` contiene pantallas, componentes y estado de la demo. Reutilizar `src/ui/`, `src/shared/` y tokens existentes, sin modificar primitivas o tooling por conveniencia.

Sin backend, API de negocio, base de datos, autenticación DEMO, persistencia, nuevas dependencias, Valhalla, optimización vial, documentos finales o sincronización real. OpenFreeMap se mantiene únicamente como cartografía de presentación expresamente prevista en el plan, con dependencia de red y atribución visibles.

## Phase 1: Setup — preparación documental, sin construcción

**Purpose**: Hacer explícitos los requisitos pendientes antes de aprobar su materialización. No instalar paquetes ni configurar herramientas.

- [x] T001 Registrar, tras obtener las decisiones del responsable, los criterios de tamaños mínimos, contraste medible y comunicación a lectores de pantalla en `.context/specs/001-demo-reto21/spec.md` y `.context/specs/001-demo-reto21/contracts/demo-ui.md`; alinear `.context/specs/001-demo-reto21/quickstart.md` con ellos. Alcance: sólo CHK025/CHK027/CHK028; sin asumir umbrales o alterar funcionalidades. Cierre: decisiones trazables y sin contradicciones; el revisor resuelve las marcas de `.context/specs/001-demo-reto21/checklists/prototipo-visual.md`, no el implementador automáticamente.

**Checkpoint**: Generar estas tareas no aprueba el checklist personalizado. La futura ejecución debe respetar su gate; las casillas no se rellenan en bloque ni se ignoran porque exista el checklist general 16/16. T001 queda pendiente mientras falten decisiones o revisión. No bloquea esta entrega documental de tasks.

## Phase 2: Foundational — paso 1, fixtures y layout de demostración

**Goal**: Escenario único, cálculos/estado temporal y contenedor DEMO público; ninguna pantalla operativa real.

- [x] T002 Crear tipos y escenario único en `src/modules/demo/data/demo.types.ts` y `src/modules/demo/data/demo.fixtures.ts`, con test de integridad en `src/modules/demo/__tests__/demo.fixtures.test.ts`. Conservar literalmente los límites de data-model: «IDs únicos estables», «Unidad única por insumo; sin conversiones», «Cantidades enteras no negativas en unidades de ejemplo; líneas/cargas positivas», prioridad fija `alta/media/baja` y estado inicial `preparado/en_transito/recibido`. Incluir referencias/fechas ficticias, stock suficiente/insuficiente/agotado y geometrías aproximadas válidas de Piura; verificar referencias geográficas reales sin inventar fronteras o padrones. Cierre: referencias completas, claves compuestas y líneas únicas; recibido + comprometido no supera demanda y reserva base no supera stock; test aprobado sin servicio externo de negocio.
- [x] T003 Implementar selectores de necesidades, stock, cobertura e indicadores en `src/modules/demo/data/demo.selectors.ts` y cubrir sus casos límite en `src/modules/demo/__tests__/demo.fixtures.test.ts`. Aplicar las definiciones exactas «available = onHand - reservedBaseline - reservedNew», «pendingReceipt = required - received» y «uncovered = pendingReceipt - committed»; atendible es el mínimo de nominal/disponible/por cubrir. Alcance: cálculos de presentación, sin motor de asignación ni proyección documental todavía. Cierre: no sumar unidades incompatibles, no ocultar incoherencias con recortes a cero y obtener magnitudes coherentes antes/después de compromisos y recepción.
- [x] T004 Crear `src/modules/demo/state/demo.reducer.ts` y `src/modules/demo/state/DemoProvider.tsx`, con checks en `src/modules/demo/__tests__/demo.reducer.test.ts`. Estado mínimo: cantidades por propuesta reservada, IDs recibidos y conexión visual; sin totales o copias de despachos. Preservar «ID válido, no reservada, alguna línea positiva, stock/demanda suficientes para lo mostrado» y «Despacho inicialmente en tránsito, no recibido en el recorrido». Aceptar reservas atómicamente, rechazar resumen obsoleto/duplicados y no crear/modificar despachos; recepción no descuenta origen nuevamente; conexión sólo cambia aviso. Cierre: tests de límites/transiciones aprobados y estado exclusivamente en memoria; no UI de acciones en esta tarea.
- [x] T005 Montar provider y shell mínimo con aviso DEMO/reinicio en `src/app/(public)/demo/layout.tsx`, `src/modules/demo/components/DemoShell.tsx` y `src/modules/demo/index.ts`. Reutilizar proveedores/tokens existentes, sin SidebarProvider que escriba cookies. Alcance: contenedor/exports públicos, sin páginas de historias ni enlaces a destinos aún inexistentes. Cierre: dependencias `app → modules/demo → shared/ui/lib`, sin nuevo proveedor global, capa vacía, persistencia o cambios fuera de DEMO.
- [x] T006 Añadir sólo el acceso público por prefijo `/demo` en `src/lib/config/routes.config.ts` y regresión focalizada en `src/middleware/route-policy.test.ts`. Alcance: política de rutas de aplicación, sin tocar proxy, matcher, JWT o login. Cierre: `/demo` y las cuatro rutas descendientes solicitadas se resuelven públicas; `/demo-extra`, `/demostracion` y privadas conservan política anterior; `/login` sigue público. No afirmar pantallas existentes antes de crearlas.

**Independent Test**: Fixtures/selectores/reducer/política verificables sin mapa, sesión o negocio remoto. Provider/layout se integrará con la primera página en T010; no se declara un dashboard terminado en esta fase.

## Phase 3: US1 — paso 2, dashboard con mapa de Piura (Priority: P1)

**Goal**: Consultar albergues, filtros, indicadores y prioridades DEMO.

- [x] T007 [US1] Proyectar zonas, albergues y recorridos del fixture a fuentes GeoJSON en `src/modules/demo/data/demo.geojson.ts`, ampliando `src/modules/demo/__tests__/demo.fixtures.test.ts` con geometrías/referencias. Alcance: `Polygon/MultiPolygon`, `Point` y `LineString` ilustrativos por ID; no duplicar inventario, geocodificar ni calcular recorridos. Cierre: coordenadas longitud/latitud y polígonos válidos, IDs conservados, filtro coherente y zonas explícitamente DEMO.
- [ ] T008 [P] [US1] Crear `src/modules/demo/components/DemoMap.tsx` con MapLibre instalado, estilo OpenFreeMap/atribución y worker de módulo según `research.md`. Cargar sólo desde cliente, gestionar instancia/cleanup, fuentes tras cargar estilo, `setData`, selección, tamaño/reflow, carga y fallo parcial/completo con reintento. Alcance: mapa visual por props GeoJSON; sin nuevos paquetes, configuración de bundler o lógica vial. Cierre: instancia no se recrea al filtrar, selección emite ID válido y fallo deja disponible alternativa textual de la pantalla; verificar worker en dev/navegador al integrarlo.
- [ ] T009 [P] [US1] Crear `src/modules/demo/components/ShelterDetail.tsx` con datos por props y UI adaptada. Incluir nombre ficticio, territorio, prioridad textual fija, población, grupos vulnerables, necesidades/unidades y origen/fecha simulados; no sumar grupos solapados como población distinta. Cierre: detalle legible/etiquetado, sin importar fixtures ni editar censos; mismo ID de selección que mapa/lista.
- [ ] T010 [US1] Componer `src/modules/demo/screens/DemoDashboard.tsx` y `src/app/(public)/demo/page.tsx`, actualizando exports en `src/modules/demo/index.ts`. Integrar filtros, indicadores, lista accesible equivalente, mapa dinámico y detalle. Alcance: dashboard; no asignaciones/despachos. Cierre: abrir `/demo` sin sesión, filtrar/limpiar/vacío, retirar detalle excluido y conservar prioridad fija; SC-003 trazable. La navegación a otras pantallas se completa cuando existan sus destinos.

**Independent Test**: Abrir directamente `/demo`, filtrar, seleccionar por lista/pin y comparar indicadores/detalle; provocar fallo cartográfico y mantener contenido textual. No exige haber reservado ni recibido nada.
**Checkpoint / MVP**: Dashboard DEMO revisable tras fundamentos + T007–T010. Es un corte de revisión, no la entrega completa de las cinco rutas.

## Phase 4: US2 — paso 3, vista de asignaciones (Priority: P2)

**Goal**: Leer necesidades/disponible y confirmar una reserva simulada sin modificar despachos.

- [ ] T011 [US2] Crear `src/modules/demo/components/AssignmentForm.tsx` con propuesta/atendible/faltantes por props y confirmación/cancelación mediante UI adaptada. Alcance: selección de ejemplos y confirmación de cantidades predefinidas; no editor libre ni alta. Cierre: etiquetas, resumen DEMO, restricciones explicadas y resultado visible; cancelar no cambia cantidades; sin llamadas de negocio.
- [ ] T012 [US2] Componer `src/modules/demo/screens/DemoAssignments.tsx` y `src/app/(public)/demo/asignaciones/page.tsx`, exponiendo pantalla en `src/modules/demo/index.ts`. Resolver ID opcional de albergue, enlazar selectores y reserva del provider; representar existencias/reservas/disponible y unidades. Cierre: entrada independiente con ejemplo, ID inválido con recuperación, reserva parcial/agotada/obsoleta/repetida coherente y sin cambios en cargas/estados de despachos; SC-004 trazable. No recalcular prioridades.

**Independent Test**: Abrir directamente `/demo/asignaciones`, consultar un ejemplo, cancelar/confirmar/repetir reserva y contrastar cantidades. No necesita selección previa en dashboard ni crea un despacho.

## Phase 5: US3 — paso 4, vista de despachos (Priority: P2)

**Goal**: Explorar ejemplos independientes y confirmar una recepción elegible.

- [ ] T013 [US3] Crear `src/modules/demo/components/DispatchDetail.tsx` con origen/destino, carga/unidades, vehículo ficticio, estado textual y mapa ilustrativo reutilizado por props. Alcance: presentación y diálogo de recepción; sin alta, edición o salida de despacho. Cierre: «Ruta ilustrativa, no verificada» y bloqueado/desconocido visibles; preparado/recibido explican no elegibilidad; cancelar no altera estado. No mostrar enlaces documentales mientras sus destinos no estén implementados.
- [ ] T014 [US3] Componer `src/modules/demo/screens/DemoDispatches.tsx` y `src/app/(public)/demo/despachos/page.tsx`, actualizando `src/modules/demo/index.ts`. Seleccionar ejemplo por ID/default, conectar recepción local y actualizar estado/indicadores relacionados. Cierre: entrada directa utilizable, recepción sólo de tránsito una vez, sin doble descuento de stock ni modificación por reservas nuevas; SC-005 trazable. Los accesos a documentos se conectan en T019 después de crear las rutas.

**Independent Test**: Abrir `/demo/despachos`, comparar preparado/tránsito/recibido, cancelar/confirmar recepción y volver a consultar origen/destino. Usa ejemplos iniciales, no necesita reservar antes. La comprobación de enlaces documentales de US3 queda expresamente en la fase 7.

## Phase 6: US4 — paso 5, vistas previas Excel y PDF (Priority: P3)

**Goal**: Documentos de ejemplo consistentes con el despacho, sin archivos finales.

- [ ] T015 [US4] Añadir proyección documental al selector existente `src/modules/demo/data/demo.selectors.ts` y cobertura de coherencia en `src/modules/demo/__tests__/demo.fixtures.test.ts`. Alcance: referencia/origen/destino/vehículo/líneas/estado del mismo despacho; sin fixtures documentales duplicados. Cierre: manifiesto/acta usan iguales cantidades/unidades y acta diferencia pendiente/recepción simulada después de recibir.
- [ ] T016 [US4] Crear `src/modules/demo/components/DocumentPreview.tsx` y `src/modules/demo/screens/DemoDocument.tsx`, exportando pantalla en `src/modules/demo/index.ts`. Alcance: tabla HTML de aspecto Excel y documento HTML de aspecto PDF por tipo/ID; sin exportadores, descarga, impresión o firma. Cierre: DEMO/sin validez oficial, ejemplo inicial identificado, ID inválido con aviso/selección válida y retorno al mismo despacho mediante referencia interna.
- [ ] T017 [P] [US4] Crear la entrada delgada `src/app/(public)/demo/documentos/manifiesto/page.tsx`, resolviendo `searchParams` asíncrono y pasando sólo tipo/referencia validada a la pantalla. Cierre: `/demo/documentos/manifiesto` pública y utilizable directamente o con ID, sin sesión/API ni creación de archivo `.xlsx`.
- [ ] T018 [P] [US4] Crear la entrada delgada `src/app/(public)/demo/documentos/acta/page.tsx`, resolviendo `searchParams` asíncrono y pasando sólo tipo/referencia validada a la pantalla. Cierre: `/demo/documentos/acta` pública, recibido pendiente/simulado consistente y sin archivo `.pdf`, firma o falsa recepción.

**Independent Test**: Abrir ambas rutas con ejemplo inicial o ID, comparar carga/estado con despachos y retornar al mismo. No exige navegar primero por otras pantallas ni generar un archivo real.

## Phase 7: Polish & Cross-Cutting — paso 6, navegación, responsive y simulación de estados

**Goal**: Consolidar el recorrido completo sin diferir la interacción básica propia de cada historia.

- [ ] T019 Conectar navegación activa y contexto entre `src/modules/demo/components/DemoShell.tsx`, `src/modules/demo/components/ShelterDetail.tsx`, `src/modules/demo/components/DispatchDetail.tsx` y las cinco páginas de `src/app/(public)/demo/`. Añadir acceso desde albergue a asignaciones y desde despacho a ambos documentos ya existentes, con IDs/retorno internos. Cierre: SC-002, entradas sin/con ID inválido, ida/vuelta y navegación del navegador coherentes; no enlaces muertos, URLs de retorno libres o salida involuntaria fuera de DEMO.
- [ ] T020 Ajustar composición responsive en `src/modules/demo/components/DemoShell.tsx`, `src/modules/demo/components/DemoMap.tsx`, `src/modules/demo/components/DocumentPreview.tsx` y pantallas de `src/modules/demo/screens/`. Aplicar tamaños acordados en T001, reordenación de paneles y scroll interno; no modificar estilos globales. Cierre: SC-007, sin texto/acciones críticos ocultos, overflow de página o canvas desajustado, conservando atribución.
- [ ] T021 Completar contraste y comunicación accesible acordados en T001 en `src/modules/demo/components/AssignmentForm.tsx`, `src/modules/demo/components/DispatchDetail.tsx`, `src/modules/demo/components/DemoShell.tsx` y componentes/pantallas afectados de `src/modules/demo/`. Cierre: nombres/labels, foco, Tab/Enter/Escape, cancelación/retorno, equivalente textual del mapa, estados no dependientes sólo del color y anuncios perceptibles según contrato; verificar temas existentes sin regenerar UI.
- [ ] T022 Añadir el control y banner de conectividad visual en `src/modules/demo/components/DemoShell.tsx` conectado al estado existente `src/modules/demo/state/DemoProvider.tsx`. Alcance: online/offline DEMO; no detectar conectividad para autorizar operaciones ni cortar red/crear cola. Cierre: SC-010; alternar no cambia cantidades/prioridad/recepciones, acciones locales continúan y volver online no anuncia sincronización; fallo real del mapa tiene aviso separado. Contrastar además continuidad entre pantallas y reinicio al recargar/desmontar, conforme a FR-011 y SC-008.

**Checkpoint**: Las cinco rutas y estados interactivos están integrados; faltan los checks finales para declarar terminado el mockup. Ningún control anuncia capacidades operativas excluidas.

## Phase 8: Verification — paso 7, verificación visual y técnica

**Goal**: Obtener evidencia real, corregir únicamente regresiones del scope y cerrar sin alterar trabajo ajeno.

- [ ] T023 Ejecutar checks focalizados de `src/modules/demo/__tests__/demo.fixtures.test.ts`, `src/modules/demo/__tests__/demo.reducer.test.ts` y `src/middleware/route-policy.test.ts`, TypeScript, Biome y build con los comandos de `.context/specs/001-demo-reto21/quickstart.md`. Registrar resultados reales allí. Cierre: cantidades/duplicados/transiciones/acceso y compilación verificados; clasificar fallos preexistentes o de red de fuentes, sin instalar/configurar tooling ni declarar aprobado lo no ejecutado.
- [ ] T024 Ejecutar el recorrido visual de `.context/specs/001-demo-reto21/quickstart.md` sobre las cinco rutas y registrar evidencia allí: tamaños acordados, claro/oscuro, teclado/lectores según contrato, entrada directa, mapa/worker/fallos, reserva/recepción/documentos, offline visual, reinicio y regresión fuera de DEMO. Cierre: SC-001–SC-010 comprobados o limitaciones explícitas; sin llamadas de negocio, descargas falsas ni firmas. Corregir sólo defectos del mockup y repetir los checks cuyos inputs cambien.
- [ ] T025 Revisar diff/staging del scope `src/app/(public)/demo/`, `src/modules/demo/`, `src/lib/config/routes.config.ts` y `src/middleware/route-policy.test.ts`; reconciliar `.context/STATE.md` y `.context/specs/001-demo-reto21/tasks.md` con evidencia real. Cierre: tareas marcadas sólo si terminadas/verificadas, un commit por tarea según contrato, sin cambios ajenos/protegidos, despliegue, limpieza destructiva ni cierre forzado de verificaciones incompletas.

## Dependencies & Execution Order

### Phase Dependencies

Preparación documental T001 → paso 1/fundamentos → US1/dashboard → US2/asignaciones → US3/despachos → US4/documentos → integración transversal → verificación final.

El orden entre historias es un requisito de construcción del usuario; sus pruebas independientes no requieren ejecutar acciones de historias anteriores. La navegación a destinos futuros se incorpora sólo cuando existen, evitando presentar rutas o botones como operativos antes de tiempo.

### Task Dependencies

| Tarea(s) | Dependencias completas antes de comenzar |
| --- | --- |
| T001 | Documentos existentes; decisiones/revisión pendientes no se suponen aprobadas |
| T002 | T001 y gate de checklist aplicable resuelto |
| T003 | T002 |
| T004 | T003 |
| T005 | T004 |
| T006 | T005 |
| T007 | T006 |
| T008, T009 | T007 |
| T010 | T008 y T009 |
| T011 | T010 |
| T012 | T011 |
| T013 | T012 |
| T014 | T013 |
| T015 | T014 |
| T016 | T015 |
| T017, T018 | T016 |
| T019 | T017 y T018 |
| T020 | T019 |
| T021 | T020 |
| T022 | T021 |
| T023 | T022 |
| T024 | T023; checks fallidos tratados o limitación explícita sin falso cierre |
| T025 | T024 y evidencia suficiente para los criterios declarados completos |

### Parallel Examples per User Story

- US1: después de T007, T008 (mapa) y T009 (detalle) pueden avanzar en paralelo, sin tocar los mismos archivos; T010 integra después.
- US2: T011 → T012 es serial: pantalla depende del formulario y su integración; no se fuerza paralelismo.
- US3: T013 → T014 es serial: detalle/confirmación antes de componer la pantalla.
- US4: después de T016, T017 y T018 pueden avanzar en paralelo: sólo crean páginas diferentes; no modifican el export o selector compartido.
- No paralelizar historias entre fases ni tareas sobre el mismo reducer, selector, barrel o shell. Estas oportunidades son del plan de ejecución futuro, no una delegación ejecutada en esta entrega.

## Traceability & Completion

| Requisitos | Tareas principales |
| --- | --- |
| FR-001, FR-020, FR-022 | T006, T010, T012, T014, T017, T018, T019, T023, T024 |
| FR-002 | T019, T024 |
| FR-003 | T002, T005, T011, T013, T016, T022 |
| FR-004, FR-005, FR-006, FR-007 | T002, T003, T007–T010 |
| FR-008, FR-009, FR-010, FR-011 | T002–T004, T011, T012, T022–T024 |
| FR-012, FR-013, FR-014, FR-015 | T002–T004, T007, T008, T013, T014 |
| FR-016, FR-017, FR-018, FR-019 | T015–T019, T024 |
| FR-021 | T004–T006, T008, T016, T022–T025 |
| FR-023, FR-025 | T001, T009–T014, T016, T020, T021, T024 |
| FR-024 | T004, T008, T022, T024 |
| SC-001–SC-010 | Checks específicos por fase; T023/T024 consolidan evidencia final |
| CHK025, CHK027, CHK028 | T001 define; T020/T021 materializan; T024 comprueba |

**Task count**: 25. Preparación: 1; fundamentos: 5; US1: 4; US2: 2; US3: 2; US4: 4; integración: 4; verificación: 3. Cuatro tareas `[P]`, en dos pares independientes.

## Implementation Strategy

**MVP first**: T001–T010 entregan el primer corte revisable (dashboard con mapa/fixtures/layout). No equivalen al alcance completo solicitado; no publicar ni desplegar automáticamente.

**Incremental delivery**: Completar cada fase con su comprobación independiente; asignaciones y despachos parten de ejemplos ya disponibles. La respuesta A se conserva en todos los incrementos. Cada tarea reutiliza lo existente antes de crear código y no añade mejoras ajenas a su cierre.

**Verification**: Checks pequeños junto a la lógica de riesgo; barrido técnico/visual al final. No dejar validación de confianza, accesibilidad básica o manejo de errores deliberadamente rotos para el polish. La fase transversal consolida y comprueba lo ya compuesto.

## Notes

- No se resolvieron de oficio los tres criterios pendientes; T001 los vuelve explícitos y ejecutables cuando existan las decisiones.
- Ninguna tarea cambia AGENTS.md, Constitution, skills, runtimes, MCP, configuración protegida o servicios reales. `routes.config.ts` es la única configuración funcional de aplicación prevista para abrir `/demo`.
- Los documentos Excel/PDF son previsualizaciones HTML, la conectividad es visual y las rutas son GeoJSON ilustrativo. No añadir capacidades reales para satisfacer tareas de mockup.
- Checklist personalizado y tareas son artefactos distintos: revisión de requisitos no significa implementación, y marcar una tarea no aprueba automáticamente las casillas del revisor.
