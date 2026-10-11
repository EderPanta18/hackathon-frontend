# Alivía — Consulta y descarga de documentos desde el frontend

**Alcance:** experiencias de visualización y descarga de archivos autorizados. El frontend no decide qué cifras son oficiales ni sustituye al servicio responsable de construir un documento válido.

## Documentos visibles en la aplicación

| Espacio | Documento accesible | Presentación prevista |
|---|---|---|
| Comuna | Manifiesto de despacho `.xlsx` de una recepción propia finalizada. | Enlace o botón de descarga en el detalle de recepción. |
| Comuna | Acta de recepción `.pdf` de una recepción propia finalizada. | Descarga desde el mismo detalle. |
| Defensa Civil | PDF de consulta de comunidad, recepción, recorrido o informe final autorizado. | Acción de descarga vinculada al registro o reporte visible. |
| Defensa Civil | Libro `.xlsx` de recorridos, sujeto a filtros de consulta autorizados. | Descarga desde la sección de informes y rutas. |

ONG y Brigada consultan sus propios datos en pantalla; no se les presentan acciones de exportación destinadas a otros roles.

## Comportamiento del botón de descarga

1. Comprobar que el documento corresponde a una pantalla y estado habilitados.
2. Solicitar el archivo con la sesión actual y los parámetros autorizados.
3. Mostrar progreso o estado de espera mientras se obtiene la respuesta.
4. Validar que la respuesta sea satisfactoria y tenga el formato esperado.
5. Iniciar descarga con nombre comprensible y extensión correcta; en caso de error, mostrar un mensaje recuperable.

La interfaz no descarga respuestas JSON de error con extensión `.pdf` ni considera un simple mensaje de éxito como archivo generado.

## Coherencia de presentación

El manifiesto mantiene cantidades y productos **enviados**; el acta refleja cantidades efectivamente **recibidas y conformes**, además de diferencias u observaciones cuando existan. Un reporte de recorrido distingue geometría sugerida, bloqueo simulado y estado registrado; no afirma la ruta real ejecutada por un vehículo.

La interfaz muestra fechas y unidades de forma consistente. Los documentos descargados por el MVP llevan identificación de **Simulación** cuando contienen datos ficticios y no implican firma digital certificada.

## Permisos y disponibilidad

Los controles se ofrecen solo donde corresponden por rol y estado, pero la autorización efectiva de lectura se comprueba en el servicio. Una URL de descarga no puede utilizarse para acceder a recepciones de otra comuna ni a detalles privados de existencias de ONG. Un documento no disponible genera un estado explícito en lugar de un archivo vacío que aparente ser válido.

## Casos que deben verificarse

| Escenario de interfaz | Resultado esperado |
|---|---|
| Archivo correcto | Descarga con tipo, extensión y contenido legible. |
| Sesión caducada | Solicitud rechazada y retorno controlado al acceso. |
| Documento aún no habilitado | Acción no disponible y explicación del estado. |
| Recurso ajeno | Sin entrega del archivo ni exposición de datos. |
| Fallo de red o de generación | Mensaje de error y opción segura de reintento. |

La validación de un PDF o XLSX requiere abrirlo y revisar que su contenido sea coherente; la respuesta HTTP por sí sola no demuestra que el documento sea útil.
