# Composición UI y adaptador tipado

## Frontera de módulos

`src/core/contracts/comuna.contracts.ts` contiene DTOs/puerto ComunaGateway sin dependencias de Next ni almacenamiento. `src/lib/api/comuna-api.ts` implementa ese puerto con apiClient existente y mapea HTTP demo; no se crea factory ni cliente genérico adicional. El módulo comuna usa esa API pública, no importa implementaciones de otros módulos.

Puerto mínimo: getContexto, getCatalogo, getDashboard, listSolicitudes, getSolicitud, createSolicitud(input,key), listRecepciones(bandeja?), getDespacho, confirmRecepcion(id,input,key), getIntento(scope,key), downloadManifiesto(id), downloadActa(id). Resultado de lectura tipado; errores ApiError/Problem Details existentes; descargas Blob. Endpoints exclusivamente del [servicio demo](demo-api.md).

Si se integra API real posteriormente, sustituir el mapeo del adaptador con el contrato real confirmado; no atribuir a esa API rutas propuestas aquí. UI no conoce URL privada ni secretos. La validación cliente sirve para feedback, no decide saldos, permisos, llegada o cierre.

## Rutas y composición

| Página COM | Composición mínima |
| --- | --- |
| dashboard | Identificación de comuna/demo, resumen y acceso a bandejas/alta |
| solicitudes | Lista propia y acceso a nueva/detalle |
| solicitudes/nueva | Formulario → revisión misma URL → confirmación → detalle propio |
| solicitudes/[solicitudId] | Datos inmutables, cinco saldos por línea, diferencias históricas y despachos propios |
| recepciones | Bandejas esperadas/llegadas/finalizadas con textos de estado |
| recepciones/[despachoId] | Enviado, llegada, conciliación/revisión o resultado final, informe interno y descargas |

page.tsx bajo `(platform)/(workspace)` compone módulo y reutiliza sesión/shell; no implementa negocio ni genera archivos. Sesión existente aporta subject al scope de consultas; la API es autorización definitiva. No añadir proveedor o guard paralelo.

React Query ya montado en AppProviders: resourceKeys con `{subject}` verificado para toda consulta COM; nunca key global que reutilice datos de otra identidad. Mutaciones retry:false existente; bloquear controles mientras procesan, reintento explícito conserva intento. Invalidar dashboard/listas/detalles propios solo tras respuesta aceptada. Nunca actualizar conformes optimistamente.

Form preexistente de `src/shared/components/forms/Form.tsx`, React Hook Form/Zod, Field.Label/Content/Error, Input/Textarea/Select. Comprobar props locales antes de implementar. Unit/entidad de lectura; listas de catálogo sin duplicados; errores del servidor mapeados por campo. Revisión de datos antes de crear o recibir, botones pendientes y foco al primer error, anuncio aria-live y recuperación clara.

Card y dl apilados para saldos/conciliación a 360 px. Table local impone whitespace-nowrap y overflow, por lo que no será única representación móvil crítica. Reutilizar Button pending, Alert, Skeleton, EmptyState/ErrorState y estados textuales; conservar tokens/temas actuales sin tocar primitivas, globals.css o components.json.

## Navegación mínima y limitación existente

Reutilizar AppShell/AppSidebar y extender APP_NAV_ITEMS solo para dashboard/solicitudes/recepciones COM. Ajustar homeByRole a destinos dashboard reales por convención y la política existente para raíz de prefijo y acceso cruzado; no crear rutas duplicadas ni páginas funcionales de ONG/BRI/DC. La política necesita pathname normalizado para distinguir el prefijo exacto del resto de rutas; pasar ese dato desde middleware-flow, en la misma barrera existente.

El workspace ya verifica sesión y monta shell. No corregir `layoui.tsx` solo por nombre si no afecta el recorrido: las páginas COM irán bajo workspace/layout.tsx existente. Si evidencia de ejecución exige renombrarlo, revisar primero que no duplique barreras ni altere otras rutas y acotar el cambio.

Auditoría actual no encontró dashboards/páginas de los otros roles ni page de acceso-denegado. Esta feature valida login/sesión, destino del redirect y permisos del servicio para los cuatro roles; no acredita navegación completa de páginas que aún no existen. Mantener esa limitación explícita, sin crear placeholders de UI para aparentar finalización.
