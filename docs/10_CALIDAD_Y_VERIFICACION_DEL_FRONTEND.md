# Alivía — Calidad y validación del frontend

**Objetivo:** asegurar que la navegación, componentes, integración de servicios, mapas y descargas puedan demostrarse con consistencia en el escenario ficticio de Piura.

## Comprobaciones técnicas

| Nivel | Qué comprueba | Comando o procedimiento |
|---|---|---|
| Calidad estática | Errores de lint y convenciones | `pnpm lint` (`biome check`). |
| Tipos | Contratos TypeScript y límites de componentes | `pnpm exec tsc --noEmit` cuando la configuración lo permita. |
| Compilación | Compatibilidad con Next.js de producción | `pnpm build`. |
| Pruebas automatizadas | Componentes, hooks y utilidades existentes | `pnpm exec vitest run` cuando existan suites aplicables. |
| Uso real | Navegación, formularios, sesiones y permisos | Comprobación funcional desde navegador. |
| Responsividad | Sin pérdida de controles en móvil | Inspección de 360 × 800 px y escritorio. |

El script `pnpm format` modifica archivos y **no** se emplea como comprobación pasiva. No se considera aprobada una verificación si no se ejecutó y documentó su resultado.

## Escenarios de interfaz prioritarios

| Categoría | Comprobación observable |
|---|---|
| Inicio de sesión | Cada perfil llega a su dashboard; no aparecen pantallas ajenas. |
| URL directa | Al recargar un detalle se conserva ruta y se comprueba su acceso. |
| Formularios | Campos inválidos muestran errores concretos; doble clic no indica dos éxitos. |
| Datos remotos | Se distinguen carga, vacío, éxito, conflicto y error de conexión. |
| Cantidades | Las tarjetas y tablas no mezclan propuesto, autorizado, retirado y recibido conforme. |
| Mapas | Zoom, desplazamiento, selección, leyendas y capas funcionan; bloqueo simulado no se representa como tránsito real. |
| Recorridos | Se visualiza normal/alternativa según disponibilidad; sin opción válida se informa la ausencia. |
| Descargas | Los XLSX y PDF autorizados se obtienen y se abren correctamente. |
| Defensa Civil | Todas sus vistas permanecen de solo lectura y no revelan inventarios privados. |
| Cambio de sesión | Al salir o iniciar con otra cuenta no persisten vistas privadas del usuario anterior. |

## Calidad de interacción

Se revisan foco visible, uso mediante teclado, etiquetas de formularios, mensajes claros, contraste razonable y estados que no dependen solamente del color. El mapa dispone de alternativas textuales para interpretar una localidad o un tramo cuando no puede operarse visualmente.

Las pantallas críticas se comprueban en móvil y escritorio; el menú no debe bloquear formularios ni el mapa absorber interacciones necesarias fuera de su contenedor.

## Pruebas con datos de demostración

Los datos ficticios se usan para comprobar situaciones contrastantes: solicitudes con varias líneas, falta de existencias, estados de despacho diferentes, recepciones con discrepancias, recorridos bloqueados y zonas sin coordenadas acreditadas. El objetivo es verificar la respuesta de la **interfaz**; los cálculos autoritativos y la integridad transaccional del servicio se validan fuera de este ámbito.

Los tiempos de carga se informan con mediciones y entorno identificados. No se declaran métricas de rendimiento, operación offline, actualización en tiempo real ni seguridad de producción a partir de una demostración local.

## Evidencia para la revisión

La revisión frontend se sustenta en pantallas navegables, capturas de escritorio y móvil, resultados reales de comandos ejecutados, descarga de documentos válidos y demostración de errores controlados. Una ausencia de servicio o de cartografía disponible se comunica de forma visible; no se rellena con información inventada.
