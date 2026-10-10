# Flujos operativos de Project UI

## A. Crear una página, formulario o pantalla

1. Identificar el objetivo visual y el alcance, sin inventar dominio.
2. Localizar componentes existentes con `references/component-index.md` y leer solo las secciones que correspondan de `component-guide.md`.
3. Inspeccionar en el repo `src/ui/<categoría>/index.ts` y `src/ui/<categoría>/<componente>/index.ts`. Si el componente se exporta, inspeccionar implementación y tipos; **no deducir props de los nombres**.
4. Elegir primero primitivas y composiciones existentes de `src/ui/`. Considerar `src/shared/components/` antes de crear otro reutilizable. Componer la vista en la feature correspondiente de `src/modules/` y enlazarla desde `src/app/`.
5. Respetar la tipografía, los espacios, las variables de tema y los estilos actuales. Comprobar contrastes y teclado, responsive y modo oscuro.
6. Typecheck, lint y build (si procede); revisar en navegador cuando esté disponible. Resumir resultados y límites.

## B. Cambiar o ampliar una variante de componente existente

1. Buscar usos reales del componente y su API pública: exports, props, tipos, variantes y consumidores.
2. Determinar si basta con clases o composición **en el consumidor**. No expandir la API compartida si es un caso específico.
3. Si la modificación de `src/ui/` es necesaria y está dentro del alcance autorizado, mantener compatibilidad y revisar consumidores.
4. Actualizar `index.ts` únicamente si cambia la API pública; no exportar helpers internos por comodidad.
5. Verificar estados normales, disabled, loading, hover/focus, tema oscuro, responsive y typecheck.
6. Actualizar el catálogo local que usa esta skill **solo si el usuario solicita mantenerla o si el proceso de proyecto lo exige**; no editar carpetas de herramientas protegidas sin autorización.

## C. Se solicita un componente que no existe en el catálogo

1. Confirmar que no exista con otro nombre o como combinación (`composition/`, `shared/components/`, `modules/`).
2. Comprobar la implementación actual; el catálogo puede estar desactualizado.
3. Si se puede componer con piezas existentes, hacerlo en la feature; extraer a `shared/` o `src/ui/composition/` solo ante reutilización concreta.
4. Si no existe, explicar la brecha. Solo con autorización explícita valorar creación, importación desde shadcn CLI o dependencia nueva.
5. Si se autoriza CLI: verificar `components.json`, ruta de destino y impacto antes de ejecutar `pnpm dlx shadcn@latest add <nombre>`; no sobrescribir componentes customizados ni aceptar escrituras automáticas sobre `src/ui/` sin revisión.

## D. Activar componentes deshabilitados [OFF]

Componentes señalados en los documentos suministrados: `Resizable`, `Calendar`, `InputOTP`, `Carousel`, `Chart`, `Command`.

1. Necesidad real y autorización para tocar el componente.
2. Abrir su implementación existente y anotar imports externos reales; no inferir dependencias del nombre.
3. Comprobar los paquetes instalados; si faltan, `pnpm add <paquete>` **solo** para los necesarios, tras confirmar alcance.
4. Habilitar la exportación en `src/ui/<categoria>/<componente>/index.ts` y en `src/ui/<categoria>/index.ts`; revisar índices intermedios para casos como sidebar.
5. Verificar compilación, imports, interacciones y estilos.
6. Solo después de comprobarlo, actualizar el inventario con estado activo si corresponde al alcance.

Nunca activar todas las piezas [OFF] en bloque, ni presentar una pieza comentada como instalable de inmediato.

## E. Auditoría visual o accesibilidad

1. Inspeccionar la UI existente sin reconstruirla por defecto.
2. Evaluar jerarquía, consistencia, foco visible, navegación por teclado, accesibilidad del formulario, feedback, densidad, responsive, light/dark.
3. Distinguir problema demostrado, potencial y preferencia estética.
4. Priorizar cambios pequeños y localizados, reusar tokens de tema.
5. Aplicar `web-design-guidelines` cuando esté disponible; registrar qué se comprobó de verdad.

## F. Orden cuando coinciden varias skills

| Trabajo | Primaria | Apoyos necesarios |
|---|---|---|
| Implementar con componentes existentes | `project-ui` | `frontend-design` solo si hay diseño visual nuevo |
| Crear interfaz visual nueva | `frontend-design` + `project-ui` | `web-design-guidelines` al revisar |
| Auditar accesibilidad | `web-design-guidelines` | `project-ui` para correcciones compatibles |
| Optimizar renderizado | skill de buenas prácticas React | `project-ui` cuando afecte UI |
| Consultar shadcn oficial | `project-ui` | skill `shadcn` como referencia secundaria |

No leer todas las referencias ni activar todas las skills en cada tarea.
