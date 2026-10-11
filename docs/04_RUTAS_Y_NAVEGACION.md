# Alivía — Rutas web y navegación

**Enrutador:** Next.js App Router. **Convención:** cada rol tiene un prefijo y un dashboard propio; no existe un `/dashboard` compartido.

## Rutas públicas y de sistema

| Ruta | Uso |
|---|---|
| `/` | Redirige a `/login` sin sesión o al dashboard del rol autenticado. |
| `/login` | Acceso; una sesión válida conduce al espacio correspondiente. |
| `/acceso-denegado` | Mensaje de restricción de acceso sin exposición de datos privados. |

## Jefe de Comuna

| Ruta | Pantalla |
|---|---|
| `/comuna/dashboard` | Resumen de su comuna. |
| `/comuna/solicitudes` | Solicitudes registradas. |
| `/comuna/solicitudes/nueva` | Alta y revisión de solicitud. |
| `/comuna/solicitudes/[solicitudId]` | Detalle y cantidades por insumo. |
| `/comuna/recepciones` | Entregas esperadas y recepciones. |
| `/comuna/recepciones/[despachoId]` | Comprobación y detalle de una recepción. |

## Jefe de ONG

| Ruta | Pantalla |
|---|---|
| `/ong/dashboard` | Resumen propio. |
| `/ong/propuestas` | Bandeja de propuestas. |
| `/ong/propuestas/[propuestaId]` | Evaluación de propuesta. |
| `/ong/asignaciones` | Compromisos y reservas. |
| `/ong/asignaciones/[asignacionId]` | Detalle y autorización. |
| `/ong/despachos` | Despachos originados en la ONG. |
| `/ong/despachos/[despachoId]` | Detalle de despacho en consulta. |
| `/ong/inventario` | Inventario propio. |
| `/ong/inventario/ingresos/nuevo` | Ingreso de productos. |
| `/ong/inventario/productos/[productoId]` | Detalle y ajuste de inventario. |

## Jefe de Brigada

| Ruta | Pantalla |
|---|---|
| `/brigada/dashboard` | Resumen de despachos y mapa de operaciones. |
| `/brigada/despachos` | Despachos vinculados a la brigada. |
| `/brigada/despachos/[despachoId]` | Detalle, recorrido y avances permitidos. |

## Jefe de Defensa Civil

| Ruta | Pantalla |
|---|---|
| `/defensa-civil/dashboard` | Indicadores de consulta territorial. |
| `/defensa-civil/mapa` | Mapa, capas y selección de localidades. |
| `/defensa-civil/entregas` | Consulta de ayudas efectivamente recibidas. |
| `/defensa-civil/brechas` | Consulta de necesidades y diferencias de atención. |
| `/defensa-civil/informes` | Informes y consultas descargables. |
| `/defensa-civil/informes/[informeId]` | Detalle de un informe final publicado. |

**Inventario:** 28 rutas principales, contando las tres públicas o de sistema. Los segmentos entre corchetes representan identificadores, no rutas literales adicionales.

## Navegación y resolución

Las bases `/comuna`, `/ong`, `/brigada` y `/defensa-civil` redirigen a sus respectivos `/dashboard` cuando la sesión tiene acceso. El prefijo de otro rol nunca permite ver una pantalla ajena; la navegación se reconduce al inicio autorizado según la política del proyecto. Una entidad ajena, un ID inexistente o una página desconocida no revela datos y muestra un estado de no encontrado o denegado, según corresponda.

No se crean rutas para pasos temporales de formularios, modales, confirmaciones ni pestañas. Los filtros que necesitan enlace compartible se representan mediante parámetros de consulta validados, por ejemplo `?zonaId=...` en el mapa.

## Comportamiento App Router

- `layout.tsx` mantiene shell y estructura del espacio autenticado.
- `page.tsx` compone la pantalla sin acumular implementación de negocio.
- `loading.tsx`, `error.tsx` y `not-found.tsx` cubren carga, fallos de renderizado y ausencia de recurso donde sea necesario.
- Los enlaces internos conservan navegación atrás/adelante y URLs directas.
- El menú móvil presenta los mismos destinos que escritorio.
- Una URL que apunta a un recurso privado se comprueba en el servidor del servicio, aunque el usuario conozca su identificador.

No se incluyen URLs para administración de usuarios, conductores, vehículos, edición de solicitudes confirmadas o cierre manual de una emergencia.
