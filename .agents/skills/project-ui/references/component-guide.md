<!-- Catálogo descriptivo suministrado por el usuario. Las implementaciones TSX reales NO se incluyeron en esa documentación; verificar en el repositorio. Los enlaces a patrones se sustituyeron por guías derivadas del material disponible. -->

# Componentes de UI

## Propósito

`src/ui/` reúne componentes visuales reutilizables del proyecto. La mayor parte son **adaptaciones de componentes de shadcn/ui**; además, `composition/` agrupa composiciones propias que utilizan o amplían esas piezas para resolver necesidades de interfaz más concretas.

Este documento es un **catálogo de responsabilidades y composición**, no una guía de propiedades, estilos o implementación. Describe qué corresponde a cada carpeta, para qué sirve cada componente y qué piezas públicas forman su API, según los archivos `index.ts` proporcionados.

### Convenciones de lectura

- **`X`** es un componente principal. **`X.Y`** representa un subcomponente expuesto bajo ese nombre, por ejemplo, `Card.Header`.
- Los nombres indicados como **sin subcomponentes** se exportan directamente, sin una API `X.Y` declarada en su `index.ts`.
- **Deshabilitado** significa que el código de exportación de su `index.ts` y la exportación del índice de la categoría están comentados. Se documenta como referencia, pero **no debe asumirse disponible para importar**. Su habilitación se realiza únicamente cuando se necesite, siguiendo el procedimiento indicado al final de este catálogo.
- Las descripciones expresan la **finalidad conceptual** deducible de los nombres y exportaciones. El comportamiento efectivo se define en los archivos de implementación, que no forman parte de este inventario.

## Organización de carpetas

```text
src/ui/
├── primitives/         # Piezas visuales básicas y reutilizables
├── form/               # Entrada de datos y estructura de campos
├── display/            # Presentación y organización de información
├── navigation/         # Desplazamiento y acceso a secciones o páginas
├── overlay/            # Contenido flotante, menús y superficies superpuestas
├── feedback/           # Mensajes, estados y notificaciones al usuario
├── loaders/            # Indicadores de carga y progreso
└── composition/        # Composiciones de mayor nivel propias del proyecto
    ├── display/
    ├── layouts/
    └── query-controls/
```

**Criterio de clasificación:** una pieza básica va en `primitives`; un control para introducir datos, en `form`; un contenedor que presenta datos, en `display`; un elemento para recorrer la interfaz, en `navigation`; una superficie que aparece sobre otra, en `overlay`; un mensaje o estado de resultado, en `feedback`; una señal de espera, en `loaders`; y una combinación orientada a un caso de uso del proyecto, en `composition`.

---

## 1. `primitives/` — Elementos fundamentales

Componentes visuales simples que sirven como base para construir interfaces y otros componentes. No representan por sí mismos una pantalla o flujo de negocio.

### `AspectRatio`
Mantiene una proporción visual definida en el área que contiene contenido, como imágenes o medios. **Sin subcomponentes públicos.**

### `Avatar`
Representa visualmente a una persona, entidad o elemento mediante una imagen o alternativa.

- `Avatar.Image`: imagen principal; `Avatar.Fallback`: representación alternativa cuando no se muestra la imagen.
- `Avatar.Badge`: distintivo asociado; `Avatar.Group`: conjunto de avatares; `Avatar.GroupCount`: indicador de cantidad en un grupo.

### `Badge`
Etiqueta visual compacta para mostrar una categoría, un estado o información breve. **Sin subcomponentes públicos.**

### `Button`
Acción interactiva básica utilizada para ejecutar operaciones dentro de la interfaz. **Sin subcomponentes públicos.** También exporta `buttonVariants`, una utilidad de variantes visuales.

### `Image`
Presenta imágenes dentro de la interfaz mediante el componente adaptado del proyecto. **Sin subcomponentes públicos.**

### `Kbd`
Representa visualmente teclas o combinaciones de teclado.

- `Kbd.Group`: reúne varias representaciones de teclas.

### `Resizable` — Deshabilitado
Conjunto de piezas previsto para dividir una superficie en paneles de tamaño ajustable.

- `Resizable.PanelGroup`: conjunto de paneles; `Resizable.Panel`: región ajustable; `Resizable.Handle`: control divisorio de ajuste.

**Estado:** su `index.ts` está comentado y la exportación del índice de `primitives/` también está comentada. No es una API activa.

### `ScrollArea`
Contenedor para visualizar contenido que requiere desplazamiento.

- `ScrollArea.Bar`: barra de desplazamiento asociada.

### `Separator`
Separación visual entre elementos o secciones. **Sin subcomponentes públicos.**

### `Toggle`
Control que representa una selección o estado alternable. **Sin subcomponentes públicos.** También exporta `toggleVariants` para variantes visuales.

### `ToggleGroup`
Agrupa controles alternables que pertenecen a una misma selección.

- `ToggleGroup.Item`: opción individual del grupo.

---

## 2. `form/` — Campos y entrada de datos

Controles mediante los cuales una persona introduce, selecciona o modifica valores, junto con estructuras para presentar etiquetas, ayudas y errores de los campos.

### `Calendar` — Deshabilitado
Selector visual de fechas.

- `CalendarDayButton`: pieza de día **exportada con nombre propio**, no como `Calendar.DayButton` en el `index.ts` revisado.

**Estado:** el `index.ts` del componente está comentado y `form/index.ts` no exporta `Calendar` de manera activa.

### `Checkbox`
Control de marcado para activar o desactivar una opción. **Sin subcomponentes públicos.**

### `Combobox`
Control de selección que combina entrada o búsqueda de texto con opciones disponibles; incluye piezas para organizar resultados y valores seleccionados.

- `Combobox.Value`: valor mostrado; `Combobox.Trigger`: activador; `Combobox.Clear`: limpieza de la selección; `Combobox.Input`: entrada de texto.
- `Combobox.Content`: superficie de opciones; `Combobox.List`: listado; `Combobox.Item`: opción individual; `Combobox.Group`: agrupación de opciones.
- `Combobox.Label`: etiqueta de grupo; `Combobox.Collection`: colección de opciones; `Combobox.Empty`: estado sin resultados; `Combobox.Separator`: separación visual.
- `Combobox.Chips`: contenedor de selecciones representadas como etiquetas; `Combobox.Chip`: selección individual; `Combobox.ChipsInput`: entrada vinculada a esas etiquetas.

**Exportación adicional:** `useComboboxAnchor`, utilidad de integración asociada al componente; no es un subcomponente `Combobox.Y`.

### `Field`
Estructura de un campo de formulario, incluyendo identificación, ayuda, agrupación y presentación de errores.

- `Field.Set`: conjunto de campos; `Field.Legend`: título del conjunto; `Field.Group`: agrupación de campos.
- `Field.Content`: contenido del campo; `Field.Label`: etiqueta; `Field.Title`: título; `Field.Description`: información de apoyo.
- `Field.Separator`: separación de campos; `Field.Error`: mensaje de error.

### `Input`
Campo básico de entrada de texto u otros valores compatibles. **Sin subcomponentes públicos.**

### `InputGroup`
Agrupa una entrada con elementos complementarios como texto y acciones adyacentes.

- `InputGroup.Addon`: elemento adjunto; `InputGroup.Button`: acción dentro del grupo; `InputGroup.Text`: texto auxiliar.
- `InputGroup.Input`: entrada de una línea; `InputGroup.Textarea`: entrada multilínea del grupo.

### `InputOTP` — Deshabilitado
Entrada dividida en posiciones, destinada a códigos de un solo uso o valores fragmentados.

- `InputOTP.Group`: grupo de posiciones; `InputOTP.Slot`: posición individual; `InputOTP.Separator`: separación entre grupos o posiciones.

**Estado:** el `index.ts` del componente está comentado y `form/index.ts` no exporta `InputOTP` de manera activa.

### `Label`
Etiqueta descriptiva asociable a un control o campo. **Sin subcomponentes públicos.**

### `RadioGroup`
Conjunto de opciones de selección normalmente excluyente.

- `RadioGroup.Item`: opción individual del grupo.

### `Select`
Control para elegir un valor a partir de un conjunto de opciones presentado en un desplegable.

- `Select.Trigger`: activador del desplegable; `Select.Value`: valor visible; `Select.Content`: contenido de opciones.
- `Select.Group`: agrupación; `Select.Label`: etiqueta del grupo; `Select.Item`: opción; `Select.Separator`: separación visual.
- `Select.ScrollUpButton`: control de desplazamiento hacia arriba; `Select.ScrollDownButton`: control de desplazamiento hacia abajo.

### `Slider`
Selección de valores mediante desplazamiento sobre un control lineal. **Sin subcomponentes públicos.**

### `Switch`
Interruptor para alternar entre dos estados. **Sin subcomponentes públicos.**

### `Textarea`
Campo destinado a introducir texto de varias líneas. **Sin subcomponentes públicos.**

---

## 3. `display/` — Presentación de información

Componentes destinados a estructurar, agrupar o revelar contenido informativo. Su responsabilidad principal es la presentación, no la captura de datos.

### `Accordion`
Conjunto de secciones cuyo contenido puede expandirse o contraerse.

- `Accordion.Item`: sección individual; `Accordion.Trigger`: elemento que activa su apertura; `Accordion.Content`: contenido de la sección.

### `Card`
Contenedor que presenta información relacionada como una unidad visual.

- `Card.Header`: encabezado; `Card.Title`: título; `Card.Description`: descripción; `Card.Action`: acción asociada.
- `Card.Content`: contenido principal; `Card.Footer`: pie; `Card.Separator`: división visual interna.

### `Carousel` — Deshabilitado
Presentación secuencial de elementos en una superficie desplazable.

- `Carousel.Content`: contenedor de la secuencia; `Carousel.Item`: elemento individual.
- `Carousel.Previous`: control anterior; `Carousel.Next`: control siguiente.

**Estado:** deshabilitado en su `index.ts` y en `display/index.ts` por dependencias externas pendientes.

### `Chart` — Deshabilitado
Conjunto de piezas para presentar gráficos de datos y sus elementos auxiliares. El contenedor principal se expondría como `Chart`.

- `Chart.Style`: estilos del gráfico; `Chart.Tooltip`: información flotante; `Chart.TooltipContent`: contenido de esa información.
- `Chart.Legend`: leyenda; `Chart.LegendContent`: contenido de la leyenda.

**Estado:** deshabilitado en su `index.ts` y en `display/index.ts` por dependencias externas pendientes.

### `Collapsible`
Región individual cuyo contenido puede mostrarse u ocultarse.

- `Collapsible.Trigger`: control de apertura o cierre; `Collapsible.Content`: región desplegable.

### `Item`
Unidad de información reutilizable que puede contener texto, medios y acciones.

- `Item.Group`: conjunto de elementos; `Item.Media`: contenido visual; `Item.Content`: cuerpo informativo; `Item.Actions`: acciones relacionadas.
- `Item.Separator`: división visual; `Item.Title`: título; `Item.Description`: descripción.
- `Item.Header`: encabezado; `Item.Footer`: pie.

### `Table`
Presenta información en filas y columnas organizadas.

- `Table.Header`: sección de encabezados; `Table.Body`: cuerpo; `Table.Footer`: pie de tabla.
- `Table.Row`: fila; `Table.Head`: celda de encabezado; `Table.Cell`: celda de datos; `Table.Caption`: título o leyenda descriptiva.

---

## 4. `navigation/` — Navegación y estructura de acceso

Componentes para ubicar al usuario, cambiar entre secciones y recorrer contenido o destinos dentro de la aplicación.

### `Breadcrumb`
Muestra una ruta jerárquica de navegación y la ubicación de la vista actual.

- `Breadcrumb.List`: secuencia; `Breadcrumb.Item`: elemento; `Breadcrumb.Link`: destino navegable.
- `Breadcrumb.Page`: página actual; `Breadcrumb.Separator`: separador de niveles; `Breadcrumb.Ellipsis`: niveles omitidos.

### `Menubar`
Barra de menús que organiza acciones y opciones en menús y submenús.

- `Menubar.Menu`: menú individual; `Menubar.Trigger`: activador; `Menubar.Content`: panel del menú; `Menubar.Portal`: montaje externo de la superficie.
- `Menubar.Group`: grupo de opciones; `Menubar.Item`: opción; `Menubar.Label`: encabezado o etiqueta del grupo; `Menubar.Separator`: división.
- `Menubar.CheckboxItem`: opción marcable; `Menubar.RadioGroup`: grupo de opciones excluyentes; `Menubar.RadioItem`: opción de ese grupo.
- `Menubar.Shortcut`: indicación de atajo; `Menubar.Sub`: submenú; `Menubar.SubTrigger`: activador del submenú; `Menubar.SubContent`: contenido del submenú.

### `NavigationMenu`
Navegación principal o agrupada que muestra enlaces y paneles asociados.

- `NavigationMenu.List`: lista de navegación; `NavigationMenu.Item`: elemento; `NavigationMenu.Trigger`: activador.
- `NavigationMenu.Content`: panel de contenido; `NavigationMenu.Viewport`: superficie donde se presenta; `NavigationMenu.Link`: enlace; `NavigationMenu.Indicator`: indicador visual.

### `Pagination`
Controles para recorrer contenido dividido en páginas.

- `Pagination.Content`: conjunto de controles; `Pagination.Item`: elemento; `Pagination.Link`: destino de página.
- `Pagination.Previous`: página anterior; `Pagination.Next`: página siguiente; `Pagination.Ellipsis`: intervalo omitido.

### `Sidebar`
Navegación o panel lateral de la aplicación. Está dividido en **cuatro componentes principales exportados por separado**: `Sidebar`, `SidebarGroup`, `SidebarMenu` y `SidebarMenuSub`.

**Estructura `Sidebar`:**

- `Sidebar.Header`: encabezado lateral; `Sidebar.Content`: contenido principal; `Sidebar.Footer`: pie.
- `Sidebar.Separator`: separación; `Sidebar.Inset`: área interior relacionada con la disposición lateral.
- `Sidebar.Input`: entrada integrada; `Sidebar.Trigger`: control de apertura o cambio de estado; `Sidebar.Rail`: zona lateral de interacción.

**Grupos `SidebarGroup`:**

- `SidebarGroup.Label`: título de grupo; `SidebarGroup.Action`: acción del grupo; `SidebarGroup.Content`: elementos agrupados.

**Menús `SidebarMenu`:**

- `SidebarMenu.Item`: elemento de menú; `SidebarMenu.Button`: control del elemento; `SidebarMenu.Action`: acción complementaria.
- `SidebarMenu.Badge`: distintivo; `SidebarMenu.Skeleton`: representación provisional durante la carga.

**Submenús `SidebarMenuSub`:**

- `SidebarMenuSub.Item`: elemento subordinado; `SidebarMenuSub.Button`: control del subelemento.

**Exportaciones adicionales del módulo `sidebar/`:** `SidebarProvider` (proveedor del contexto lateral), `useSidebar` (acceso a ese contexto) y `SIDEBAR_COOKIE_NAME` (constante relacionada). No pertenecen a la API `Sidebar.Y`.

### `Tabs`
Distribuye contenido entre vistas alternativas seleccionadas mediante pestañas.

- `Tabs.List`: lista de pestañas; `Tabs.Trigger`: pestaña seleccionable; `Tabs.Content`: panel correspondiente.

---

## 5. `overlay/` — Superficies superpuestas

Componentes que presentan contenido adicional sobre la interfaz: diálogos, paneles, menús y ayudas contextuales.

### `AlertDialog`
Diálogo de confirmación o decisión que requiere atención explícita del usuario.

- `AlertDialog.Trigger`: activador; `AlertDialog.Portal`: montaje externo; `AlertDialog.Overlay`: capa de fondo; `AlertDialog.Content`: superficie del diálogo.
- `AlertDialog.Header`: encabezado; `AlertDialog.Footer`: pie; `AlertDialog.Media`: elemento visual.
- `AlertDialog.Title`: título; `AlertDialog.Description`: explicación; `AlertDialog.Action`: acción principal; `AlertDialog.Cancel`: cancelación.

### `Command` — Deshabilitado
Interfaz de búsqueda o ejecución de comandos a partir de opciones organizadas.

- `Command.Dialog`: presentación en diálogo; `Command.Input`: campo de búsqueda; `Command.List`: listado; `Command.Empty`: estado sin coincidencias.
- `Command.Group`: agrupación; `Command.Separator`: división; `Command.Item`: comando u opción; `Command.Shortcut`: atajo indicado.

**Estado:** deshabilitado en su `index.ts` y en `overlay/index.ts` por dependencias externas pendientes.

### `ContextMenu`
Menú de acciones vinculadas al contexto de un elemento de la interfaz.

- `ContextMenu.Trigger`: región activadora; `ContextMenu.Content`: superficie del menú; `ContextMenu.Portal`: montaje externo.
- `ContextMenu.Group`: agrupación; `ContextMenu.Item`: acción; `ContextMenu.Label`: etiqueta; `ContextMenu.Separator`: separación.
- `ContextMenu.CheckboxItem`: opción marcable; `ContextMenu.RadioGroup`: grupo excluyente; `ContextMenu.RadioItem`: opción excluyente.
- `ContextMenu.Shortcut`: atajo indicado; `ContextMenu.Sub`: submenú; `ContextMenu.SubTrigger`: activador del submenú; `ContextMenu.SubContent`: contenido del submenú.

### `Dialog`
Ventana superpuesta para presentar información o interacción adicional.

- `Dialog.Trigger`: activador; `Dialog.Portal`: montaje externo; `Dialog.Close`: acción de cierre; `Dialog.Content`: superficie principal.
- `Dialog.Header`: encabezado; `Dialog.Footer`: pie; `Dialog.Title`: título; `Dialog.Description`: descripción.

### `Drawer`
Panel emergente asociado a un borde de la interfaz.

- `Drawer.Trigger`: activador; `Drawer.Portal`: montaje externo; `Drawer.Close`: cierre; `Drawer.Overlay`: capa de fondo; `Drawer.Content`: panel.
- `Drawer.Header`: encabezado; `Drawer.Footer`: pie; `Drawer.Title`: título; `Drawer.Description`: descripción.

### `DropdownMenu`
Menú desplegable de acciones u opciones asociado a un activador.

- `DropdownMenu.Trigger`: activador; `DropdownMenu.Portal`: montaje externo; `DropdownMenu.Content`: contenido desplegable.
- `DropdownMenu.Group`: agrupación; `DropdownMenu.Label`: etiqueta; `DropdownMenu.Item`: opción; `DropdownMenu.Separator`: división.
- `DropdownMenu.CheckboxItem`: opción marcable; `DropdownMenu.RadioGroup`: grupo excluyente; `DropdownMenu.RadioItem`: opción excluyente.
- `DropdownMenu.Shortcut`: atajo indicado; `DropdownMenu.Sub`: submenú; `DropdownMenu.SubTrigger`: activador; `DropdownMenu.SubContent`: contenido del submenú.

### `HoverCard`
Panel contextual breve asociado a un elemento que se señala con el puntero.

- `HoverCard.Trigger`: elemento de referencia; `HoverCard.Content`: información mostrada.

### `Popover`
Superficie flotante contextual vinculada a un activador o punto de referencia.

- `Popover.Trigger`: activador; `Popover.Anchor`: punto de referencia; `Popover.Content`: superficie flotante.
- `Popover.Header`: encabezado; `Popover.Title`: título; `Popover.Description`: descripción.

### `Sheet`
Panel superpuesto que se presenta desde una zona lateral de la pantalla.

- `Sheet.Trigger`: activador; `Sheet.Close`: cierre; `Sheet.Portal`: montaje externo; `Sheet.Overlay`: capa de fondo; `Sheet.Content`: panel.
- `Sheet.Header`: encabezado; `Sheet.Footer`: pie; `Sheet.Title`: título; `Sheet.Description`: descripción.

### `Tooltip`
Ayuda contextual breve asociada a un elemento de la interfaz.

- `Tooltip.Trigger`: elemento de referencia; `Tooltip.Content`: texto o contenido de ayuda.

**Exportación adicional del módulo `tooltip/`:** `TooltipProvider`, proveedor de configuración o contexto compartido. No forma parte de `Tooltip.Y`.

---

## 6. `feedback/` — Mensajes y estados de resultado

Componentes que comunican información importante, ausencia de contenido, errores o notificaciones. A diferencia de `loaders/`, representan mensajes o estados, no solo espera.

### `Alert`
Mensaje destacado dentro de la página que informa sobre una situación o acción relevante.

- `Alert.Title`: título; `Alert.Description`: detalle; `Alert.Action`: acción asociada.

### `EmptyState`
Vista utilizada cuando una sección no tiene elementos o datos que presentar.

- `EmptyState.Header`: encabezado; `EmptyState.Media`: recurso visual; `EmptyState.Title`: título; `EmptyState.Description`: explicación.
- `EmptyState.Content`: contenido adicional; `EmptyState.Actions`: acciones sugeridas.

### `ErrorState`
Vista destinada a comunicar que una operación o sección no pudo completarse correctamente.

- `ErrorState.Header`: encabezado; `ErrorState.Media`: recurso visual; `ErrorState.Title`: título; `ErrorState.Description`: explicación.
- `ErrorState.Content`: información adicional; `ErrorState.Actions`: acciones relacionadas con el error.

### `Toaster`
Contenedor de notificaciones temporales, exportado desde `sonner/`. **Sin subcomponentes públicos declarados en su `index.ts`.**

---

## 7. `loaders/` — Indicadores de espera

Elementos utilizados mientras se carga información, se prepara una vista o progresa una operación.

### `Progress`
Representa visualmente el avance de una operación. **Sin subcomponentes públicos.**

### `Skeleton`
Representación provisional de contenido que aún no está disponible. **Sin subcomponentes públicos.**

### `Spinner`
Indicador visual de actividad o espera. **Sin subcomponentes públicos.**

---

## 8. `composition/` — Composiciones del proyecto

Componentes de nivel más alto que organizan o combinan elementos para casos de uso propios del proyecto. **No deben interpretarse automáticamente como componentes originales de shadcn/ui.**

### `composition/display/`
Composiciones para presentar información con una estructura de aplicación específica.

#### `DataBlock`
Bloque para agrupar y presentar unidades de información.

- `DataBlock.Item`: unidad de información dentro del bloque.

### `composition/layouts/`
Estructuras de disposición visual utilizadas para organizar una vista.

#### `BackgroundLayout`
Composición para establecer la estructura o superficie de fondo de una sección o página. **Sin subcomponentes públicos.**

### `composition/query-controls/`
Controles compuestos relacionados con búsqueda, filtrado o consulta de datos.

#### `Filter`
Conjunto de elementos para mostrar, elegir y limpiar criterios de filtrado.

- `Filter.Header`: encabezado; `Filter.Trigger`: activador; `Filter.Clear`: acción de limpieza.
- `Filter.Content`: contenido con opciones; `Filter.Option`: criterio u opción individual.

#### `SearchInput`
Entrada de búsqueda especializada para las composiciones de consulta del proyecto. **Sin subcomponentes públicos.**

---

## Patrones de composición documentados (no exportados)

Además de los componentes de `src/ui/`, existen **guías de composición** que describen cómo construir elementos de interfaz para casos de uso específicos. **No representan componentes instalables ni nuevas exportaciones de `src/ui/`**; su implementación concreta debe vivir en el *feature* que la requiera.

### `data-table` — Tabla de datos

**Referencia:** [patrón de tabla de datos](data-table.md). Enseña a combinar `Table` (`src/ui/display/table/`) con `@tanstack/react-table` y, según el caso, `Input`, `Button`, `Checkbox` o `DropdownMenu` para filtros, selección, ordenamiento y paginación. Instalar `@tanstack/react-table` con `pnpm add @tanstack/react-table` **solo si falta**. No existe un componente `DataTable` genérico exportado por `src/ui/`.

### `date-picker` — Selección de fechas

**Referencia:** [patrón de selector de fecha](date-picker.md). Explica cómo combinar `Popover` (`src/ui/overlay/popover/`), `Calendar` (`src/ui/form/calendar/`) y `Button` (`src/ui/primitives/button/`), opcionalmente con `Field`, para elegir una fecha, un rango o aplicar restricciones.

**Requisito previo:** `Calendar` figura **deshabilitado** en los `index.ts` compartidos. Antes de usar el patrón hay que inspeccionar y agregar únicamente sus dependencias faltantes mediante `pnpm`, descomentar el índice del componente y su exportación en `form/index.ts`, y verificar su funcionamiento. Según el ejemplo, podrían requerirse otras dependencias, como `date-fns` para formateo o `react-hook-form` para formularios; no asumir que todas están instaladas.

**Criterio de reutilización:** construir estos patrones dentro de cada *feature*; considerar extraerlos a `composition/` únicamente cuando se repita de forma verificable una composición equivalente y exista un beneficio de reutilización. Las guías de referencia no son prueba de que esa extracción ya exista.

---

## Estado de disponibilidad

Este inventario distingue los componentes descritos en los `index.ts` de aquellos que están efectivamente expuestos por sus índices de carpeta.

| Componente | Carpeta | Estado observado |
| --- | --- | --- |
| `Carousel` | `display/` | `display/carousel/index.ts` y su exportación en `display/index.ts` comentados |
| `Chart` | `display/` | `display/chart/index.ts` y su exportación en `display/index.ts` comentados |
| `Calendar` | `form/` | `form/calendar/index.ts` y su exportación en `form/index.ts` comentados |
| `InputOTP` | `form/` | `form/input-otp/index.ts` y su exportación en `form/index.ts` comentados |
| `Command` | `overlay/` | `overlay/command/index.ts` y su exportación en `overlay/index.ts` comentados |
| `Resizable` | `primitives/` | `primitives/resizable/index.ts` y su exportación en `primitives/index.ts` comentados |

Todos los demás componentes enumerados aparecen exportados en los índices de sus respectivas carpetas, aunque **una exportación no demuestra por sí sola que su ejecución o sus dependencias hayan sido verificadas**.

### Activación bajo demanda de componentes comentados

Los seis componentes señalados están **intencionalmente deshabilitados por dependencias externas no instaladas**. No se deben instalar dichas dependencias ni habilitar esos componentes por adelantado: **cuando un componente sea necesario para una funcionalidad**, corresponde activar únicamente ese componente.

1. **Revisar sus requisitos:** identificar las dependencias externas que necesita el componente en su implementación y comprobar cuáles faltan en el proyecto.
2. **Instalar las dependencias necesarias:** el proyecto utiliza **`pnpm`**. Revisar versiones compatibles e instalar solo los paquetes faltantes mediante `pnpm add <paquete>`. No utilizar `npm`, `npx`, `yarn` ni `bun`, ni instalar paquetes por anticipado.
3. **Descomentar su código de exportación:** reactivar las declaraciones del `index.ts` específico del componente y su exportación en el `index.ts` de la categoría correspondiente (`display/`, `form/`, `overlay/` o `primitives/`). Si hubiera otras secciones comentadas necesarias para su funcionamiento, revisarlas y habilitarlas también.
4. **Verificar su integración:** comprobar que se pueda importar y utilizar, que la compilación y los chequeos pertinentes pasen y que no se hayan introducido errores de dependencias o comportamiento.
5. **Actualizar este documento:** retirar la indicación de *Deshabilitado* únicamente cuando el componente haya sido reactivado y verificado.

**CLI de shadcn/ui:** si hace falta ejecutar su instalador, usar `pnpm dlx shadcn@latest add <componente>`; **no** utilizarlo para sobrescribir los componentes ya adaptados en `src/ui/`.

**Importante:** descomentar solamente la exportación del índice de categoría no es suficiente si el `index.ts` del componente continúa comentado. Los archivos revisados **no identifican cuáles son los paquetes concretos pendientes**, por lo que deben determinarse al inspeccionar la implementación de cada componente; no deben suponerse.

**Corrección de nombre:** el componente de estado vacío se llama `EmptyState`, no `EmptyStae`.

## Regla de mantenimiento del catálogo

Para mantener esta documentación alineada con el código:

1. Añadir o retirar entradas cuando cambien los `index.ts` públicos de `src/ui/`.
2. Registrar los subcomponentes con el **nombre compuesto exacto** que asigna cada `Object.assign` (`X.Y`), sin inferir nombres a partir de los archivos internos.
3. Mantener diferenciadas las exportaciones separadas (`SidebarProvider`, `TooltipProvider`, `useComboboxAnchor`, etc.) de los subcomponentes `X.Y`.
4. Mantener los componentes comentados como deshabilitados hasta que se instalen las dependencias necesarias, se descomente el código correspondiente y se verifique su funcionamiento.
5. Documentar aquí **responsabilidades y composición**; dejar propiedades, variantes, ejemplos completos y decisiones de implementación junto al código o en documentación especializada.

> **Alcance de la verificación:** inventario elaborado a partir de los archivos `index.ts` compartidos. No se inspeccionaron las implementaciones `.tsx`, ni se ejecutó el proyecto.
