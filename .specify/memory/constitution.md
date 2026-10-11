# hackathon-frontend Constitution

<!-- HUMAN_MANAGED · Invariantes duraderos del frontend. -->

## I. Arquitectura y responsabilidades

- La aplicación **MUST** utilizar Next.js App Router, React y TypeScript, con responsabilidades cohesivas, dependencias acíclicas y complejidad proporcional al MVP.
- El frontend **MUST** limitarse a presentación, navegación, sesión web y coordinación con una **API externa**. La lógica de negocio autoritativa, autorización definitiva y persistencia pertenecen al backend. Next.js **MUST NOT** convertirse en un segundo backend de dominio.
- Las dependencias **MUST** respetar sus propietarios: `core/` (contratos puros), `lib/` (adaptadores técnicos), `ui/` (componentes genéricos), `shared/` (reutilización transversal), `modules/` (funcionalidades), `views/` (composición), `providers/` (contextos) y `app/` (rutas y layouts). `proxy.ts` y `middleware/` solo aplican controles web preliminares.
- Las capas inferiores **MUST NOT** depender de capas superiores ni existir ciclos. Los módulos **MUST NOT** importar implementaciones internas de otros módulos; la colaboración se compone en capas superiores o mediante interfaces públicas mínimas.
- El código cliente **MUST NOT** importar secretos, APIs exclusivas del servidor ni acceso directo a bases de datos de negocio. No crear carpetas, capas ni abstracciones vacías por anticipación.

## II. Seguridad y límites de datos

- La aplicación **MUST** separar el acceso de los cuatro roles y sus entidades. La navegación, los guards y las cookies **MUST NOT** considerarse autorización definitiva: cada operación sensible requiere validación de la API.
- Los mecanismos temporales de autenticación o datos simulados **MUST** estar aislados, identificados y ser sustituibles sin reescribir las funcionalidades; nunca presentar una sesión de demostración como autenticación de producción.
- Los datos personales **MUST** minimizarse. Los datos ficticios, históricos, aproximados o no verificados **MUST** distinguirse de información operativa real.

## III. Integridad funcional

- El flujo de ayuda **MUST** diferenciar solicitud, propuesta, reserva o aprobación, autorización, retiro, traslado y recepción confirmada. Ninguna etapa **MUST** contarse como otra ni alterar saldos por una suposición de la interfaz.
- Las asignaciones **MUST** basarse en demanda y existencias utilizables verificadas. La API **MUST** resolver de forma autoritativa disponibilidad, concurrencia, permisos, transiciones e idempotencia; el frontend **MUST** gestionar conflictos y reintentos sin anunciar éxito prematuramente.
- Las prioridades, cantidades, unidades, estados y fechas **MUST** provenir de reglas o contratos definidos; no inventar criterios, equivalencias ni datos faltantes. La trazabilidad **MUST** distinguir acciones previstas de acciones confirmadas.
- Mapas, rutas, estados de vías y exportaciones, **cuando formen parte de una funcionalidad**, **MUST** representar datos y archivos válidos. Un trazo visual no prueba una ruta segura; un archivo generado no certifica una entrega.
- Las capacidades offline, de sincronización o de tiempo real **MUST NOT** anunciarse si no están implementadas y verificadas.

## IV. Calidad y gobierno

- La implementación **MUST** priorizar reutilización, cambios mínimos y verificaciones proporcionales al riesgo. La interfaz **MUST** ser utilizable en móvil y accesible; la información crítica **MUST NOT** depender solo del color.
- La documentación **MUST** distinguir lo real, simulado y pendiente. El detalle de flujos, carpetas, herramientas, comandos y planificación **MUST** permanecer fuera de esta Constitution.
- Esta Constitution prevalece sobre decisiones técnicas ordinarias. Un conflicto **MUST** resolverse mediante corrección o enmienda autorizada, nunca ignorarse. Solo una persona autorizada puede modificarla; versionar cambios **MAJOR** (incompatibles), **MINOR** (nuevas reglas materiales) o **PATCH** (aclaraciones).

**Version:** 1.0.0 (borrador revisado) · **Ratified:** Pendiente · **Last Amended:** 2026-10-10
