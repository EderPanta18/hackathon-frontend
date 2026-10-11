# Índice rápido de componentes UI — Agentes

> Fuente: `src/ui/**/index.ts`. Rutas relativas a `src/ui/`. Este archivo es para localizar la API pública, no para explicar comportamiento.
> `X.Y` = subcomponente; `—` = sin subcomponentes. **[OFF]** = exportaciones comentadas; no disponible hasta activarlo.

## `primitives/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `AspectRatio` | `primitives/aspect-ratio/index.ts` | — |
| `Avatar` | `primitives/avatar/index.ts` | `Avatar.Image`, `Avatar.Fallback`, `Avatar.Badge`, `Avatar.Group`, `Avatar.GroupCount` |
| `Badge` | `primitives/badge/index.ts` | — |
| `Button` | `primitives/button/index.ts` | — |
| `Image` | `primitives/image/index.ts` | — |
| `Kbd` | `primitives/kbd/index.ts` | `Kbd.Group` |
| `Resizable` **[OFF]** | `primitives/resizable/index.ts` | `Resizable.PanelGroup`, `Resizable.Panel`, `Resizable.Handle` |
| `ScrollArea` | `primitives/scroll-area/index.ts` | `ScrollArea.Bar` |
| `Separator` | `primitives/separator/index.ts` | — |
| `ToggleGroup` | `primitives/toggle-group/index.ts` | `ToggleGroup.Item` |
| `Toggle` | `primitives/toggle/index.ts` | — |

## `form/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `Calendar` **[OFF]** | `form/calendar/index.ts` | — |
| `Checkbox` | `form/checkbox/index.ts` | — |
| `Combobox` | `form/combobox/index.ts` | `Combobox.Value`, `Combobox.Trigger`, `Combobox.Clear`, `Combobox.Input`, `Combobox.Content`, `Combobox.List`, `Combobox.Item`, `Combobox.Group`, `Combobox.Label`, `Combobox.Collection`, `Combobox.Empty`, `Combobox.Separator`, `Combobox.Chips`, `Combobox.Chip`, `Combobox.ChipsInput` |
| `Field` | `form/field/index.ts` | `Field.Set`, `Field.Legend`, `Field.Group`, `Field.Content`, `Field.Label`, `Field.Title`, `Field.Description`, `Field.Separator`, `Field.Error` |
| `InputGroup` | `form/input-group/index.ts` | `InputGroup.Addon`, `InputGroup.Button`, `InputGroup.Text`, `InputGroup.Input`, `InputGroup.Textarea` |
| `InputOTP` **[OFF]** | `form/input-otp/index.ts` | `InputOTP.Group`, `InputOTP.Slot`, `InputOTP.Separator` |
| `Input` | `form/input/index.ts` | — |
| `Label` | `form/label/index.ts` | — |
| `RadioGroup` | `form/radio-group/index.ts` | `RadioGroup.Item` |
| `Select` | `form/select/index.ts` | `Select.Group`, `Select.Value`, `Select.Trigger`, `Select.Content`, `Select.Label`, `Select.Item`, `Select.Separator`, `Select.ScrollUpButton`, `Select.ScrollDownButton` |
| `Slider` | `form/slider/index.ts` | — |
| `Switch` | `form/switch/index.ts` | — |
| `Textarea` | `form/textarea/index.ts` | — |

## `display/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `Accordion` | `display/accordion/index.ts` | `Accordion.Item`, `Accordion.Trigger`, `Accordion.Content` |
| `Card` | `display/card/index.ts` | `Card.Header`, `Card.Title`, `Card.Description`, `Card.Action`, `Card.Content`, `Card.Footer`, `Card.Separator` |
| `Carousel` **[OFF]** | `display/carousel/index.ts` | `Carousel.Content`, `Carousel.Item`, `Carousel.Previous`, `Carousel.Next` |
| `Chart` **[OFF]** | `display/chart/index.ts` | `Chart.Style`, `Chart.Tooltip`, `Chart.TooltipContent`, `Chart.Legend`, `Chart.LegendContent` |
| `Collapsible` | `display/collapsible/index.ts` | `Collapsible.Trigger`, `Collapsible.Content` |
| `Item` | `display/item/index.ts` | `Item.Group`, `Item.Media`, `Item.Content`, `Item.Actions`, `Item.Separator`, `Item.Title`, `Item.Description`, `Item.Header`, `Item.Footer` |
| `Table` | `display/table/index.ts` | `Table.Header`, `Table.Body`, `Table.Footer`, `Table.Row`, `Table.Head`, `Table.Cell`, `Table.Caption` |

## `navigation/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `Breadcrumb` | `navigation/breadcrumb/index.ts` | `Breadcrumb.List`, `Breadcrumb.Item`, `Breadcrumb.Link`, `Breadcrumb.Page`, `Breadcrumb.Separator`, `Breadcrumb.Ellipsis` |
| `Menubar` | `navigation/menubar/index.ts` | `Menubar.Menu`, `Menubar.Group`, `Menubar.Portal`, `Menubar.RadioGroup`, `Menubar.Trigger`, `Menubar.Content`, `Menubar.Item`, `Menubar.CheckboxItem`, `Menubar.RadioItem`, `Menubar.Label`, `Menubar.Separator`, `Menubar.Shortcut`, `Menubar.Sub`, `Menubar.SubTrigger`, `Menubar.SubContent` |
| `NavigationMenu` | `navigation/navigation-menu/index.ts` | `NavigationMenu.List`, `NavigationMenu.Item`, `NavigationMenu.Trigger`, `NavigationMenu.Content`, `NavigationMenu.Viewport`, `NavigationMenu.Link`, `NavigationMenu.Indicator` |
| `Pagination` | `navigation/pagination/index.ts` | `Pagination.Content`, `Pagination.Item`, `Pagination.Link`, `Pagination.Previous`, `Pagination.Next`, `Pagination.Ellipsis` |
| `SidebarGroup` | `navigation/sidebar/group/index.ts` | `SidebarGroup.Label`, `SidebarGroup.Action`, `SidebarGroup.Content` |
| `SidebarMenuSub` | `navigation/sidebar/menu-sub/index.ts` | `SidebarMenuSub.Item`, `SidebarMenuSub.Button` |
| `SidebarMenu` | `navigation/sidebar/menu/index.ts` | `SidebarMenu.Item`, `SidebarMenu.Button`, `SidebarMenu.Action`, `SidebarMenu.Badge`, `SidebarMenu.Skeleton` |
| `Sidebar` | `navigation/sidebar/root/index.ts` | `Sidebar.Content`, `Sidebar.Header`, `Sidebar.Footer`, `Sidebar.Separator`, `Sidebar.Inset`, `Sidebar.Input`, `Sidebar.Trigger`, `Sidebar.Rail` |
| `Tabs` | `navigation/tabs/index.ts` | `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` |

## `overlay/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `AlertDialog` | `overlay/alert-dialog/index.ts` | `AlertDialog.Trigger`, `AlertDialog.Portal`, `AlertDialog.Overlay`, `AlertDialog.Content`, `AlertDialog.Header`, `AlertDialog.Footer`, `AlertDialog.Media`, `AlertDialog.Title`, `AlertDialog.Description`, `AlertDialog.Action`, `AlertDialog.Cancel` |
| `Command` **[OFF]** | `overlay/command/index.ts` | `Command.Dialog`, `Command.Input`, `Command.List`, `Command.Empty`, `Command.Group`, `Command.Separator`, `Command.Item`, `Command.Shortcut` |
| `ContextMenu` | `overlay/context-menu/index.ts` | `ContextMenu.Trigger`, `ContextMenu.Group`, `ContextMenu.Portal`, `ContextMenu.Sub`, `ContextMenu.RadioGroup`, `ContextMenu.Content`, `ContextMenu.Item`, `ContextMenu.SubTrigger`, `ContextMenu.SubContent`, `ContextMenu.CheckboxItem`, `ContextMenu.RadioItem`, `ContextMenu.Label`, `ContextMenu.Separator`, `ContextMenu.Shortcut` |
| `Dialog` | `overlay/dialog/index.ts` | `Dialog.Trigger`, `Dialog.Portal`, `Dialog.Close`, `Dialog.Content`, `Dialog.Header`, `Dialog.Footer`, `Dialog.Title`, `Dialog.Description` |
| `Drawer` | `overlay/drawer/index.ts` | `Drawer.Trigger`, `Drawer.Portal`, `Drawer.Close`, `Drawer.Overlay`, `Drawer.Content`, `Drawer.Header`, `Drawer.Footer`, `Drawer.Title`, `Drawer.Description` |
| `DropdownMenu` | `overlay/dropdown-menu/index.ts` | `DropdownMenu.Portal`, `DropdownMenu.Trigger`, `DropdownMenu.Content`, `DropdownMenu.Group`, `DropdownMenu.Label`, `DropdownMenu.Item`, `DropdownMenu.CheckboxItem`, `DropdownMenu.RadioGroup`, `DropdownMenu.RadioItem`, `DropdownMenu.Separator`, `DropdownMenu.Shortcut`, `DropdownMenu.Sub`, `DropdownMenu.SubTrigger`, `DropdownMenu.SubContent` |
| `HoverCard` | `overlay/hover-card/index.ts` | `HoverCard.Trigger`, `HoverCard.Content` |
| `Popover` | `overlay/popover/index.ts` | `Popover.Trigger`, `Popover.Anchor`, `Popover.Content`, `Popover.Header`, `Popover.Title`, `Popover.Description` |
| `Sheet` | `overlay/sheet/index.ts` | `Sheet.Trigger`, `Sheet.Close`, `Sheet.Portal`, `Sheet.Overlay`, `Sheet.Content`, `Sheet.Header`, `Sheet.Footer`, `Sheet.Title`, `Sheet.Description` |
| `Tooltip` | `overlay/tooltip/index.ts` | `Tooltip.Trigger`, `Tooltip.Content` |

## `feedback/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `Alert` | `feedback/alert/index.ts` | `Alert.Title`, `Alert.Description`, `Alert.Action` |
| `EmptyState` | `feedback/empty-state/index.ts` | `EmptyState.Header`, `EmptyState.Media`, `EmptyState.Title`, `EmptyState.Description`, `EmptyState.Content`, `EmptyState.Actions` |
| `ErrorState` | `feedback/error-state/index.ts` | `ErrorState.Header`, `ErrorState.Media`, `ErrorState.Title`, `ErrorState.Description`, `ErrorState.Content`, `ErrorState.Actions` |
| `Toaster` | `feedback/sonner/index.ts` | — |

## `loaders/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `Progress` | `loaders/progress/index.ts` | — |
| `Skeleton` | `loaders/skeleton/index.ts` | — |
| `Spinner` | `loaders/spinner/index.ts` | — |

## `composition/`

| Componente | Archivo | Subcomponentes |
|---|---|---|
| `DataBlock` | `composition/display/data-block/index.ts` | `DataBlock.Item` |
| `BackgroundLayout` | `composition/layouts/background-layout/index.ts` | — |
| `Filter` | `composition/query-controls/filter/index.ts` | `Filter.Header`, `Filter.Trigger`, `Filter.Clear`, `Filter.Content`, `Filter.Option` |
| `SearchInput` | `composition/query-controls/search-input/index.ts` | — |

## Patrones documentados (no son exportaciones de `src/ui/`)

| Patrón | Referencia | Composición base / ubicación del código | Estado |
|---|---|---|---|
| `data-table` | [`DATA_TABLE_PATRON.md`](DATA_TABLE_PATRON.md) | `display/table/index.ts` + `@tanstack/react-table` + primitivas según feature | Guía; no existe `DataTable` exportado |
| `date-picker` | [`DATE_PICKER_PATRON.md`](DATE_PICKER_PATRON.md) | `overlay/popover/index.ts` + `form/calendar/index.ts` + `primitives/button/index.ts` (`Field` opcional) | Guía; **bloqueado por `Calendar` [OFF]** |

Los patrones se implementan en cada *feature*, no se importan desde estos Markdown. Si se necesita `date-picker`, habilitar primero `Calendar`: revisar dependencias reales, `pnpm add <paquete>` para las faltantes, descomentar `form/calendar/index.ts` y `form/index.ts`, y verificar. Dependencias como `date-fns` o `react-hook-form` son específicas del ejemplo; instalar solo si se necesitan.

## Componentes y exportaciones adicionales

| Exportación | Archivo | Estado |
|---|---|---|
| `CalendarDayButton` | `form/calendar/index.ts` | **[OFF]**, exportación directa adicional de `Calendar` |
| `SidebarProvider` | `navigation/sidebar/index.ts` | Activo; no reexportado en `navigation/index.ts` |
| `TooltipProvider` | `overlay/tooltip/index.ts` | Activo; no reexportado en `overlay/index.ts` |
| `useComboboxAnchor` | `form/combobox/index.ts` | Activo; reexportado en `form/index.ts` |
| `useSidebar`, `SIDEBAR_COOKIE_NAME` | `navigation/sidebar/index.ts` | Activos; no reexportados en `navigation/index.ts` |
| `buttonVariants` | `primitives/button/index.ts` | Activo; no reexportado en `primitives/index.ts` |
| `toggleVariants` | `primitives/toggle/index.ts` | Activo; no reexportado en `primitives/index.ts` |

## Regla para componentes [OFF]

No importar ni activar por adelantado. Cuando se requiera uno: inspeccionar su implementación, identificar dependencias faltantes, instalarlas **solo con `pnpm add <paquete>`**, descomentar el `index.ts` del componente y su reexportación en el `index.ts` de categoría, verificar y actualizar el índice. No asumir paquetes sin revisar el código.

**Gestor del proyecto:** `pnpm` (no `npm`, `npx`, `yarn` ni `bun`). Para usar el CLI de shadcn/ui, si corresponde, `pnpm dlx shadcn@latest add <componente>`; no reinstalar componentes ya adaptados en `src/ui/`.

Los índices de categoría (`src/ui/<categoría>/index.ts`) son la referencia para conocer qué componentes se reexportan desde la categoría. Para componentes internos de `navigation/sidebar/` o `composition/`, comprobar también sus índices intermedios.
