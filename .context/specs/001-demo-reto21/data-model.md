# Data model: escenario frontend DEMO

Modelo local de presentación/pruebas; no tablas, API, migraciones ni reglas autoritativas del producto real.

## Fuente única y relaciones

`demo.fixtures.ts` exportará un objeto inmutable `demoScenario`. `demo.geojson.ts` proyecta sus geometrías; `demo.selectors.ts` deriva cantidades y documentos. Componentes visuales reciben props, sin importar fixtures.

| Entidad | Campos previstos | Relaciones/condiciones |
| --- | --- | --- |
| Escenario | `id`, `label`, `referenceDate`, `sourceLabel`, `territories`, `zones`, `shelters`, `items`, `warehouses`, `inventory`, `needs`, `proposals`, `vehicles`, `dispatches`, `defaultShelterId`, `defaultDispatchId` | DEMO, fecha ficticia y referencias iniciales válidas |
| Territorio | `id`, `label` | Filtro; nombres geográficos reales verificados al preparar fixtures |
| Zona ilustrativa | `id`, `label`, `territoryId`, `geometry` | Polygon/MultiPolygon DEMO; no frontera administrativa |
| Albergue | `id`, `name`, `territoryId`, `priority`, `population`, `vulnerableGroups`, `geometry` | Point aproximado; prioridad fija `alta/media/baja`; población agregada |
| Insumo | `id`, `label`, `unit` | Unidad única por insumo; sin conversiones |
| Almacén | `id`, `name`, `territoryId`, `geometry` | Origen ficticio de existencias/despachos |
| Inventario | `warehouseId`, `itemId`, `onHand` | Clave compuesta única; material en origen, incluido preparado y excluido lo que salió |
| Necesidad | `shelterId`, `itemId`, `required` | Demanda total previa a sus recepciones del escenario; clave compuesta única |
| Propuesta | `id`, `warehouseId`, `shelterId`, `lines: itemId/quantity` | Cantidades nominales predefinidas, sin despacho asociado |
| Vehículo | `id`, `demoRegistration`, `label` | Registro ficticio, sin conductor personal ni validación externa |
| Despacho | `id`, `warehouseId`, `shelterId`, `vehicleId`, `status`, `lines`, `routeGeometry`, `routeAccess` | Estado inicial `preparado/en_transito/recibido`; LineString ilustrativa; bloqueado/desconocido cuando corresponda |

IDs únicos estables. No nombres de personas, firmas ni datos de menores. Grupos vulnerables pueden solaparse: no sumarlos como personas distintas. Coordenadas GeoJSON longitud/latitud, geometrías válidas y polígonos cerrados; ubicaciones ficticias aproximadas identificadas, con referencia de Piura verificada. No distancias, ETA ni grafo.

El conjunto cubre los casos de spec sin atribuir un tamaño a un padrón real. Cargas de ejemplo y propuestas no reclaman dos veces la misma necesidad o stock.

## Estado temporal

| Campo | Contenido | Ciclo de vida |
| --- | --- | --- |
| `reservedProposals` | Cantidades efectivas por ID de propuesta e insumo | Única copia de reservas nuevas; guardar lo mostrado y aceptado |
| `receivedDispatchIds` | IDs inicialmente en tránsito cuya recepción se simuló | No repetir recibidos ni descontar origen otra vez |
| `connectionMode` | `online/offline`, ambos DEMO | Sólo avisos visuales |

Inicialmente sin reservas/recepciones nuevas y online DEMO. Navegación interna conserva estado; recarga/nueva visita/desmontaje lo descarta. Parámetros de selección no reconstruyen operaciones. Filtros y diálogos pertenecen a pantallas.

## Cantidades derivadas

Por almacén/insumo:

- `onHand`: existencias del fixture todavía en origen.
- `reservedBaseline`: carga de despachos preparados, todavía en origen.
- `reservedNew`: reservas efectivas nuevas.
- `available = onHand - reservedBaseline - reservedNew`.
- En tránsito/recibido ya está fuera de `onHand`. Recepción no cambia stock de origen ni disponibilidad.

Por albergue/insumo:

- `received`: cargas inicialmente recibidas y nuevas recepciones válidas.
- `pendingReceipt = required - received`: todavía no recibido, incluidos compromisos.
- `committed`: preparado, todavía en tránsito y reservas nuevas del destino.
- `uncovered = pendingReceipt - committed`: «por cubrir», pendiente sin compromiso.
- Atendible de una propuesta no reservada: mínimo de nominal, disponible del origen y por cubrir del destino.
- Faltante tras propuesta: por cubrir menos atendible, etiquetado para no confundir propuesta con entrega.

No sumar insumos con unidades distintas. Población/albergues del dashboard se derivan del filtro; cobertura usa estado actual. Recibir reduce pendiente y tránsito en igual cantidad: no cambia por sí solo lo que estaba sin compromiso. Las prioridades nunca se recalculan.

## Acciones y transiciones

| Acción | Precondición | Efecto/restricción |
| --- | --- | --- |
| Reservar propuesta | ID válido, no reservada, alguna línea positiva, stock/demanda suficientes para lo mostrado | Registrar líneas efectivas atómicamente; si el resumen quedó obsoleto, rechazar y actualizarlo antes de confirmar. No crear/modificar despachos |
| Confirmar recepción | Despacho inicialmente en tránsito, no recibido en el recorrido | Añadir ID recibido DEMO y derivar acta/destino; preparado no recibe, recibido no repite, carga no cambia |
| Cambiar conexión | Valor online/offline DEMO | Sólo banner; sin efectos de negocio/red/sincronización |
| Cancelar diálogo | Abierto | Cerrar y devolver foco; ninguna cantidad cambia |

No hay acciones preparado → en tránsito, crear despacho, cancelar reserva, editar prioridad o sincronizar. Los estados se exploran con ejemplos; sólo recepción tiene transición interactiva.

Guardar cantidades de reserva porque la propuesta puede atenderse parcialmente; no guardar totales ni copias de despachos. El reducer revalida todo el conjunto antes de aceptar, sin confiar sólo en botones deshabilitados.

## Invariantes y pruebas futuras

- IDs/claves únicos, referencias completas, insumos sin duplicar por carga/propuesta y unidades canónicas.
- Cantidades enteras no negativas en unidades de ejemplo; líneas/cargas positivas.
- Reserva base no excede stock; reserva nueva no excede disponible ni demanda por cubrir, comprobados agregadamente por origen/destino.
- Recibido + comprometido no supera la necesidad total. Corregir fixtures incoherentes, sin esconderlos con un recorte artificial a cero.
- Reserva/recepción repetida no altera cantidades; preparado no recibe; recepción no descuenta stock otra vez.
- Filtrar/offline no cambia cantidades/prioridad; documentos usan el mismo despacho después de recibir.
- GeoJSON conserva IDs, geometrías válidas y etiquetas de simulación.

Integridad exhaustiva de fixtures en un test; no crear un importador de producción. Los límites de acciones también se validan en reducer.
