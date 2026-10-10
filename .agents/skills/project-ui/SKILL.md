---
name: project-ui
description: Diseñar, componer, implementar, revisar o evolucionar la interfaz de este proyecto Next.js con el sistema UI personalizado de src/ui/ (adaptado de shadcn/ui). Usar en tareas de componentes, formularios, layouts, variantes, Tailwind, accesibilidad, modo oscuro o integración de componentes shadcn. Prioriza las APIs, exports y tokens reales del repositorio; evita reemplazarlos por shadcn estándar.
compatibility: Next.js App Router, React, TypeScript, Tailwind CSS, pnpm; skill local compartida por Codex y OpenCode en .agents/skills/.
---

# Project UI — sistema shadcn personalizado

## Propósito y alcance

Aplica esta skill al diseñar, implementar, reutilizar, modificar o auditar interfaz visual de este proyecto. El sistema de UI real está en `src/ui/`: **adaptaciones propias de shadcn/ui**, no copias intercambiables con el registro oficial.

No se utiliza para tareas exclusivas de API, NestJS, JWT, caché, arquitectura de datos o lógica sin interfaz. La existencia de esta skill **no autoriza** una refactorización general de `src/ui/`.

## Autoridad y prioridades

1. Instrucciones del usuario y contratos/limitaciones del proyecto.
2. Código actual verificado: `src/ui/**/index.ts`, implementaciones, tipos, variantes y estilos de `src/app/globals.css`, `components.json` si existe.
3. Arquitectura local y contratos de `src/shared/`, `src/modules/`, `src/app/`.
4. Catálogo y guías de `references/` (instantáneas de las fuentes entregadas, posiblemente desactualizadas).
5. Documentación de shadcn/ui y otras skills externas, **solo como referencia técnica**, nunca como reemplazo de la API local.

Cuando discrepen catálogo y código, **prevalece el código real**; señalar la discrepancia. Los índices prueban exportaciones, pero **no** garantizan props, dependencias instaladas ni funcionamiento.

## Procedimiento obligatorio para una tarea UI

1. **Identificar la intención** (composición de página, cambio de componente, formulario, patrón, corrección de estilo o auditoría). Limitar el alcance al pedido.
2. **Descubrir y reutilizar**: usar el [índice de componentes](references/component-index.md) para localizar candidatos; inspeccionar sus `index.ts`, implementación y tipos actuales antes de usarlos.
3. **Componer con la API del proyecto**: respetar `Card.Header`, `Field.Label`, `Dialog.Content` y demás nombres reales; no sustituir por imports o props predeterminados de shadcn.
4. **Asignar responsabilidad**: `src/ui/` para base visual, `src/shared/components/` para reutilizables no ligados a un dominio, `src/modules/<feature>/` para negocio, `src/app/` para rutas/layouts.
5. **Conservar identidad visual y accesibilidad**: tokens y temas existentes, modo claro/oscuro, teclado, foco, etiquetas, estados de carga/error, responsividad. No imponer nueva paleta o librería sin pedido.
6. **Verificar**: typecheck, linter y build que correspondan; inspección visual si existe acceso al navegador. Reportar qué se ejecutó y qué no.

## Restricciones

- No ejecutar `shadcn add`, `init`, migraciones ni generar/sobrescribir componentes en `src/ui/` automáticamente. Pedir autorización explícita para operaciones que regeneren, instalen o sustituyan componentes locales.
- No modificar `components.json`, tokens globales, `globals.css` o primitivas compartidas como efecto lateral de una pantalla sin necesidad explícita y verificación de consumidores.
- No importar desde `@/components/ui/*` por costumbre ni asumir API estándar (`variant`, `size`, `asChild`, etc.); inspeccionar las props locales antes de escribir código.
- No importar símbolos marcados **[OFF]** ni habilitarlos por adelantado. Seguir el protocolo de activación bajo demanda.
- No confundir `X.Y` con exportaciones independientes. Un `SidebarProvider` no es `Sidebar.Provider` salvo que el código lo demuestre.
- Usar `pnpm` (en Windows, PowerShell). No instalar dependencias por prevención.
- No inventar componentes, rutas, módulos, estados, permisos o contratos de backend para hacer una demo.
- Mantener cambios pequeños y reutilización antes que nuevas abstracciones.

## Referencias: cargar solo las necesarias

| Necesidad | Archivo |
|---|---|
| Encontrar componentes, subcomponentes, índices y estado [OFF] | [references/component-index.md](references/component-index.md) |
| Entender responsabilidades y catálogo descriptivo completo | [references/component-guide.md](references/component-guide.md) |
| Procedimientos de creación, extensión, auditoría y activación | [references/workflows.md](references/workflows.md) |
| Composiciones seguras y errores habituales de adaptación shadcn | [references/usage-examples.md](references/usage-examples.md) |
| Patrón de tabla de datos (no componente exportado) | [references/data-table.md](references/data-table.md) |
| Patrón de selector de fecha (Calendar inicialmente [OFF]) | [references/date-picker.md](references/date-picker.md) |
| Comandos y criterios de verificación | [references/verification.md](references/verification.md) |

## Coordinación con otras skills

- `frontend-design`: aporta dirección estética; **esta skill manda sobre la API local y las reutilizaciones**.
- `web-design-guidelines`: audita UI/UX y accesibilidad; aplicar sus hallazgos sin sustituir componentes del proyecto innecesariamente.
- `vercel-react-best-practices` (o nombre instalado equivalente): rendimiento y patrones React; comprobar nombre disponible.
- `shadcn` oficial: consultar detalles generales solo si el código local no responde la pregunta; **no** generar código estándar directamente.

Para tareas pequeñas no invocar todas las skills ni leer todas las referencias. Seleccionar solo lo pertinente.

## Salida esperada

Entregar implementación acotada, indicar componentes locales reutilizados, destacar APIs comprobadas frente a suposiciones, registrar archivos editados y evidencia de verificaciones; si falta información, pedir el archivo mínimo indispensable antes de inventar detalles.
