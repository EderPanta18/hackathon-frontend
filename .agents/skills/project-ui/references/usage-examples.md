# Composición local: ejemplos y límites

> Los ejemplos muestran **nombres de exportación constatados en los índices suministrados**. No certifican props, tipos, providers necesarios ni comportamiento interno. Antes de emplearlos, revisar el código actual del proyecto.

## Importación mediante categorías locales

```tsx
import { Button } from "@/ui/primitives";
import { Card } from "@/ui/display";
import { Field, Input } from "@/ui/form";
import { AlertDialog } from "@/ui/overlay";
```

Estos imports requieren que los `index.ts` actuales reexporten dichos componentes. Si una categoría no los reexporta, utilizar el `index.ts` público real, no una ruta inventada.

## API compuesta: respetar los miembros públicos

```tsx
<Card>
  <Card.Header>
    <Card.Title>Título</Card.Title>
    <Card.Description>Descripción</Card.Description>
  </Card.Header>
  <Card.Content>Contenido</Card.Content>
  <Card.Footer>
    <Button>Continuar</Button>
  </Card.Footer>
</Card>
```

`Card.Header`, `Card.Title`, `Card.Description`, `Card.Content`, `Card.Footer` figuran en el inventario. **No copiar props adicionales de la documentación de shadcn** sin verificación local.

```tsx
<Field>
  <Field.Label htmlFor="example">Etiqueta</Field.Label>
  <Field.Content>
    <Input id="example" />
  </Field.Content>
  <Field.Error />
</Field>
```

La composición ejemplifica los nombres constatados. Revisar cómo `Field.Error` acepta o representa el error en el componente real; el ejemplo no sustituye la integración con React Hook Form.

## Elementos no compuestos y exportaciones independientes

- `Button` y `Badge` se exportan como componentes; sus variantes y tipos exactos **deben leerse** de `primitives/button/` y `primitives/badge/`.
- `Sidebar`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuSub` son exportaciones principales distintas.
- `SidebarProvider`, `useSidebar`, `SIDEBAR_COOKIE_NAME` son exportaciones del módulo `navigation/sidebar/`, no miembros de `Sidebar.*`.
- `TooltipProvider` se exporta desde `overlay/tooltip/`, pero el índice de `overlay/` no lo reexporta según el catálogo recibido. Confirmar la ruta de importación.
- `useComboboxAnchor` es una exportación independiente de `Combobox`.
- `buttonVariants` y `toggleVariants` son utilidades exportadas desde los índices específicos del componente.

## Errores que debe evitar el agente

```tsx
// Evitar: import genérico de estructura shadcn que puede no existir.
import { Button } from "@/components/ui/button";
```

```tsx
// Evitar: asumir una API por conocimiento externo sin leer implementación.
<Button variant="default" size="lg" asChild />;
```

```tsx
// Evitar: importar un componente deshabilitado en el catálogo suministrado.
import { Calendar } from "@/ui/form";
```

Para piezas [OFF], la ruta puede fallar aunque haya archivos `.tsx` en el árbol.

## Tokens visuales y tema

- Inspeccionar `src/app/globals.css` y la configuración Tailwind real antes de cambiar paletas o tipografía.
- Si existe `ThemeProvider` de `next-themes`, verificar `.dark`, tokens CSS, estado de hidratación y la implementación personalizada de `Toaster`.
- No reemplazar `@/ui/feedback/sonner` por el `Toaster` de la librería `sonner` si el proyecto utiliza el wrapper customizado.
- No asumir que `richColors`, `tone`, `pending` o variantes siguen la misma API que la librería original: confirmarlos en los archivos locales.

## Ubicación de componentes

- Composición visual base o patrón transversal consolidado: `src/ui/` según categorías reales.
- Componente reutilizable ligado a coordinación de la aplicación, no necesariamente base de diseño: `src/shared/components/`.
- `LoginCard`, formularios y vistas específicas: `src/modules/auth/` o el módulo de negocio respectivo.
- `src/app/` compone rutas/layouts, evita almacenar implementaciones complejas de UI específica.
