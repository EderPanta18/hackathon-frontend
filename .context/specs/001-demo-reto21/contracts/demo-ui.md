# Contrato de interfaz DEMO

Navegación y comportamiento observable; no endpoints ni contrato de backend. Referencias validadas contra el escenario ficticio.

## Rutas

| Ruta pública | Referencia opcional | Contenido/retorno |
| --- | --- | --- |
| `/demo` | Ninguna obligatoria | Mapa/lista, filtros, indicadores, detalle; enlaces a asignaciones/despachos |
| `/demo/asignaciones` | `albergue` | Necesidades, stock, propuestas y reserva sin generar despacho |
| `/demo/despachos` | `despacho` | Ejemplos independientes, carga/vehículo/ruta/estado, recepción y documentos |
| `/demo/documentos/manifiesto` | `despacho` | Tabla HTML de aspecto Excel; retorno al mismo despacho |
| `/demo/documentos/acta` | `despacho` | HTML de aspecto PDF con recepción pendiente/simulada; mismo retorno |

Sin ID: ejemplo determinista identificado. ID inválido: aviso «Referencia DEMO no encontrada» y selección válida, sin consulta remota. Documentos/retorno incluyen `?despacho=<id>`, no URLs libres. Todas las pantallas funcionan mediante entrada directa.

Pin/lista muestran el mismo detalle. Filtro actualiza pines/lista/indicadores; si excluye selección se retira detalle. Limpiar restaura conjunto. No hay un filtro global implícito que oculte stock/despachos en otras pantallas.

## Estado y formularios

- Provider sólo bajo layout DEMO. `Link` conserva operaciones; recarga o desmontaje reinicia. URL sólo selecciona ejemplos. Aviso de reinicio antes de simular.
- Prioridades fijas. Reservas sólo cambian cantidades relacionadas; despachos de ejemplo identificados e independientes con carga ya contabilizada.
- Formularios: filtros/selección y confirmaciones. Sin editor de cantidades, recursos o censos. Cancelar no altera estado; confirmar revalida y da feedback visible.
- Reserva parcial muestra atendible/faltante; repetición u obsolescencia no duplica ni produce negativos.
- Sólo recepción de tránsito cambia a recibido DEMO una vez. Preparado/recibido muestran por qué no pueden recibirse; no hay acción de salida a tránsito.
- Manifiesto/acta derivan del mismo despacho, sin copias documentales; acta distingue pendiente/recibido simulado.

## Mapa y conexión

| Estado | Comportamiento |
| --- | --- |
| Cargando | Indicador/tamaño estable; lista textual disponible |
| Error parcial de teselas | Aviso y conservar mapa utilizable/detalle |
| Fallo completo de estilo/worker/WebGL | «Mapa base no disponible», reintento y contenido textual |
| Ruta ilustrativa | Etiqueta permanente; bloqueo/desconocido no implica seguridad |
| Offline DEMO | Aviso manual, acciones locales siguen; sin cortar red ni guardar cola |
| Vuelta a online DEMO | Sólo aviso, sin sincronización o cambio de cantidades |

Fallo real de cartografía se comunica por separado; nunca se usa como prueba de capacidad offline.

## Mensajes, accesibilidad y móvil

Textos obligatorios o equivalentes claros: «DEMO · Datos ficticios», «Los cambios se reinician al recargar», «Reserva simulada», «Recepción simulada», «Despachos de ejemplo independientes», «Ruta ilustrativa, no verificada», «Vista previa DEMO · Sin validez oficial». Offline aclara que sólo es visual.

Labels, foco y recorrido Tab/Enter/Escape; retorno de foco al cerrar diálogos. Prioridad/estado con texto, no sólo color. Mensajes perceptibles sin depender únicamente de toast. Lista de albergues y origen/destino permiten consultar sin operar canvas. Móvil reordena paneles; tablas/documentos desplazan dentro de su área sin overflow de página. Tokens/temas existentes, sin preferencias persistentes propias.

## Frontera de scope

Sólo `/demo` y descendientes reciben acceso público. `/demo-extra`, `/demostracion`, privadas y `/login` conservan política anterior. No cambiar raíz, BFF, autenticación, estilos globales o proveedores.

Sin CRUD, alta de vehículos, nuevos despachos, propuestas arbitrarias, motor vial, API/base de datos, exportación binaria, impresión, firma, service worker, caché offline o sincronización. No enlaces de descarga ficticios ni sellos oficiales.
