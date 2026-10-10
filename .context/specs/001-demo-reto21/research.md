# Research: decisiones técnicas DEMO

Fecha: 2026-10-10. Código local y documentación oficial consultados; sin instalar/configurar herramientas. Se usa documentación directa como fallback de `find-docs`: `npx ctx7@latest` descargaría tooling fuera del alcance.

## R-01. Arquitectura, acceso y navegación

**Decision**: Un módulo `modules/demo`, páginas delgadas y provider local en layout, regla pública `/demo` e IDs opcionales en URL. Rama real `eder`; los scripts Spec Kit reportan `001-demo-reto21` como identificador de feature, sin cambiar Git.

**Rationale**: Root layout ya aporta fuentes/temas/QueryProvider/Toaster. No existe shell global implementado reutilizable. `resolveRouteAccess` respeta el límite `/` y middleware omite sesión para rutas públicas. Layout conserva estado; `searchParams` se resuelve en páginas y es asíncrono. [Next layouts](https://nextjs.org/docs/app/api-reference/file-conventions/layout), [page/searchParams](https://nextjs.org/docs/app/api-reference/file-conventions/page).

**Alternatives considered**: Abrir toda la aplicación, alterar matcher/JWT, usar template que remonta o persistir sesión DEMO contradice aislamiento/continuidad. Repowise no tiene índice y no hay graphify-out; se verificaron imports/código sin crear índices.

## R-02. Datos y estado

**Decision**: Un objeto `demoScenario`, selectores y `useReducer`/Context bajo DEMO. Cantidades reservadas por propuesta, IDs recibidos y conexión visual; no totales duplicados.

**Rationale**: Escenario pequeño, sin concurrencia ni servidor. Reducer puro permite probar invariantes. A mantiene despachos independientes y contabilizados desde el inicio. [React useReducer](https://react.dev/reference/react/useReducer).

**Alternatives considered**: Zustand/Valtio instalados, pero store global/persistencia añade ciclo de vida innecesario. Query/axios simularían una capa remota inexistente.

## R-03. UI adaptada

**Decision**: Card/Table/Field/Select/Dialog/Alert/EmptyState y Button/Badge locales; Form compartido sólo para campos. Tokens y fuentes actuales, Tailwind 4.

**Rationale**: Índices/tipos difieren de shadcn estándar. Badge no incluye `warning`; SidebarProvider escribe cookie y BackgroundLayout es un fondo con imagen, por lo que no se fuerzan para este shell. [Tailwind responsive design](https://tailwindcss.com/docs/responsive-design).

**Alternatives considered**: Nuevas bibliotecas, `shadcn add`, paleta global o formularios CRUD ampliarían scope.

## R-04. MapLibre y worker

**Decision**: MapLibre 6.13.0 instalado, sin wrapper, client-only y carga dinámica desde cliente; cleanup con `remove()`. Worker URL de módulo documentada para Next/Turbopack, sin configuración nueva.

**Rationale**: No hay integración previa encontrada. Documentación actual especifica worker `.mjs`; `ssr:false` se usa desde componente cliente. [MapLibre instalación/Turbopack](https://maplibre.org/maplibre-gl-js/docs/), [Map API](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/), [Next lazy loading](https://nextjs.org/docs/app/guides/lazy-loading).

**Alternatives considered**: Wrapper nuevo, CDN, worker copiado o editar bundler: más superficie. Receta `?worker&url` de OpenFreeMap es de Vite, no de Next. Dev/build/WebGL pendientes de implementación.

## R-05. OpenFreeMap y GeoJSON

**Decision**: Estilo Liberty oficial con atribución; fuentes GeoJSON locales de zonas/pines/rutas enlazadas por ID, actualizadas con `setData`.

**Rationale**: Servicio público sin clave; GeoJSON dibuja figuras/líneas sin calcular recorridos. Overlays ficticios no son fronteras oficiales ni rutas transitables. [OpenFreeMap quick start](https://openfreemap.org/quick_start/), [servicio/atribución](https://openfreemap.org/), [GeoJSONSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/), [LineString](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-geojson-line/).

**Alternatives considered**: Valhalla, grafo, geocodificación y rutas remotas fuera del scope. Mapa sólo SVG descartaría la integración pedida; no se necesita segundo renderer.

## R-06. Conectividad y fallos

**Decision**: Banner online/offline DEMO manual, separado de disponibilidad real. `load`/`error`, carga/reintento y fallback textual para fallo completo; un error parcial de teselas no elimina un mapa utilizable. Contenedor con tamaño y reflow comprobado.

**Rationale**: Mapa base requiere red y no hay garantía de disponibilidad de terceros para esta aplicación. [Map events](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapEventType/), [resize](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#resize).

**Alternatives considered**: Service worker, caché offline, cola y sincronización son capacidades reales excluidas. `navigator.onLine` tampoco demuestra disponibilidad de servicios ni reemplaza el modo visual solicitado.

## R-07. Documentos y verificación

**Decision**: Previsualizaciones HTML derivadas del despacho; tests puros de fixture/reducer/acceso y recorrido manual. CLI Vitest instalada, sin inventar scripts ni configurar runtimes.

**Rationale**: Excel/PDF describen presentación, no descargas. Riesgos: cantidades, duplicados, continuidad, acceso, mapa y legibilidad. [Vitest CLI](https://vitest.dev/guide/cli).

**Alternatives considered**: Exportadores, backend mock e infraestructura E2E nueva innecesarios. Build y pruebas visuales se ejecutarán cuando exista implementación.

## Resultado de aclaración y cobertura

Una pregunta respondida (A), integrada en spec; checklist 16/16 → 16/16, sin cambios de marcas, regresiones o pendientes. Alcance, entidades, interacción, dependencias, casos límite, restricciones, terminología y criterios de cierre: claros. Rendimiento/escalabilidad/observabilidad operativa no requieren decisiones de producto real para esta demo. Sin aclaraciones materiales pendientes para generar tasks; valores ficticios y comprobación cartográfica se preparan durante implementación.
