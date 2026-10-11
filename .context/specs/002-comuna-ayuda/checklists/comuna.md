# Calidad de requisitos: 01_COMUNA

**Purpose**: Revisar que los requisitos COM sean completos, claros, consistentes y verificables en sus rutas, sesión, solicitudes, recepciones, datos simulados, exportaciones y límites de integración.
**Created**: 2026-10-11
**Feature**: [spec.md](../spec.md)

**Note**: Checklist personalizada generada por `$speckit-checklist` a partir de la solicitud y los artefactos de la feature.
**Review Ownership**: Artefacto de calidad de requisitos propiedad de quien revisa. Marcar `[x]` únicamente cuando esa persona determine que el criterio está satisfecho.
**Marker Semantics**: `[x]` indica que se revisó y aprobó la calidad del requisito; no indica que la implementación esté terminada.

## Completitud de requisitos

- [ ] CHK001 ¿La especificación distingue las seis rutas nuevas de Comuna de `/`, `/login`, `/acceso-denegado`, redirects, shell, sidebar y cookie existentes, y limita su integración a reutilización o ajustes mínimos? [Completeness, Spec §FR-001–FR-002]
- [ ] CHK002 ¿El alcance conserva de forma inequívoca el login demo, su sesión y cookie HttpOnly, e identifica qué recorrido existente puede usar Comuna sin introducir otro login? [Completeness, Spec §FR-002, US5]
- [ ] CHK003 ¿Se resuelve la tensión entre redirigir cada prefijo de rol a su dashboard y no crear páginas de otros roles, dada la auditoría que no encontró esos dashboards ni una página para `/acceso-denegado`? [Conflict, Spec §US5, FR-002, FR-030; audit.md §Acceso y shell]
- [ ] CHK004 ¿Los límites de alta expresan juntos productos únicos, catálogo y unidad fija, cantidad válida, población, situación, urgencia y emergencia activa, incluidos los valores frontera? [Completeness, Spec §US1, FR-007–FR-009, SC-002]
- [ ] CHK005 ¿La matriz de acceso deja claro quién puede consultar cada contexto/recurso y operar cada solicitud, despacho, recepción y documento, incluyendo la relación 1:1 y recursos ajenos? [Completeness, Spec §US5, FR-003–FR-004, FR-026, SC-008]
- [ ] CHK006 ¿Las condiciones que distinguen una solicitud presentada, en atención, parcial y atendida están definidas sin confundir propuesta, aprobación, despacho, llegada y recepción conforme? [Completeness, Spec §Estados observables y transiciones, FR-011–FR-013]
- [ ] CHK007 ¿La inmutabilidad tras presentar una solicitud y la opción de crear una solicitud independiente describen claramente qué acciones quedan permitidas o excluidas? [Completeness, Spec §US1, US3, FR-010, FR-020]

## Claridad y consistencia

- [ ] CHK008 ¿La conciliación especifica para cada línea y unidad la igualdad completa con lo enviado, las categorías no negativas, el rechazo de líneas omitidas/adicionales y la observación requerida ante diferencias? [Clarity, Spec §US3, FR-016–FR-018]
- [ ] CHK009 ¿Se distingue sin ambigüedad lo recibido físicamente, lo recibido conforme, lo dañado/equivocado y lo faltante, tanto en estados como en saldos e informes? [Consistency, Spec §US3–US4, FR-012–FR-018, FR-022]
- [ ] CHK010 ¿La especificación explica que cerrar con diferencias no reactiva matching ni asignaciones, conserva el origen de las diferencias y requiere una nueva solicitud confirmada para otra necesidad? [Clarity, Spec §US3, Edge Cases, FR-013, FR-020]
- [ ] CHK011 ¿Queda claro qué hechos del despacho fixture son persistidos y coherentes y cuáles están simulados, de modo que una llegada precargada no se atribuya a una operación real de Brigada? [Clarity, Spec §US3, US5, FR-025–FR-026]
- [ ] CHK012 ¿Los estados y términos de las bandejas esperada, llegada pendiente y finalizada conservan el mismo significado en listado, detalle, resumen y descarga? [Consistency, Spec §US3, FR-014–FR-018, Assumptions]

## Cobertura de escenarios y fallos

- [ ] CHK013 ¿Están cubiertos por requisitos los intentos antes de llegada, las recepciones ajenas, los duplicados, las respuestas inciertas, la concurrencia y el reintento idempotente, con resultados distinguibles? [Coverage, Spec §US3, Edge Cases, FR-004, FR-019, SC-004]
- [ ] CHK014 ¿Los requisitos separan sesión inválida, falta de titularidad, recurso inexistente y estado incompatible, y dicen qué datos o cambios se prohíben en cada caso? [Completeness, Spec §US5, Edge Cases, FR-004, SC-008]
- [ ] CHK015 ¿La semilla idempotente y la conservación tras reiniciar procesos especifican qué operaciones persisten y cómo evitar duplicar o reabrir fixtures? [Coverage, Spec §US5, Edge Cases, FR-024–FR-025, SC-006]

## Calidad de criterios de aceptación y exportaciones

- [ ] CHK016 ¿Los criterios permiten diferenciar un manifiesto XLSX válido de un acta PDF válida por sus magnitudes, datos requeridos y propósito, sin intercambiar enviado, recibido y conforme? [Acceptance Criteria, Spec §US4, FR-021–FR-023, SC-007]
- [ ] CHK017 ¿La autorización de descarga especifica inequívocamente titularidad y recepción finalizada también para acceso directo, y define el resultado ante fallo o repetición de la generación? [Completeness, Spec §US4, FR-021, FR-023]
- [ ] CHK018 ¿Los resultados numéricos de saldos, conciliación completa y diferencias se pueden juzgar con ejemplos exactos, sin sumar unidades heterogéneas ni inventar reglas de matching? [Measurability, Spec §FR-005, FR-012–FR-020, SC-003, SC-005]

## Requisitos no funcionales y límites de integración

- [ ] CHK019 ¿El criterio de 360 px define las páginas y elementos críticos cubiertos, junto con teclado, foco, etiquetas, errores por campo y estados textuales, de forma evaluable? [Measurability, Spec §FR-028, SC-009]
- [ ] CHK020 ¿La persistencia se atribuye a la fuente compartida y al reinicio de ambos procesos, y se distingue de borradores locales, respuestas simuladas de UI o evidencia del prototipo? [Clarity, Spec §US5, FR-024, SC-006; audit.md §Verificación]
- [ ] CHK021 ¿Está explícito qué contrato corresponde únicamente al servicio demo y qué deberá verificarse antes de adaptar una API real, sin presentar rutas futuras como contratos existentes? [Completeness, Spec §FR-004, FR-024, Assumptions; plan.md §Diseño de dominio]
- [ ] CHK022 ¿Las exclusiones de prioridad, matching, inventario, operaciones de otros roles y supervisión DC concuerdan con las capacidades que sí se anuncian para cada identidad? [Consistency, Spec §US5, FR-026, FR-030, Assumptions]

## Notes

- Todos los puntos se generan sin marcar; la evaluación corresponde a revisión humana de requisitos.
- Esta checklist examina la calidad de lo escrito, no el funcionamiento del código ni la aceptación operativa.
- [requirements.md](requirements.md) conserva su ciclo separado, mantenido por `$speckit-specify` y `$speckit-clarify`.
- Referencias: [plan de diseño](../plan.md), [auditoría de contexto](../audit.md) y contratos bajo `../contracts/`.
