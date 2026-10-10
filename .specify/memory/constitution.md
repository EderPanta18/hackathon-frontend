# hackathon-frontend Constitution

<!-- HUMAN_MANAGED · Invariantes del frontend del Reto 21 de Piura Innova. -->

## I. Architecture & Ownership

- La aplicación MUST utilizar **Next.js App Router, React y TypeScript**, con responsabilidades cohesivas y dependencias acíclicas.
- El frontend MUST limitarse a presentación, navegación, estado de interfaz y coordinación con una **API externa**. El backend conserva la lógica de negocio autoritativa, autorización definitiva y persistencia. Next.js no se convierte en un segundo backend de dominio.
- Propietarios y dependencias permitidas:

| Capa | Responsabilidad y límite |
|---|---|
| `core/` | Configuración y contratos transversales puros; no depende de React ni de capas superiores. |
| `lib/` | Adaptadores de API, sesión técnica y caché; depende de `core/`, nunca de módulos visuales. |
| `ui/` | Componentes visuales genéricos; sin negocio ni acceso directo a API. |
| `shared/` | Reutilización transversal; puede usar `core/`, `lib/` y `ui/`, no módulos de dominio. |
| `modules/` | Presentación y coordinación de funcionalidades; no accede a interiores de otros módulos. Incluye `modules/app/` para el shell. |
| `views/` | Composición entre módulos, sin duplicar sus reglas ni servicios. |
| `providers/` | Contextos transversales, no pantallas ni estado indiscriminado. |
| `app/` | Rutas, layouts y entradas de Next.js; no implementaciones completas de funcionalidades. |
| `proxy.ts` / `middleware/` | Entrada y políticas preliminares de acceso web; nunca autorización definitiva ni persistencia. |

- Las capas inferiores MUST NOT importar capas superiores. Las colaboraciones entre módulos SHOULD componerse en `views/` o `app/`; cualquier interfaz entre módulos MUST ser pública, mínima y sin ciclos.
- El código de navegador MUST NOT importar secretos, `server-only` ni APIs exclusivas del servidor. No introducir ORM ni acceso directo a tablas de negocio desde este frontend.

## II. Product Invariants — Reto 21

- **Albergues:** MUST distinguir necesidades por insumo, población registrada y grupos vulnerables, con origen y vigencia de los datos identificables.
- **Inventario:** MUST distinguir existencias, reservas, despachos y entregas recibidas. Las propuestas de asignación MUST NOT exceder stock utilizable ni computarse como entregas confirmadas; la API MUST validar definitivamente conflictos y duplicados.
- **Distribución:** las sugerencias MUST basarse en demanda y disponibilidad registradas; SHOULD considerar urgencia, vulnerabilidad y accesibilidad sin privilegiar arbitrariamente lugares más visibles. No inventar prioridades ante datos insuficientes.
- **Rutas:** las rutas sugeridas MUST usar un grafo vial y respetar bloqueos conocidos. Tramos sin información MUST tratarse como desconocidos, no como transitables. Líneas entre pines y cartografía histórica MUST NOT presentarse como rutas seguras verificadas.
- **Trazabilidad:** MUST distinguir *asignado*, *despachado* y *recibido*. Los manifiestos **Excel (.xlsx)** y reportes de entrega **PDF** MUST ser archivos válidos, consistentes con su estado y nunca equivaler por sí mismos a una confirmación o firma oficial.
- **Conectividad:** la interfaz MUST diferenciar operaciones pendientes de las confirmadas. Una capacidad offline, sincronización o tiempo real MUST NOT anunciarse si no está implementada y comprobada.
- **Datos:** las referencias a **58 albergues y 19 caseríos aislados** NO constituyen un padrón actual verificado. Datos simulados, aproximados e históricos MUST identificarse; las fuentes y fechas conocidas SHOULD conservarse. MUST minimizarse la exposición de datos personales, especialmente de menores.

## III. Scope & Quality

- El MVP se centra en **censo/mapa de albergues → cruce demanda-inventario → rutas, despacho y recepción**, con exportaciones Excel y PDF. La clasificación general de catástrofes queda fuera del alcance base.
- MUST priorizarse una implementación simple, reutilizable y verificable. No crear capas vacías, abstracciones especulativas ni servicios de negocio duplicados.
- Los cambios MUST verificarse proporcionalmente al riesgo: consistencia de estados, duplicados, rutas imposibles, exportaciones, límites cliente/servidor y uso accesible en móvil. La criticidad MUST expresarse también con texto o símbolos, no sólo color.
- La documentación estable MUST reflejar comportamiento real y diferenciar lo implementado de los mocks y pendientes. Los comandos, herramientas, planificación y continuidad pertenecen a `AGENTS.md`, las skills y las specs, no a esta Constitution.

## IV. Governance

- Esta Constitution es la fuente normativa principal. Si el código la contradice, MUST corregirse el código o aprobarse una enmienda explícita; nunca ignorar el conflicto.
- Los cambios a este archivo requieren autorización humana y versionado: **MAJOR** (incompatibilidad), **MINOR** (nuevas reglas materiales), **PATCH** (aclaración).

**Version:** 1.0.0 | **Ratified:** Pendiente de aprobación | **Last Amended:** 2026-10-10
