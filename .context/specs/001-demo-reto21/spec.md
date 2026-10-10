# Feature Specification: Prototipo DEMO del Reto 21 de Piura Innova

**Feature Branch**: `eder` (rama actual; no se crea otra rama en esta especificación)

**Created**: 2026-10-10

**Status**: Draft, validado para planificación

**Input**: User description: "Crear un prototipo visual y navegable del Reto 21 de Piura Innova, exclusivamente para explorar la experiencia de usuario antes de implementar el producto real. Debe contener rutas públicas /demo, /demo/asignaciones, /demo/despachos, /demo/documentos/manifiesto y /demo/documentos/acta. El dashboard mostrará un mapa de Piura con pines por prioridad, filtros territoriales, tarjetas de indicadores y detalles de albergues. La vista de asignaciones mostrará necesidades, stock disponible, propuestas de asignación, faltantes y reservas simuladas. La vista de despachos mostrará origen y destino, ruta ilustrativa, vehículo registrado, estados del despacho, confirmación de recepción y acceso a las vistas previas de Excel y PDF. Los datos serán ficticios, coherentes entre pantallas y marcados como DEMO. La interacción debe ser navegable, pero no depender de API, autenticación, persistencia, motor de rutas, sincronización offline real ni documentos finales. No alterar flujos existentes fuera de /demo. La finalidad es validar visualmente la experiencia, no desarrollar el sistema operativo definitivo."

## Clarifications

### Session 2026-10-10

- Q: ¿Qué debe ocurrir en despachos cuando se confirma una reserva simulada en asignaciones? → A: Opción A. La reserva actualiza disponibilidad y cantidades reservadas; los despachos de ejemplo permanecen independientes, identificados como tales y con inventario coherente.
- Instrucción de planificación: incluir formularios de interacción DEMO y una simulación exclusivamente visual de conectividad offline; mantener fixtures compartidos y estado temporal, sin incorporar operaciones reales.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explorar albergues y prioridades (Priority: P1)

Como participante de una revisión de experiencia, quiero entrar al dashboard DEMO, filtrar el territorio y consultar un albergue para entender cómo se presenta la situación de atención humanitaria en Piura.

**Why this priority**: Es la entrada al recorrido y permite evaluar la lectura de necesidades antes de proponer asignaciones o revisar despachos.

**Independent Test**: Abrir `/demo` sin sesión, aplicar y limpiar un filtro territorial y seleccionar un pin. Verificar indicadores, detalle del albergue, prioridad textual y aviso DEMO.

**Acceptance Scenarios**:

1. **Given** una persona sin sesión, **When** abre `/demo` directamente, **Then** ve el dashboard con mapa de Piura, pines por prioridad, filtros territoriales, tarjetas de indicadores y una identificación visible de datos ficticios DEMO.
2. **Given** el escenario inicial, **When** aplica un filtro territorial, **Then** el mapa y los indicadores del conjunto filtrado concuerdan; al limpiar el filtro vuelve al conjunto inicial.
3. **Given** un pin visible, **When** lo selecciona, **Then** ve el mismo albergue con su nombre ficticio, territorio de referencia, prioridad, población, grupos vulnerables y necesidades por insumo, con origen y fecha del escenario simulado.
4. **Given** cualquier pantalla del prototipo, **When** usa su navegación, **Then** puede llegar al dashboard, asignaciones y despachos, reconocer la sección activa y seguir dentro del ámbito `/demo`.

---

### User Story 2 - Explorar una asignación simulada (Priority: P2)

Como participante de la revisión, quiero contrastar necesidades con stock y probar una reserva simulada para entender qué se podría atender y qué faltaría.

**Why this priority**: Permite evaluar la decisión de asignación y la separación entre propuesta, reserva y entrega sin operar inventario real.

**Independent Test**: Abrir `/demo/asignaciones` directamente, revisar una propuesta del escenario y simular su reserva. Comprobar cantidades, disponibilidad y faltantes sin necesitar haber visitado el dashboard.

**Acceptance Scenarios**:

1. **Given** el escenario DEMO inicial, **When** abre `/demo/asignaciones`, **Then** ve necesidades por albergue e insumo, existencias, reservas, stock disponible, propuestas y faltantes con unidades explícitas.
2. **Given** una propuesta atendible, **When** activa la acción de reservar, **Then** recibe una confirmación identificada como simulada, aumenta la reserva correspondiente y disminuye el disponible en la misma cantidad, sin marcar una entrega recibida ni crear o modificar despachos de ejemplo.
3. **Given** un insumo con disponibilidad insuficiente o nula, **When** revisa la propuesta, **Then** ve la parte atendible y el faltante sin cantidades negativas ni reservas superiores al disponible.
4. **Given** una propuesta ya reservada durante el recorrido, **When** intenta repetir la reserva, **Then** no se duplica y se muestra su condición actual.
5. **Given** una reserva simulada, **When** navega a otra pantalla DEMO y vuelve, **Then** conserva cantidades y referencias coherentes durante ese recorrido; al recargar se restablece el escenario inicial y se informa este comportamiento.

---

### User Story 3 - Recorrer despacho y recepción simulados (Priority: P2)

Como participante de la revisión, quiero consultar un despacho y simular su recepción para evaluar la trazabilidad visual desde el origen hasta el albergue.

**Why this priority**: Completa el recorrido de ayuda y evita confundir material reservado, despachado y recibido.

**Independent Test**: Abrir `/demo/despachos` directamente con los despachos de ejemplo, seleccionar uno, revisar su vehículo y recorrido ilustrativo, y simular la recepción de un despacho elegible.

**Acceptance Scenarios**:

1. **Given** los despachos ficticios iniciales, **When** abre `/demo/despachos` y selecciona uno, **Then** ve su identificador, origen, destino, insumos y cantidades, vehículo registrado en el escenario, estado y ruta ilustrativa.
2. **Given** la ruta visible, **When** consulta su significado, **Then** reconoce que es una ilustración sin validación vial, de seguridad ni de transitabilidad; un tramo bloqueado o desconocido del escenario no se presenta como seguro.
3. **Given** un despacho de ejemplo en tránsito, **When** confirma su recepción simulada, **Then** el estado pasa a recibido DEMO y las cantidades recibidas concuerdan con el despacho y sus vistas documentales.
4. **Given** un despacho recibido o todavía preparado, **When** revisa la acción de recepción, **Then** no puede duplicar la recepción ni recibir material que no salió; ve el motivo de la restricción.
5. **Given** un despacho seleccionado, **When** abre el manifiesto o el acta, **Then** llega a la vista previa correspondiente y puede volver a ese despacho sin perder la referencia.

---

### User Story 4 - Revisar documentos de ejemplo (Priority: P3)

Como participante de la revisión, quiero ver el manifiesto y el acta de un despacho para evaluar su legibilidad y relación con la operación simulada.

**Why this priority**: Permite validar el último paso del recorrido sin generar documentos finales ni atribuir validez oficial a la demostración.

**Independent Test**: Abrir cada dirección documental directamente y desde un despacho, comparar sus referencias y cantidades, y regresar a despachos.

**Acceptance Scenarios**:

1. **Given** un despacho seleccionado, **When** abre `/demo/documentos/manifiesto`, **Then** ve una vista previa tabular del manifiesto Excel con referencia de despacho, origen, destino, vehículo, insumos, unidades y cantidades, marcada DEMO y sin validez operativa.
2. **Given** un despacho seleccionado, **When** abre `/demo/documentos/acta`, **Then** ve una vista previa del acta PDF con los mismos datos de entrega y su estado de recepción; antes de recibir se indica pendiente y después se indica recepción simulada, sin firma oficial.
3. **Given** una entrada directa a cualquiera de las dos vistas sin selección previa, **When** carga la pantalla, **Then** aparece un despacho de ejemplo identificado expresamente, con acceso de retorno a despachos.
4. **Given** cualquier vista documental, **When** revisa sus acciones, **Then** puede volver al despacho y distingue la vista previa de un archivo final; no se ofrece una descarga final ni una firma o certificación real.

### Edge Cases

- Filtro sin resultados: mostrar un estado vacío, indicadores del conjunto vacío y una acción para limpiar filtros; no conservar pines o detalles de otro conjunto como si pertenecieran al filtrado.
- Albergue seleccionado que deja de cumplir el filtro: retirar su detalle o informar que quedó fuera de la selección.
- Stock agotado, propuesta parcial o reserva repetida: mostrar faltantes y estado actual sin exceder cantidades ni duplicar movimientos.
- Cambio entre pantallas después de una simulación: mantener coherencia entre indicadores relacionados, cantidades, estados y documentos del mismo recorrido.
- Conectividad offline simulada: cambiar únicamente avisos visuales DEMO, sin cortar la red, bloquear las simulaciones locales ni crear una cola de sincronización. Un fallo real del mapa se comunica por separado.
- Recarga o nueva visita: restablecer el escenario inicial, sin afirmar que los cambios se guardaron o sincronizaron.
- Entrada directa a asignaciones, despachos o documentos: mostrar contenido DEMO utilizable sin pasos previos, sesión o selección obligatoria.
- Intento de recepción anticipada o repetida: impedir la transición incoherente y explicar el estado.
- Ubicaciones aproximadas, acceso desconocido o bloqueo del escenario: etiquetar el supuesto; no inventar una ruta real ni garantías de accesibilidad.
- Pantalla pequeña o navegación por teclado: conservar acceso a filtros, detalle, acciones y retorno; las tablas o documentos pueden desplazarse dentro de su área sin ocultar la navegación principal.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El prototipo DEBE ofrecer las cinco rutas públicas `/demo`, `/demo/asignaciones`, `/demo/despachos`, `/demo/documentos/manifiesto` y `/demo/documentos/acta`, accesibles directamente sin autenticación ni redirección al inicio de sesión. Cubre historias 1 a 4.
- **FR-002**: La navegación DEBE conectar dashboard, asignaciones, despachos y ambas vistas documentales, indicar la sección actual y permitir volver del documento al despacho referido. Cubre historias 1 y 3 a 4.
- **FR-003**: Todas las pantallas y vistas documentales DEBEN mostrar DEMO de forma visible, identificar los datos como ficticios y las acciones como simuladas; deben informar que los cambios se reinician al recargar. Cubre historias 1 a 4.
- **FR-004**: El dashboard DEBE presentar un mapa reconocible de Piura, pines con prioridad, filtros territoriales y tarjetas de indicadores. Las prioridades DEBEN tener texto o símbolos además de color. Cubre historia 1, escenarios 1 a 3.
- **FR-005**: Los filtros DEBEN actualizar los pines e indicadores del conjunto seleccionado, permitir limpiar la selección y mostrar un estado vacío cuando no hay coincidencias. El detalle seleccionado DEBE corresponder a un albergue visible o advertir que quedó fuera del filtro. Cubre historia 1, escenario 2 y casos límite.
- **FR-006**: El detalle de un albergue DEBE mostrar identidad ficticia, territorio de referencia, prioridad del escenario, población, grupos vulnerables, necesidades por insumo y origen/fecha de la información simulada. Cubre historia 1, escenario 3.
- **FR-007**: Las posiciones, prioridades y accesibilidad simuladas DEBEN identificarse como referencias del escenario. No se DEBEN presentar cifras históricas, nombres ficticios o coordenadas aproximadas como un padrón actual verificado de Piura. Cubre historia 1 y casos límite geográficos.
- **FR-008**: Asignaciones DEBE mostrar necesidades, existencias, reservas, stock disponible para nuevas reservas, propuestas y faltantes, con unidades consistentes por insumo. Cubre historia 2, escenarios 1 a 3.
- **FR-009**: La propuesta DEBE diferenciar cantidad atendible y faltante; no puede exceder la necesidad pendiente ni la disponibilidad del escenario. Las existencias, reservas y cantidades ya despachadas DEBEN distinguirse sin descontar dos veces el mismo material. Cubre historia 2, escenarios 1 a 3.
- **FR-010**: La acción de reserva DEBE modificar sólo disponibilidad y cantidades reservadas del escenario DEMO, reflejarse en sus cantidades relacionadas, mostrar confirmación simulada y evitar duplicados. Los despachos de ejemplo DEBEN permanecer independientes e identificados como tales, con sus cargas ya contempladas en el inventario inicial. Una reserva no DEBE crear o modificar un despacho ni contarse como material despachado o recibido. Cubre historia 2, escenarios 2 a 5.
- **FR-011**: Las referencias, unidades, cantidades y estados del escenario DEBEN ser coherentes entre mapa, indicadores, albergues, asignaciones, despachos y documentos. Las acciones simuladas DEBEN conservar esa coherencia al navegar; una recarga DEBE restablecer un escenario inicial coherente. Cubre historias 2 a 4.
- **FR-012**: Despachos DEBE mostrar origen, destino, insumos y cantidades, ruta ilustrativa, vehículo registrado ficticio y estado del despacho seleccionado. Cubre historia 3, escenario 1.
- **FR-013**: Toda ruta DEBE identificarse como ilustrativa y no verificada. Un bloqueo o falta de información del escenario DEBE ser visible; no se DEBE ofrecer una ruta segura, optimizada o calculada ni afirmar transitabilidad real. Cubre historia 3, escenario 2.
- **FR-014**: El recorrido DEBE distinguir propuesta, reserva/asignación, despacho preparado, despacho en tránsito y recibido, indicando cuándo se trata de un estado simulado. Cubre historias 2 y 3.
- **FR-015**: La confirmación de recepción DEBE permitir pasar un despacho de ejemplo en tránsito a recibido DEMO, reflejarlo en los datos relacionados y evitar recepción anticipada o repetida. No DEBE producir una confirmación operativa o firma real. Cubre historia 3, escenarios 3 a 4.
- **FR-016**: Cada despacho DEBE ofrecer acceso a la vista previa de su manifiesto Excel y de su acta PDF con la referencia del despacho conservada. Cubre historia 3, escenario 5.
- **FR-017**: La vista de manifiesto DEBE presentar una tabla legible de origen, destino, vehículo, insumos, unidades y cantidades del despacho referido. Cubre historia 4, escenario 1.
- **FR-018**: La vista de acta DEBE presentar los datos de entrega del mismo despacho y distinguir recepción pendiente de recepción simulada. No DEBE mostrar una firma oficial ni dar por recibida una entrega pendiente. Cubre historia 4, escenario 2.
- **FR-019**: Las vistas documentales DEBEN identificarse como previsualizaciones DEMO sin validez oficial y ofrecer retorno a despachos. No se DEBEN ofrecer archivos finales Excel/PDF ni simular una descarga exitosa inexistente. Cubre historia 4, escenarios 3 a 4.
- **FR-020**: Cada ruta DEBE disponer de contenido ficticio inicial suficiente para su exploración independiente. Una vista documental abierta directamente DEBE identificar el despacho de ejemplo usado. Cubre las pruebas independientes y la historia 4, escenario 3.
- **FR-021**: La navegación y las simulaciones NO DEBEN depender de API de negocio, autenticación, persistencia entre visitas, motor de rutas ni sincronización offline real. No DEBEN anunciar datos en vivo, operaciones guardadas o sincronización real. Cubre historias 1 a 4 y casos límite de recarga.
- **FR-022**: La incorporación del prototipo NO DEBE cambiar el comportamiento, apariencia, acceso ni datos de flujos existentes fuera de `/demo`. La apertura pública se limita a ese ámbito. Cubre la comprobación de regresión de acceso y navegación existente.
- **FR-023**: Los controles DEBEN ser utilizables en móvil y con teclado, tener nombres y foco reconocibles y dar un resultado visible; las acciones no disponibles DEBEN explicar su restricción. No DEBE haber controles decorativos que aparenten una función operativa inexistente. Cubre todos los recorridos y casos límite de uso móvil/teclado.
- **FR-024**: El prototipo DEBE ofrecer una simulación visual activable de conectividad online/offline, siempre identificada como DEMO. Cambiarla sólo DEBE alterar los avisos visuales: no corta la red, no bloquea acciones locales, no guarda operaciones pendientes ni sincroniza al volver a online. Un fallo real de cartografía DEBE tener su propio aviso y conservar el acceso a la información textual del escenario. Cubre el caso límite de conectividad simulada.
- **FR-025**: Los formularios DEBEN limitarse a filtros/selección y confirmación de reserva o recepción de ejemplos existentes, con etiquetas, cancelación y resultado visible. No DEBEN introducir altas o edición de censos, almacenes, insumos, vehículos o despachos. Cubre historias 1 a 3 y FR-023.

### Key Entities *(include if feature involves data)*

- **Escenario DEMO**: Conjunto ficticio compartido, con identificación, fecha de referencia y aviso de simulación. Define la situación inicial y las modificaciones temporales del recorrido.
- **Albergue DEMO**: Identificador y nombre ficticios, territorio de referencia, ubicación ilustrativa, prioridad del escenario, población y grupos vulnerables; se relaciona con necesidades y despachos de destino.
- **Necesidad DEMO**: Albergue, insumo, unidad y cantidad requerida; permite distinguir cobertura propuesta, reservada y recibida sin confundirlas.
- **Inventario DEMO**: Origen/almacén ficticio e insumo con unidad, existencias, reservas y disponible; diferencia material todavía en origen de material ya despachado.
- **Propuesta y reserva DEMO**: Referencia al albergue, origen, insumos, cantidad atendible, faltantes y estado de simulación; reserva una cantidad sin confirmar entrega.
- **Despacho DEMO**: Identificador, origen, albergue de destino, carga, vehículo ficticio, recorrido ilustrativo y estado preparado/en tránsito/recibido.
- **Vehículo DEMO**: Registro ficticio identificable asociado al despacho, sin exigir alta, búsqueda ni validación de vehículos reales.
- **Recepción DEMO**: Confirmación simulada del despacho y sus cantidades; representa un cambio de estado de la demostración sin identidad personal real ni firma oficial.
- **Vista documental DEMO**: Manifiesto de aspecto tabular Excel o acta de aspecto documental PDF, vinculados a un despacho y su estado actual, sin archivo final ni validez operativa.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Las cinco direcciones solicitadas pueden abrirse directamente sin sesión; cada una muestra contenido inicial, identificación DEMO y navegación de retorno o continuación.
- **SC-002**: Se completa el recorrido dashboard → detalle de albergue → asignaciones → despachos → manifiesto/acta → despacho, sin enlaces rotos ni salida involuntaria de `/demo`.
- **SC-003**: En cada filtro probado, el número de pines e indicadores asociados coincide con el conjunto seleccionado; limpiar el filtro restaura el conjunto inicial y el caso sin coincidencias presenta un estado vacío coherente.
- **SC-004**: En todos los insumos del escenario y después de cada reserva probada, no hay cantidades negativas, sobreasignación ni reservas duplicadas; las cantidades vinculadas concuerdan entre pantallas.
- **SC-005**: Al simular una recepción elegible cambia una sola vez a recibido y se refleja en el acta del mismo despacho. El preparado no se recibe y el ya recibido no duplica la recepción.
- **SC-006**: Las dos vistas documentales coinciden con el despacho referido en origen, destino, vehículo, insumos, unidades y cantidades; el acta también coincide en el estado de recepción. Ambas muestran DEMO y ausencia de validez oficial.
- **SC-007**: Los recorridos principales pueden completarse en una pantalla móvil y con teclado, sin controles inaccesibles, texto crítico oculto ni desbordamiento de la página; cualquier desplazamiento de tablas queda dentro de su área.
- **SC-008**: Durante el recorrido no se crean operaciones reales, archivos finales ni cambios duraderos; después de recargar reaparece el escenario inicial. La persona que revisa puede reconocer en cada pantalla qué datos, rutas y acciones son simulados.
- **SC-009**: Las comprobaciones de regresión mantienen el acceso y comportamiento previo de las rutas existentes fuera de `/demo`, incluida la entrada al inicio de sesión y la protección de rutas privadas.
- **SC-010**: Alternar online/offline DEMO conserva las cantidades y estados, permite seguir el recorrido local y no muestra operaciones guardadas o sincronizadas. Si falla la cartografía real, la persona puede seguir consultando albergues y despachos mediante su información textual.

## Assumptions

- La audiencia inicial son personas que evalúan la experiencia de coordinación de ayuda del Reto 21. No se introducen roles, permisos ni cuentas DEMO.
- Los nombres de albergues, almacenes, vehículos y las cantidades serán ficticios. No se incorporan personas reales, padrones actuales ni datos personales de menores.
- El mapa puede ser una representación esquemática reconocible de Piura. Los territorios de referencia deben verificarse si se nombran lugares reales; no se inventan divisiones territoriales ni se afirma exactitud de los pines simulados.
- Las prioridades se entregan como parte explícita del escenario ficticio. No se define un algoritmo de priorización, optimización, asignación automática o cálculo vial.
- Se asume continuidad temporal dentro de la navegación DEMO y reinicio al recargar o abrir una nueva visita. No se exige compartir cambios entre pestañas, usuarios o dispositivos.
- Las propuestas y despachos de ejemplo ya existen al abrir sus pantallas. La reserva y la recepción tienen una interacción simulada; crear despachos, registrar vehículos, editar censos y generar propuestas arbitrarias no son parte de este alcance.
- Las prioridades son etiquetas fijas del escenario, iguales en mapa, detalles y asignaciones; no se editan ni recalculan al filtrar, reservar o recibir. Los despachos de ejemplo consumen o reservan su parte del inventario desde el escenario inicial, independientemente de nuevas reservas.
- El manifiesto se revisa como tabla de aspecto Excel y el acta como documento de aspecto PDF dentro del prototipo. No se exige generar, descargar, imprimir, firmar ni certificar archivos finales.
- El prototipo requiere sólo sus recursos de presentación para explorarse; no hay dependencia de servicios de negocio ni se promete un modo sin conexión. El mapa base puede requerir red; la simulación visual offline no implica almacenamiento o sincronización real. El tratamiento visual específico y la preparación de los datos ficticios se resolverán en planificación.
- La revisión documental confirma la calidad de esta especificación. La validación visual, móvil, de navegación y con participantes queda pendiente hasta implementar el prototipo.
