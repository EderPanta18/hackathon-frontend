# Feature Specification: 01_COMUNA · Solicitudes y recepción de ayuda

**Feature Branch**: `eder` (rama existente conservada)

**Created**: 2026-10-10

**Status**: Draft validado para planificación; implementación pendiente

**Input**: Implementar solo las seis páginas del Jefe de Comuna y la infraestructura demo mínima para que los cuatro roles consuman datos persistidos. Reutilizar acceso y shell existentes. Registrar necesidades, consultar saldos, conciliar recepciones una sola vez tras llegada y obtener documentos finales reales, con aislamiento por comuna y datos ficticios identificados.

**Feature directory**: `.context/specs/002-comuna-ayuda`. La feature registrada anteriormente, `001-demo-reto21`, es un prototipo visual distinto. Evidencia de auditoría y restricciones técnicas expresas: [audit.md](audit.md).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Presentar una necesidad de mi comuna (Priority: P1)

Como Jefe de Comuna quiero registrar y revisar una necesidad cuantificada para dejar una solicitud confirmada y consultable sin depender de mantener abierta la pantalla.

**Why this priority**: La solicitud origina la atención y debe conservar cantidades e identidad correctas.

**Independent Test**: Con identidad COM vinculada y catálogo demo, registrar solicitudes de uno y cinco insumos y consultarlas tras reiniciar. No requiere matching ni pantallas de otros roles.

**Acceptance Scenarios**:

1. **Given** un jefe vinculado y una emergencia demo activa, **When** abre `/comuna/solicitudes/nueva`, **Then** se identifica su comuna automáticamente y puede introducir población afectada, situación, justificación de urgencia y de uno a cinco productos distintos, con unidad fija y cantidad positiva.
2. **Given** un formulario válido, **When** pasa a revisión, **Then** ve todos los datos en la misma URL y puede corregirlos; revisar no presenta una solicitud.
3. **Given** una revisión confirmada por el jefe, **When** el servicio acepta la operación, **Then** queda una solicitud `PRESENTADA` con identificador, fecha, responsable, comuna, emergencia y líneas persistidas, accesible en su bandeja y detalle.
4. **Given** cero/seis líneas, duplicados, producto inexistente, unidad alterada, cantidad no positiva, población no positiva/no entera o situación/urgencia vacías, **When** confirma, **Then** se rechaza con errores concretos y sin registro parcial.
5. **Given** una solicitud presentada, **When** la consulta o intenta editar/cancelar mediante petición directa, **Then** es de solo lectura y el servicio rechaza cambios/cancelación.
6. **Given** una respuesta perdida tras guardar, **When** consulta el resultado y reintenta el mismo intento, **Then** recupera la misma solicitud sin duplicarla; contenido incompatible no sobrescribe el resultado.

---

### User Story 2 - Consultar mi atención sin confundir etapas (Priority: P1)

Como Jefe de Comuna quiero consultar el dashboard privado, mis solicitudes y sus cantidades para distinguir demanda sin asignar, compromisos y ayuda recibida conforme.

**Why this priority**: Evita presentar ayuda en tránsito como recibida o revelar datos de otras entidades.

**Independent Test**: Consultar datos demo persistidos de cantidades conocidas y una segunda comuna para probar aislamiento.

**Acceptance Scenarios**:

1. **Given** sesión COM, **When** abre `/comuna/dashboard` y `/comuna/solicitudes`, **Then** solo ve su comuna, sus solicitudes y recepciones, con enlaces propios; no inventarios ONG ni registros ajenos.
2. **Given** 100 unidades solicitadas, 70 aprobadas de las que 20 ya se recibieron conformes y 50 siguen comprometidas, **When** abre el detalle, **Then** ve `solicitado=100`, `aprobado_no_recibido=50`, `recibido_conforme=20`, `sin_asignar=30` y `aun_no_satisfecho=80`.
3. **Given** una propuesta no aprobada o un despacho en tránsito/llegado sin recepción, **When** consulta saldos, **Then** la propuesta no disminuye demanda y la llegada no aumenta conformes; cada compromiso se cuenta una vez.
4. **Given** datos cargándose, lista vacía o fallo del servicio, **When** consulta, **Then** ve carga, vacío o error recuperable, sin cifras de reemplazo ni éxito inventado.
5. **Given** productos/unidades distintos, **When** consulta resumen y detalle, **Then** conserva su desglose sin sumar magnitudes incompatibles.

---

### User Story 3 - Conciliar y finalizar una recepción propia (Priority: P1)

Como Jefe de Comuna quiero comparar enviado y recibido y registrar diferencias para finalizar la entrega sin certificar faltantes o bienes inutilizables como conformes.

**Why this priority**: La recepción acredita la ayuda efectivamente recibida.

**Independent Test**: Usar despachos demo persistidos, uno esperado y otro llegado marcado `SIMULADO`; probar recepción total, diferencias, concurrencia y repetición sin implementar Brigada.

**Acceptance Scenarios**:

1. **Given** despachos propios, **When** abre `/comuna/recepciones`, **Then** distingue esperados, llegados pendientes y finalizados, con detalle en `/comuna/recepciones/[despachoId]`.
2. **Given** despacho sin llegada, **When** abre el detalle o confirma directamente, **Then** puede leer enviado, pero la escritura se bloquea en pantalla y servidor.
3. **Given** llegada registrada y ninguna recepción previa, **When** revisa y confirma todas las líneas con valores no negativos y `conforme + danado + equivocado + faltante = enviado`, **Then** se registra una recepción única con fecha, responsable y conciliación completa.
4. **Given** 70 enviados, **When** confirma 65 conformes, 2 dañados, 1 equivocado y 2 faltantes con observación, **Then** finaliza con observaciones, solo 65 aumentan conformes y las otras 5 unidades quedan identificadas como diferencias.
5. **Given** todas las líneas conformes por el total enviado, **When** confirma, **Then** finaliza conforme sin exigir una observación inventada.
6. **Given** suma incorrecta, valor negativo, unidad incompatible, línea añadida/omitida o diferencia sin observación, **When** confirma, **Then** se rechaza todo sin modificar saldos ni estado, mostrando errores por campo.
7. **Given** confirmaciones simultáneas o un reintento, **When** se procesan, **Then** queda una recepción y un efecto en saldos; el mismo intento recupera resultado y contenido incompatible recibe conflicto sin sobrescritura.
8. **Given** recepción finalizada, **When** reingresa, **Then** ve solo lectura; las diferencias no reactivan matching, generan asignaciones ni crean solicitudes. Puede iniciar una nueva solicitud independiente por el flujo normal.

---

### User Story 4 - Obtener documentos de envío y recepción (Priority: P2)

Como Jefe de Comuna quiero obtener manifiesto XLSX y acta PDF de una recepción propia finalizada para inspeccionar enviado, recibido y diferencias.

**Why this priority**: Son constancias inspeccionables del resultado persistido y parte obligatoria de la feature.

**Independent Test**: Con recepción finalizada precargada, descargar ambos archivos y abrirlos con lectores independientes, comparando cada línea con los hechos guardados.

**Acceptance Scenarios**:

1. **Given** recepción propia finalizada, **When** obtiene el manifiesto, **Then** recibe XLSX válido con productos, unidades y cantidades ENVIADAS, sin sustituirlas por aprobado o conforme.
2. **Given** recepción con diferencias, **When** obtiene el acta, **Then** recibe PDF válido con enviado, recibido físico desglosado en conforme/dañado/equivocado, faltante y observaciones; identifica despacho, comuna, fecha y responsable.
3. **Given** escenario ficticio, **When** inspecciona documentos, **Then** reconoce la condición demo y despacho `SIMULADO`, sin certificación de una entrega real ni datos sensibles innecesarios.
4. **Given** recepción pendiente, otra comuna o sesión ausente, **When** intenta descarga directa, **Then** se deniega sin contenido protegido. Un fallo de generación permite reintentar sin revertir ni repetir la recepción.

---

### User Story 5 - Conservar identidad y datos entre roles y reinicios (Priority: P1)

Como participante de la demo quiero conservar el acceso existente y consumir la misma fuente persistida desde los cuatro roles según sus permisos, sin respuestas de servidor fingidas en la UI.

**Why this priority**: Las historias anteriores requieren identidad válida dentro de la demo y una fuente común autoritativa.

**Independent Test**: Usar las cuatro identidades demo para probar permisos del servicio, escritura COM y lectura autorizada después de reiniciar servicio y frontend; no requiere crear páginas de otros roles.

**Acceptance Scenarios**:

1. **Given** el acceso demo existente, **When** ingresa o visita un prefijo, **Then** conserva login y sesión; cada prefijo redirige al dashboard del rol y un acceso cruzado al dashboard propio, con menú del rol efectivo.
2. **Given** operación protegida sin sesión válida, **When** la solicita al servicio, **Then** obtiene 401; con sesión sin rol/titularidad obtiene 403 sin datos ni cambios. Las páginas sin sesión conservan su flujo de acceso.
3. **Given** COM sin vínculo válido o relación 1:1 inconsistente, **When** intenta operar, **Then** se deniega sin permitir elegir otra comuna desde el cliente.
4. **Given** solicitud y recepción aceptadas y despacho fixture persistido, **When** reinicia procesos y vuelve a entrar, **Then** conserva identificadores, cantidades, estados, observaciones y trazabilidad; reinicializar demo no duplica fixtures ni borra operaciones.
5. **Given** identidades ONG/BRI/DC, **When** consultan datos disponibles autorizados, **Then** consumen la misma fuente: ONG solo sus referencias operativas, BRI solo sus despachos y DC solo lectura autorizada. No pueden confirmar recepción COM ni acceder a inventarios ajenos. Capacidades ausentes se informan no disponibles.

### Edge Cases

- Límites inclusivos de uno y cinco productos; producto repetido sigue siendo duplicado aunque se altere la unidad.
- Población en personas enteras positivas; cantidades según divisibilidad del catálogo, sin conversiones inventadas.
- Manipular comuna, fecha, responsable, estado o vínculos del recurso no cambia los hechos autorizados por el servicio.
- Identificador inexistente: recurso no encontrado; existente ajeno: 403 sin contenido privado. No filtrar datos mediante errores.
- Sesión caducada durante revisión: recuperar acceso antes de escribir; no anunciar éxito.
- Respuesta perdida tras guardar: resultado incierto, consultar/reintentar idempotentemente; no asumir fallo ni crear otra operación.
- Entrega completamente faltante: puede finalizar con observaciones y conforme cero si hay llegada y conciliación válida.
- Categorías excluyentes por unidad enviada; equivocado no aumenta conforme de otro producto ni crea líneas de despacho.
- Finalizar con diferencias no deja esas unidades como entrega futura del despacho ya cerrado; conserva diferencia histórica.
- Finalizar un despacho no cancela otros ni solicitudes; una nueva solicitud tiene identidad y saldos propios.
- Descargar repetidamente no cambia cantidades, fechas ni estado de recepción. Fallo de documento no deshace el cierre.

### Estados observables y transiciones

| Objeto | Condición / transición válida |
| --- | --- |
| Formulario | Edición → revisión → confirmación aceptada. Antes de aceptar es borrador de captura, sin obligación de guardado. |
| Solicitud PRESENTADA | Confirmada, sin atención registrada. |
| Solicitud EN_ATENCION | Existe aporte aprobado o despacho relacionado, sin recepción conforme todavía. Una propuesta sola no acredita aprobación. |
| Solicitud PARCIAL | Existe cantidad recibida conforme, pero al menos una línea no alcanza lo solicitado. |
| Solicitud ATENDIDA | Todas las líneas alcanzan lo solicitado mediante recepciones conformes confirmadas. |
| Despacho esperado | Estado previo a LLEGADA_REGISTRADA; COM solo consulta. No se implementan sus transiciones logísticas en esta feature. |
| Recepción pendiente | Despacho llegado sin recepción final; habilita conciliación para su comuna. |
| Recepción finalizada | Pendiente → finalizada conforme o con observaciones tras aceptación del servicio. No vuelve a pendiente ni admite una segunda confirmación. |

El estado de solicitud se deriva de hechos persistidos, no es un selector editable. Un cierre con diferencias mantiene el resumen acorde con conformes y conserva diferencias; no salta a ATENDIDA ni cambia solicitudes independientes. La llegada precargada del fixture se identifica SIMULADO y no representa una transición ejecutada por COM.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La UI nueva DEBE limitarse a `/comuna/dashboard`, `/comuna/solicitudes`, `/comuna/solicitudes/nueva`, `/comuna/solicitudes/[solicitudId]`, `/comuna/recepciones`, `/comuna/recepciones/[despachoId]`. Revisión, conciliación y descargas son secciones/acciones de esas páginas, sin páginas adicionales.
- **FR-002**: El sistema DEBE reutilizar login, sesión demo, shell, sidebar y controles web existentes. Solo admite ajustes mínimos de integración por incompatibilidad verificada; no reconstruir autenticación ni crear otra sesión. Conservar acceso de los cuatro roles, redirects por prefijo y al dashboard propio ante acceso cruzado.
- **FR-003**: El servidor DEBE obtener identidad de acceso verificado y exigir COM con relación jefe-comuna 1:1 válida para operar. Ningún selector/dato del cliente concede pertenencia.
- **FR-004**: Cada lectura, escritura y descarga DEBE validar rol, entidad, recurso y estado. Sin sesión válida: 401; sin permiso: 403; sin cambios ni datos ajenos. Redirects web no sustituyen autorización del servicio.
- **FR-005**: El dashboard DEBE resumir solo comuna propia, solicitudes y recepciones, enlazando bandejas y alta. No sumar productos/unidades incompatibles como un total de ayuda.
- **FR-006**: La bandeja DEBE abrir cada solicitud propia con identificador, fecha y estado textual; ofrecer carga, vacío y error recuperable.
- **FR-007**: La solicitud DEBE tener de uno a cinco insumos únicos de catálogo persistido, unidad fija y cantidad positiva según divisibilidad; población entera positiva en personas, situación y justificación de urgencia obligatorias.
- **FR-008**: Comuna y emergencia demo activa DEBEN identificarse automáticamente; revisar todos los datos antes de confirmar, en la misma URL. Corregir/abandonar formulario no cancela solicitudes presentadas.
- **FR-009**: Confirmar DEBE validar y persistir la solicitud completa con identificador, responsable, fecha y estado `PRESENTADA`, o rechazar sin registro parcial. Solo anunciar éxito tras aceptación del servicio.
- **FR-010**: Solicitud presentada DEBE ser inmutable para COM: sin edición/cancelación en UI ni peticiones directas. Se permiten otras solicitudes independientes.
- **FR-011**: El detalle DEBE mostrar situación, urgencia, población, fecha, estado, productos/unidades, cinco saldos y despachos propios relacionados. Urgencia declarada no es prioridad calculada; sin regla definida indicar prioridad no disponible y matching pendiente, sin inventar cálculos.
- **FR-012**: Saldos DEBEN provenir de hechos persistidos por línea/unidad: `solicitado=S`, `recibido_conforme=R`, `aprobado_no_recibido=P` (compromisos todavía pendientes), `sin_asignar=max(0,S-R-P)`, `aun_no_satisfecho=max(0,S-R)`. Propuestas no afectan S/R/P; no duplicar aprobación por aparecer también en un despacho.
- **FR-013**: Finalizar recepción DEBE retirar sus unidades conciliadas del compromiso pendiente de ese despacho: solo conforme aumenta R; dañado/equivocado/faltante quedan como diferencias históricas. Aunque aparezcan en saldos informativos, esas diferencias no habilitan matching por el cierre. Conservar separado su origen de las cantidades nunca cubiertas.
- **FR-014**: Recepciones DEBEN distinguir esperadas, llegadas pendientes y finalizadas, solo de su comuna y con identificación demo.
- **FR-015**: El detalle DEBE mostrar ENVIADO persistido; confirmar únicamente con `LLEGADA_REGISTRADA`, destino propio y ninguna recepción previa.
- **FR-016**: Cada línea DEBE conciliar valores no negativos en unidad del envío: `conforme + danado + equivocado + faltante = enviado`. Rechazar líneas añadidas/omitidas, unidades alteradas y conformes superiores al envío.
- **FR-017**: Toda línea con diferencia positiva DEBE tener observación explicativa; sin diferencias es opcional. Dañado/equivocado son recibidos físicos no conformes; faltante no es recibido físico.
- **FR-018**: Confirmar DEBE registrar indivisiblemente recepción, cantidades, diferencias, fecha, responsable, estado final y saldos. Sin diferencias: finalizada conforme; con alguna diferencia: finalizada con observaciones. Ambos resultados terminales de solo lectura.
- **FR-019**: Crear solicitud y confirmar recepción DEBEN ser idempotentes y seguras ante concurrencia: mismo intento/contenido recupera resultado; contenido incompatible se rechaza como conflicto, sin sobrescribir ni duplicar registros, eventos o efectos. Evitar dobles acciones visibles durante procesamiento.
- **FR-020**: Discrepancias NO DEBEN reactivar matching, generar asignaciones/peticiones, cancelar otros despachos ni corregirse silenciosamente; nueva necesidad exige decisión y confirmación independientes.
- **FR-021**: Solo recepción propia finalizada DEBE habilitar manifiesto XLSX real y acta PDF real de hechos persistidos, con permisos del recurso. Vistas previas/archivos renombrados no satisfacen exportación.
- **FR-022**: Manifiesto DEBE identificar despacho, origen operativo, destino, productos, unidades y enviado. Acta DEBE identificar despacho/recepción, fecha, responsable, enviado, conforme, dañado, equivocado, faltante y observaciones; distinguir recibido físico de conforme. Ambos declaran demo/ficticio y origen simulado cuando corresponda, minimizando datos privados.
- **FR-023**: Fallo de generación/descarga DEBE permitir reintento sin alterar recepción. Archivos inspeccionables en lectores independientes con cantidades/fechas del hecho finalizado.
- **FR-024**: La demo DEBE conservar solicitudes, referencias operativas mínimas, despachos, recepciones, saldos y eventos tras reinicio de frontend y servicio; navegador no es fuente exclusiva. Reinicializar no borra operaciones ni duplica fixtures.
- **FR-025**: DEBE existir despacho fixture con llegada registrada y referencias coherentes a solicitud, aporte ONG, origen, comuna y brigada, persistido y marcado `SIMULADO`. No atribuir llegada a una acción real de Brigada ni ofrecer a COM autorización, retiro o llegada.
- **FR-026**: Infraestructura común DEBE admitir las cuatro identidades y consumo persistido según rol/entidad sin páginas nuevas de otros roles. DC solo lectura sin inventarios; no activar consultas aún no definidas/no disponibles por inferencia.
- **FR-027**: Cada escritura aceptada DEBE registrar trazabilidad de identidad/rol, entidad, objeto, acción, fecha y cantidades pertinentes, sin eventos duplicados por reintento ni edición ordinaria del historial.
- **FR-028**: Las seis páginas DEBEN ser utilizables desde 360 px sin desplazamiento horizontal obligatorio en controles/tablas críticas, con teclado, foco visible, etiquetas/unidades, errores por campo, estados textuales y revisión/confirmación antes de acciones irreversibles.
- **FR-029**: Ante fallo/rechazo/resultado incierto DEBE haber feedback verificable sin éxito anticipado. Distinguir real en la demo, simulado, pendiente y no disponible.
- **FR-030**: Esta feature NO DEBE implementar matching, fórmula de prioridad, inventario/decisiones ONG, operaciones Brigada, mapas/rutas, personal/vehículos, supervisión territorial, informes finales DC, adjuntos, notificaciones externas ni sincronización offline. Referencias del fixture no acreditan esos procesos.

### Key Entities *(include if feature involves data)*

- **Identidad y vínculo**: usuario demo verificado, rol y entidad propia COM/ONG/BRI bajo 1:1; DC sin entidad operativa y en lectura restringida.
- **Comuna**: destinataria con único jefe; datos ficticios identificados.
- **Emergencia demo**: contexto activo preconfigurado; sin pantallas de alta/cierre.
- **Producto de catálogo**: identificador, nombre, unidad fija y divisibilidad; no representa existencias ONG.
- **Solicitud y línea**: identificador, comuna, emergencia, población, situación, urgencia, fecha, responsable, estado y de una a cinco líneas con saldos por producto/unidad.
- **Referencia de aporte aprobado**: compromiso mínimo persistido de ONG y solicitud con cantidades; distinto de propuesta, autorización, envío y recepción. No implica implementar gestión ONG.
- **Despacho y línea enviada**: solicitud/aporte, ONG/origen operativo, brigada, comuna, cantidades/unidades enviadas y estado; fixture/llegada simulados explícitos.
- **Recepción y conciliación**: única por despacho, comuna, fecha, responsable, estado terminal y desglose conforme/dañado/equivocado/faltante/observación.
- **Evento de trazabilidad**: hecho, objeto, identidad, fecha, acción y cantidades; distingue precarga de acción de usuario.
- **Documentos**: manifiesto de envío y acta de recepción vinculados al mismo despacho y resultado final persistido.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Las seis rutas permiten recorrer dashboard, bandejas, alta, detalle y recepción sin enlaces privados ajenos; acceso existente disponible para cuatro roles.
- **SC-002**: Solicitudes de uno/cinco productos se conservan completas; cero/seis, duplicados, unidad alterada y campos inválidos se rechazan sin registros parciales en todos los casos de aceptación.
- **SC-003**: El ejemplo 100 solicitados, 70 aprobados y 20 conformes muestra 100/50/20/30/80; propuesta/llegada sin recepción nunca incrementa conformes.
- **SC-004**: Recepciones antes de llegada, ajenas, incompatibles o no conciliadas no modifican datos; doble clic, respuesta perdida y concurrencia dejan exactamente una recepción y un efecto sobre saldos.
- **SC-005**: 70 enviados, 65 conformes, 2 dañados, 1 equivocado y 2 faltantes finalizan con observaciones conservando las 5 diferencias, sin matching/asignación/solicitud automática.
- **SC-006**: Tras reiniciar ambos procesos y abrir sesión nueva, todas las operaciones aceptadas del recorrido conservan identificadores, cantidades, estados, observaciones y eventos; fixture sin duplicación.
- **SC-007**: XLSX y PDF propios finalizados abren en lectores independientes y coinciden línea por línea con hechos persistidos. Antes del cierre o desde otra comuna no entregan contenido protegido.
- **SC-008**: Todas las lecturas/escrituras/descargas del recorrido sin sesión o con rol/entidad incorrectos se rechazan sin filtración/cambios; cuatro identidades conservan límites en fuente común.
- **SC-009**: Crear/revisar solicitud y conciliar/consultar recepción se completan a 360 px y con teclado sin controles perdidos por desbordamiento, campos sin etiqueta ni estados solo por color.
- **SC-010**: Pantallas/documentos con datos ficticios o hechos precargados declaran demo/simulado; fallos y capacidades pendientes nunca se presentan como operación real exitosa.

## Assumptions

- La petición explícita prevalece sobre referencias contradictorias: autoriza XLSX enviado y PDF recibido/diferencias tras recepción propia finalizada, límite uno/cinco, sin edición/cancelación y sin reactivación por discrepancia. No modifica Constitution ni activa funciones de otros roles.
- Urgencia es justificación textual obligatoria según RF-04, sin escala/prioridad inventada. Población son personas, no padrón ni familias convertidas.
- Catálogo, emergencia e identidades/vínculos se precargan como demo identificada; no inferir localidades, existencias o condiciones reales de Piura.
- Borrador es formulario en revisión; no se exige persistencia de borradores/offline. Persistencia obligatoria desde confirmación aceptada.
- Estados de bandeja: esperada sin llegada, llegada pendiente y finalizada conforme/con observaciones. Servidor valida transiciones; el detalle de cantidades prevalece sobre resumen de solicitud. Solicitud totalmente atendida solo si cada línea recibió todo conforme; llegada o cierre con diferencias no la convierten en atendida.
- Saldos conservan RF-33; una diferencia histórica en `sin_asignar`/`aun_no_satisfecho` no es elegibilidad de matching. Se conserva su origen y no se ejecuta matching en esta fase.
- Consumo ONG/BRI/DC se limita a referencias mínimas autorizadas para fuente común. No decide entre informes finales/supervisión territorial DC ni habilita operaciones nuevas; capacidades ausentes se declaran no disponibles.
- Criterios anteriores son aceptación futura, no evidencia de implementación ni de pruebas operativas.
- Planificación definirá contratos y organización del servicio demo dentro de restricciones expresas en [audit.md](audit.md), sin inventar contratos de API real.
