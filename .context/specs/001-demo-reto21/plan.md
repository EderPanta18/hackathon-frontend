# Implementation Plan: Prototipo DEMO del Reto 21

**Branch**: `eder` | **Date**: 2026-10-10 | **Spec**: [spec.md](spec.md)

**Input**: `.context/specs/001-demo-reto21/spec.md`, respuesta A y restricciones de planificación del usuario.

**Estado**: Plan técnico. Esta entrega no implementa pantallas, lógica ni cambios de configuración de aplicación.

## Summary

Materializar las cinco pantallas públicas bajo `/demo` con páginas delgadas de App Router y un único módulo `src/modules/demo/`. Reutilizar UI adaptada, tokens y proveedores existentes; separar fixtures, selectores y estado temporal de los componentes visuales. MapLibre GL JS instalado y OpenFreeMap mostrarán zonas, pines y rutas ilustrativas mediante GeoJSON local.

La reserva modifica disponibilidad y cantidades reservadas, sin crear ni modificar despachos. Los despachos de ejemplo ya tienen sus cargas contabilizadas y sólo permiten simular recepción estando en tránsito. Prioridades fijas del escenario. Offline es un aviso visual activable, sin almacenamiento, cola ni sincronización.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 16.4.0, React 19.3.0 y Tailwind CSS 4 según `package.json`; Next y MapLibre contrastados con paquetes locales.

**Primary Dependencies**: `maplibre-gl` 6.13.0 instalado, UI en `src/ui/`, React Hook Form, Zod, Sonner y `cn` existente. No añadir dependencias ni actualizar lockfile.

**Storage**: Un objeto de fixtures compartidos y estado React en memoria bajo el layout DEMO. Sin cookies DEMO, localStorage, sessionStorage, IndexedDB, API ni base de datos.

**Testing**: Vitest 5.0.3 y Testing Library instalados. No se localizaron tests/configuración Vitest; planificar tests puros por CLI sin configuración de runtime nueva. Scripts reales: `dev`, `build`, `start`, `lint`, `format`; no existe script `test` ni `typecheck`.

**Target Platform**: Navegador móvil/escritorio, español, teclado y temas existentes. WebGL/worker sólo para mapas; conservar contenido textual si fallan.

**Project Type**: Prototipo frontend dentro de la aplicación existente.

**Performance Goals**: MapLibre se carga sólo donde se usa. No recrear mapa al filtrar ni por cada render; selectores para el pequeño escenario. Sin objetivos inventados de concurrencia/latencia del producto real.

**Constraints**: Las cinco rutas públicas; acceso y apariencia anteriores fuera de `/demo` intactos. No tocar AGENTS.md, Constitution, runtimes, MCP o infraestructura protegida. La única modificación funcional transversal futura es la regla `/demo` en configuración de rutas de aplicación, sin cambiarla ahora.

**Scale/Scope**: Cinco rutas, fixtures con prioridades, filtros vacíos, stock suficiente/insuficiente/agotado y despachos preparado/en tránsito/recibido. Sin padrón numérico supuesto ni cifras históricas presentadas como actuales.

## Constitution Check

| Invariante | Antes de investigación | Después del diseño |
| --- | --- | --- |
| Dependencias y ownership | PASS: arquitectura existente | PASS: `app → modules/demo → shared/ui/lib`; sin imports inversos |
| Sin backend de dominio | PASS: sólo demostración | PASS: estado/selectores locales, sin endpoints, Server Actions o persistencia |
| Albergues y datos identificables | PASS: requeridos | PASS: origen/fecha ficticios, población agregada, necesidades/unidades e IDs coherentes |
| Inventario y trazabilidad | PASS: A confirmada | PASS: reservas nuevas separadas; cargas de ejemplo contabilizadas; recepción no descuenta origen otra vez |
| Prioridad y geografía honestas | PASS: datos DEMO | PASS: etiquetas fijas, zonas ilustrativas, sin divisiones administrativas inventadas |
| Seguridad vial | PASS: ruta ilustrativa | PASS: LineString etiquetada; bloqueado/desconocido no significa transitable; sin Valhalla |
| Documentos | PASS: previsualizaciones | PASS: HTML tabular/documental sin archivo final, firma o descarga ficticia |
| Conectividad | PASS: simulación visual | PASS: banner independiente del fallo real del mapa; sin cola/sincronización |
| Móvil/accesibilidad | PASS: requeridos | PASS: lista equivalente al mapa, teclado, etiquetas y scroll interno |

Los PASS evalúan el diseño, no una implementación ejecutada. Las obligaciones de rutas calculadas, archivos finales y validación autoritativa del producto real no se anuncian como operativas: el encargo sólo permite ilustraciones, previsualizaciones y simulaciones. Sin enmiendas o excepciones a la Constitution.

## Project Structure

### Documentation (this feature)

```text
.context/specs/001-demo-reto21/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/demo-ui.md
└── checklists/requirements.md
```

`tasks.md` pertenece a `$speckit-tasks`; no se crea en esta fase.

### Source Code (repository root)

Estructura propuesta para implementar posteriormente; estos archivos nuevos aún no existen:

```text
src/app/(public)/demo/
├── layout.tsx
├── page.tsx
├── asignaciones/page.tsx
├── despachos/page.tsx
└── documentos/
    ├── manifiesto/page.tsx
    └── acta/page.tsx
src/modules/demo/
├── index.ts
├── data/
│   ├── demo.types.ts
│   ├── demo.fixtures.ts
│   ├── demo.geojson.ts
│   └── demo.selectors.ts
├── state/
│   ├── DemoProvider.tsx
│   └── demo.reducer.ts
├── components/
│   ├── DemoShell.tsx
│   ├── DemoMap.tsx
│   ├── ShelterDetail.tsx
│   ├── AssignmentForm.tsx
│   ├── DispatchDetail.tsx
│   └── DocumentPreview.tsx
├── screens/
│   ├── DemoDashboard.tsx
│   ├── DemoAssignments.tsx
│   ├── DemoDispatches.tsx
│   └── DemoDocument.tsx
└── __tests__/
    ├── demo.fixtures.test.ts
    └── demo.reducer.test.ts
src/lib/config/routes.config.ts       # regla pública limitada a /demo
src/middleware/route-policy.test.ts   # regresión focalizada de acceso
```

**Structure Decision**: El repositorio tiene `modules/auth`, `modules/application` sin archivos encontrados y no tiene `views` ni `modules/app` implementados. No crear shell global, capa `views` vacía, servicios, repositories o adaptadores especulativos. `app` compone mediante exports públicos del módulo; pantallas coordinan y componentes reciben props. Fixtures y tipos internos no se publican a otros módulos.

### Acceso, navegación y estado

- Regla futura `{ path: '/demo', access: 'public', match: 'prefix' }` en `APP_ROUTE_ACCESS_RULES`. La coincidencia existente respeta `/`: `/demo-extra` no se abre. `decideMiddleware` retorna antes de resolver sesión para rutas públicas; no cambiar proxy, matcher ni JWT.
- `DemoProvider` cliente bajo layout `/demo`, conservado por navegación `Link`. Root layout, ThemeProvider, QueryProvider y Toaster siguen iguales; DEMO no usa consultas/interceptores de negocio.
- Contexto opcional `?albergue=<id>` hacia asignaciones y `?despacho=<id>` en despachos/documentos/retorno. Validar contra fixtures; ID ausente usa ejemplo determinista identificado, ID inválido avisa y ofrece selección válida. No URLs de retorno libres.
- Páginas servidor resuelven `searchParams` asíncrono de Next 16 y pasan IDs a pantallas cliente. El layout no lee parámetros de página. Enlaces preservan simulaciones; recarga/desmontaje las descarta, aunque una referencia válida de URL pueda seguir seleccionada.
- Provider con `useReducer`: cantidades reservadas por propuesta, IDs de nuevas recepciones y conexión visual. Filtros/diálogos son locales a pantalla, no otra copia del escenario. Selectores derivan stock/indicadores/documentos; ver [data-model.md](data-model.md).
- Prioridad `alta/media/baja` fija, sin edición/recalculo. Propuestas nominales predefinidas limitadas por stock y demanda, sin ranking. Reserva atómica y sin despacho; sólo recepción de ejemplo en tránsito tiene transición interactiva.

### UI y formularios

Aplicar `project-ui` con APIs verificadas, Geist/tokens/temas y Tailwind existentes. No regenerar componentes ni editar `globals.css` para cambiar el diseño global.

| Uso | API local verificada | Composición |
| --- | --- | --- |
| Indicadores/detalle | `Card.Header`, `.Title`, `.Content`, `.Footer` | Magnitudes etiquetadas; mapa como foco del dashboard |
| Necesidades/stock/manifiesto | `Table.Header`, `.Body`, `.Row`, `.Head`, `.Cell`, `.Caption` | Unidades explícitas y overflow interno |
| Filtros/selección | `Field.Label`, `.Description`, `.Error`; `Select.Trigger`, `.Content`, `.Item` | Territorios del fixture y ejemplos, sin editor de censo |
| Acciones | `Button`: `tone`, `variant`, `pending`, `asChild` | Enlaces reales y confirmación/cancelación distinguibles |
| Confirmaciones | `Dialog.Content`, `.Header`, `.Title`, `.Description`, `.Footer` | Resumen, aceptación DEMO y foco de retorno |
| Avisos/estados | `Badge`, `Alert.Title`, `.Description`, `EmptyState.Title`, `.Description`, `.Actions` | Prioridad textual, restricciones, carga/error y vacíos |

`Badge` no admite tono `warning`; usar API real. `SidebarProvider` escribe cookie de apertura: preferir navegación simple con `Link`/`Button` para evitar persistencia incidental. `BackgroundLayout` es un fondo con imagen, no un shell de dashboard; no forzar su uso.

Formularios mínimos: filtros/selección, confirmar reserva predefinida y confirmar recepción. Reutilizar `Form` compartido/React Hook Form cuando haya campos, siguiendo `LoginForm`; un diálogo sin campos no necesita esquema/hook vacío. Sin cantidades arbitrarias ni altas. Cancelar no altera estado; confirmar revalida referencia y elegibilidad en reducer.

### Mapa y conexión visual

- MapLibre directo sin wrapper nuevo, componente cliente con carga dinámica `ssr: false` desde cliente. CSS de MapLibre importado por la entrada DEMO; sin redefinir tokens. Efecto/ref para instancia y `remove()` al desmontar.
- MapLibre 6.13.0 documenta worker Next/Turbopack con `setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString())`. Integrarlo en módulo cliente durante implementación, sin editar `next.config.ts` ni copiar `?worker&url` de Vite. Dev/build/navegador deben comprobarlo.
- OpenFreeMap Liberty: `https://tiles.openfreemap.org/styles/liberty`, atribución visible. Estilo/teselas/glifos requieren red; no son API de negocio ni permiten prometer disponibilidad offline.
- Tres fuentes derivadas del fixture: `Polygon/MultiPolygon` de zonas DEMO, `Point` de albergues y `LineString` de rutas ilustrativas. ID enlaza selección/detalle; no duplicar datos de inventario en GeoJSON.
- Preparar posiciones aproximadas etiquetadas, con referencias cartográficas verificadas de Piura; no inventar provincias/distritos/fronteras oficiales. Añadir fuentes/capas al cargar estilo y actualizarlas con `setData` al filtrar, sin recrear mapa.
- Ruta siempre «ilustrativa DEMO, no verificada»; conservar bloqueos/desconocidos del ejemplo. Sin Valhalla, geocodificación, distancias, ETA o optimización.
- Altura explícita y reflow del contenedor; comprobar `trackResize`/`resize()`. Lista React equivalente por teclado, sin depender de clicks en canvas.
- Diferenciar carga, error parcial de teselas y fallo completo de estilo/worker/WebGL. Aviso/reintento y lista/detalles textuales disponibles. No construir segundo motor de mapas ni caché de teselas.
- «Simular sin conexión» cambia sólo banner y conexión visual. No corta red/bloquea acciones/crea cola. Volver online no anuncia sincronización; fallo real cartográfico tiene aviso separado.

### Documentos y materialización futura

`DocumentPreview` recibe la proyección del despacho. Manifiesto: tabla HTML de aspecto Excel. Acta: documento HTML de aspecto PDF con recepción pendiente/simulada. Sin exportador, archivo binario, descarga, impresión, firma o datos documentales duplicados.

Los componentes visuales no importan fixtures ni stores globales. Reemplazar datos luego será otra tarea; no crear contratos backend preventivos.

Secuencia para la posterior generación de tasks:

1. Fixtures/tipos/selectores y reducer; integridad, stock y transiciones.
2. Acceso acotado, layout/provider y navegación; regresión de login/privadas/prefijos parecidos.
3. Dashboard, filtros/detalle y MapLibre/GeoJSON; carga/fallos/móvil.
4. Asignaciones, despachos/recepción y documentos, conservando independencia de ejemplos.
5. Banner offline visual y recorrido completo de coherencia, teclado, temas y reinicio.

Gate futuro en [quickstart.md](quickstart.md): tests focalizados, TypeScript, Biome, build y recorrido manual; distinguir fallos previos. Esta secuencia no autoriza implementar ahora. No hay violaciones que justifiquen Complexity Tracking.
