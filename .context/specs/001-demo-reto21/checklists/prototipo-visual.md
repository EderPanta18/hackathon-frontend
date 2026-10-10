# Calidad de requisitos Checklist: Prototipo visual DEMO del Reto 21

**Purpose**: Evaluar completitud, claridad y consistencia de requisitos antes de generar tasks, sin comprobar una implementación ni ampliar el producto.
**Created**: 2026-10-10
**Feature**: [spec.md](../spec.md)
**Context**: [plan.md](../plan.md), [data-model.md](../data-model.md), [contrato UI](../contracts/demo-ui.md), [quickstart.md](../quickstart.md).
**Focus**: Cinco rutas públicas, coherencia entre vistas, asignación/despacho/recepción, estado DEMO, responsive, accesibilidad y exclusión de integraciones reales.
**Depth / Audience / Timing**: Estándar; autor y revisor de requisitos; previo a tasks e implementación.

**Note**: Checklist generado mediante `$speckit-checklist`; la evaluación documental solicitada se registra en Notes.
**Review Ownership**: Las casillas pertenecen al revisor. Los ítems nuevos se dejan sin marcar conforme al ciclo de vida de esta skill.
**Marker Semantics**: `[x]` significa aprobación de calidad de requisitos por el revisor, nunca implementación terminada. Las conclusiones de Notes no sustituyen esa aprobación.

## Completitud de requisitos

- [ ] CHK001 ¿Están enumeradas las cinco rutas exactas, su carácter público y la ausencia de sesión o pasos previos obligatorios? [Completitud, Spec §FR-001, §FR-020, §SC-001]
- [ ] CHK002 ¿Están definidos los destinos de navegación, la sección activa, el retorno al mismo despacho y el contexto de entradas directas a documentos? [Completitud, Spec §FR-002, §FR-016, §FR-020; Contrato UI §Rutas]
- [ ] CHK003 ¿Se especifican mapa, prioridades, filtros territoriales, indicadores y contenido del detalle de albergue con origen/fecha simulados? [Completitud, Spec §FR-004 a §FR-007]
- [ ] CHK004 ¿Los requisitos de asignaciones enumeran necesidades, existencias, reservas, disponible, propuesta atendible y faltante con unidades explícitas? [Completitud, Spec §FR-008 a §FR-010]
- [ ] CHK005 ¿Los requisitos de despacho y documentos enumeran origen, destino, carga, vehículo, recorrido ilustrativo y recepción pendiente/simulada? [Completitud, Spec §FR-012 a §FR-019]
- [ ] CHK006 ¿La identificación DEMO cubre todas las pantallas, acciones y documentos, además del reinicio y la ausencia de validez oficial? [Completitud, Spec §FR-003, §FR-019, §FR-024; Contrato UI §Mensajes, accesibilidad y móvil]

## Claridad de términos y límites

- [ ] CHK007 ¿Se distinguen sin ambigüedad demanda total, pendiente de recibir, comprometido, por cubrir y faltante tras propuesta? [Claridad, Spec §FR-008, §FR-009; Data model §Cantidades derivadas]
- [ ] CHK008 ¿Está explícito que las prioridades son etiquetas fijas del escenario y que no se editan ni recalculan por filtros, reservas o recepciones? [Claridad, Spec §Assumptions; Plan §Acceso, navegación y estado]
- [ ] CHK009 ¿Se define qué conserva la navegación interna, qué reinicia la recarga/salida y qué significa mantener un ID en la dirección sin persistir operaciones? [Claridad, Spec §FR-011; Contrato UI §Estado y formularios]
- [ ] CHK010 ¿Se distinguen los estados mostrados como ejemplos de las únicas transiciones interactivas permitidas, sin sugerir un flujo real de salida de despachos? [Claridad, Spec §FR-014, §FR-015; Data model §Acciones y transiciones]
- [ ] CHK011 ¿Los avisos diferencian datos ficticios, rutas ilustrativas, documento de ejemplo y recepción simulada sin implicar seguridad vial, firma o certificación? [Claridad, Spec §FR-007, §FR-013, §FR-018, §FR-019; Contrato UI §Mensajes, accesibilidad y móvil]

## Consistencia entre vistas y artefactos

- [ ] CHK012 ¿La fuente compartida, los identificadores y las relaciones entre albergues, insumos, almacenes, propuestas, vehículos y despachos están definidos sin copias contradictorias por pantalla? [Consistencia, Spec §FR-011; Data model §Fuente única y relaciones]
- [ ] CHK013 ¿Las definiciones de existencias, reservas iniciales/nuevas y disponible son compatibles con las cargas preparadas/en tránsito/recibidas, sin doble descuento? [Consistencia, Spec §FR-009, §FR-010; Data model §Cantidades derivadas]
- [ ] CHK014 ¿La independencia de despachos respecto de reservas nuevas coincide con la respuesta A, los escenarios, el plan y el modelo? [Consistencia, Spec §Clarifications, §FR-010; Plan §Summary; Data model §Acciones y transiciones]
- [ ] CHK015 ¿Los efectos de recepción concuerdan entre pendiente de recibir, compromisos, estado del despacho y stock de origen? [Consistencia, Spec §FR-015; Data model §Cantidades derivadas, §Acciones y transiciones]
- [ ] CHK016 ¿Manifiesto y acta se definen como proyecciones del mismo despacho y cantidades, diferenciando sólo formato de presentación y estado pertinente? [Consistencia, Spec §FR-017, §FR-018, §SC-006; Plan §Documentos y materialización futura]
- [ ] CHK017 ¿El alcance de filtros/indicadores está delimitado y es consistente con retirar detalles excluidos y no filtrar implícitamente otras pantallas? [Consistencia, Spec §FR-005, §SC-003; Contrato UI §Rutas]

## Cobertura de escenarios y casos límite

- [ ] CHK018 ¿Se define el contenido de entradas sin referencia y la recuperación ante una referencia inexistente, sin dependencia de consultas reales? [Cobertura, Spec §FR-020; Contrato UI §Rutas]
- [ ] CHK019 ¿Los requisitos contemplan conjunto vacío, limpieza de filtros y selección de albergue excluida? [Cobertura, Spec §Edge Cases, §FR-005; Contrato UI §Rutas]
- [ ] CHK020 ¿Están definidos stock agotado, cobertura parcial, reservas repetidas y recepción anticipada/repetida, incluyendo sus restricciones explicables? [Cobertura, Spec §Edge Cases, §FR-009, §FR-010, §FR-015]
- [ ] CHK021 ¿Se define la aceptación completa o rechazo de una reserva cuyo resumen quedó obsoleto, sin aplicar parcialmente cantidades inconsistentes? [Cobertura, Data model §Acciones y transiciones, §Invariantes y pruebas futuras; Contrato UI §Estado y formularios]
- [ ] CHK022 ¿Están especificados cancelación, confirmación y resultado de formularios sin introducir edición de cantidades o altas no solicitadas? [Cobertura, Spec §FR-025; Plan §UI y formularios; Contrato UI §Estado y formularios]
- [ ] CHK023 ¿Los requisitos diferencian carga cartográfica, fallo parcial/completo, recuperación y continuidad textual de la simulación visual offline? [Cobertura, Spec §FR-024, §SC-010; Contrato UI §Mapa y conexión]

## Responsive y accesibilidad

- [ ] CHK024 ¿La adaptación móvil incluye mapa, detalle, formularios, navegación, tablas y documentos, con prioridad del contenido y desplazamiento interno claramente descritos? [Completitud, Spec §FR-023, §SC-007; Plan §UI y formularios, §Mapa y conexión visual; Contrato UI §Mensajes, accesibilidad y móvil]
- [ ] CHK025 ¿El alcance mínimo de tamaños de pantalla exigidos está definido como requisito verificable y diferenciado de tamaños meramente sugeridos para QA? [Medibilidad, Ambiguity, Spec §SC-007; Quickstart §Recorrido manual, punto 8]
- [ ] CHK026 ¿Los requisitos cubren nombres/etiquetas, foco visible, orden de teclado, cancelación, retorno de foco y una alternativa accesible al mapa? [Cobertura, Spec §FR-023, §FR-025; Contrato UI §Mensajes, accesibilidad y móvil]
- [ ] CHK027 ¿Hay un criterio medible de contraste para textos, controles y estados, aplicable a los temas existentes además de no depender sólo del color? [Medibilidad, Gap, Spec §FR-004, §FR-023; Plan §UI y formularios]
- [ ] CHK028 ¿Se especifica cómo serán perceptibles para lectores de pantalla las confirmaciones, restricciones y cambios de estado, además del mensaje visual? [Completitud, Gap, Spec §FR-023, §FR-025; Contrato UI §Mensajes, accesibilidad y móvil]

## Dependencias, exclusiones y criterios de cierre

- [ ] CHK029 ¿La dependencia de red del mapa base está expresamente diferenciada de integraciones de negocio excluidas y de una promesa de funcionamiento offline? [Dependencias, Spec §FR-021, §FR-024, §Assumptions; Plan §Mapa y conexión visual]
- [ ] CHK030 ¿La exclusión de operaciones reales cubre autenticación, servicios de negocio, persistencia, cálculo vial, documentos finales, firmas, cola y sincronización, sin controles que las prometan? [Completitud, Spec §FR-019, §FR-021, §FR-024, §FR-025; Contrato UI §Frontera de scope]
- [ ] CHK031 ¿Se delimitan datos ficticios y referencias geográficas verificables, evitando padrones actuales supuestos, datos personales y alteración de flujos fuera de `/demo`? [Consistencia, Spec §FR-007, §FR-022, §Assumptions; Plan §Constitution Check]
- [ ] CHK032 ¿Los criterios de éxito trazan los recorridos principales y distinguen aprobación documental, comportamiento futuro y capacidades reales excluidas? [Medibilidad, Spec §SC-001 a §SC-010, §Assumptions; Quickstart §Evidencia y cierre]

## Notes

### Evaluación documental solicitada, 2026-10-10

Resultado: **29 criterios cubiertos, 1 parcial y 2 brechas** sobre 32. No se observan contradicciones materiales en rutas, cantidades, decisión A, prioridades, estados o exclusiones. Esto no es un resultado de pruebas de interfaz ni una aprobación de implementación.

| Ítems | Evaluación | Evidencia/conclusión |
| --- | --- | --- |
| CHK001–CHK006 | Cubiertos | FR-001 a FR-020 enumeran pantallas/contenidos; contrato añade referencias y mensajes |
| CHK007–CHK011 | Cubiertos | Modelo define cantidades y transiciones; supuestos fijan prioridades y vida temporal; avisos distinguen simulación |
| CHK012–CHK017 | Cubiertos | Fuente única, stock inicial, compromisos y recepción consistentes; A impide crear/modificar despachos por reservar |
| CHK018–CHK023 | Cubiertos | Entrada independiente, IDs inválidos, vacíos, obsolescencia, duplicados, cancelación y cartografía fallida definidos |
| CHK024, CHK026 | Cubiertos | Contenido móvil/overflow y alternativas de teclado/mapa documentados; no equivale a afirmar accesibilidad ya comprobada |
| CHK025 | Parcial | SC-007 dice «una pantalla móvil»; quickstart propone 360/1280 px «como tamaños de QA». No queda claro si ambos delimitan aceptación o son sólo ejemplos |
| CHK027 | Brecha | FR-004 exige texto/símbolos y FR-023 foco/nombres; ningún artefacto fija umbral u objetivo verificable de contraste |
| CHK028 | Brecha | Contrato exige «mensajes perceptibles sin depender únicamente de toast» pero no aclara su percepción no visual para confirmaciones/restricciones/cambios |
| CHK029–CHK032 | Cubiertos | Red cartográfica como dependencia explícita; sin integraciones operativas, datos personales, cambios externos o pruebas declaradas como pasadas |

Antes de aprobar estos requisitos, precisar CHK025 y completar CHK027/CHK028 en spec/contrato con criterios acordados. Esta revisión no impone valores nuevos ni modifica los requisitos de origen. No hay necesidad de añadir integraciones reales para cerrar esas brechas.

Las casillas nuevas permanecen `[ ]`, incluso donde la asistencia documental encontró cobertura. El revisor decide sus marcas; `$speckit-implement` lee su estado como gate y no debe modificarlo. El checklist general `requirements.md` conserva su ciclo separado y no sustituye este examen específico. No se generó `tasks.md` ni un plan paralelo.
