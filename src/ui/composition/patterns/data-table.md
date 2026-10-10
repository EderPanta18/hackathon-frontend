# data-table — patrón de composición

> Este directorio no contiene un componente instalable.
> Es documentación de referencia sobre cómo componer una data table
> usando los primitivos disponibles en `ui/` y TanStack Table.
> La implementación concreta vive en cada feature que lo necesite.

---

## Por qué no existe como componente reutilizable

shadcn no provee `data-table` como componente instalable: lo documenta
como ejemplo de composición. No hay un componente `data-table` que añadir
con el CLI de shadcn/ui; se implementa en el feature que lo necesite.

Internamente, una data table es siempre:

```

ui/display/table + @tanstack/react-table + primitivos de ui/

```

Cada caso de uso necesita una combinación distinta:

| Caso                  | Primitivos adicionales              |
| --------------------- | ----------------------------------- |
| Tabla simple          | solo `Table`                        |
| Con filtro de texto   | `Table` + `Input`                   |
| Con acciones por fila | `Table` + `DropdownMenu`            |
| Con selección         | `Table` + `Checkbox`                |
| Con ordenamiento      | `Table` + `Button`                  |
| Con visibilidad       | `Table` + `DropdownMenu` + `Button` |
| Con paginación        | `Table` + `Button`                  |

Crear un `<DataTable>` genérico que cubra todos estos casos produce una API
de props extensa y frágil. La composición inline es más honesta y más fácil
de mantener cuando los requisitos cambian.

---

## Dependencias

**Gestor de paquetes del proyecto: `pnpm`.** Usar `pnpm add` para dependencias; no utilizar `npm`, `npx`, `yarn` ni `bun`.

Todos los componentes UI ya existen en `ui/`. Solo se requiere la librería
de TanStack Table si no está instalada:

```bash
pnpm add @tanstack/react-table
```

Imports disponibles:

```ts
import { Table } from "@/ui/display/table";
import { Button } from "@/ui/primitives/button";
import { Checkbox } from "@/ui/form/checkbox";
import { Input } from "@/ui/form/input";
import { DropdownMenu } from "@/ui/overlay/dropdown-menu";
```

---

## Estructura de archivos recomendada

Para mantener el código limpio, separar en tres archivos dentro del feature:

```
app/[feature]/
├── columns.tsx      # definición de columnas — "use client"
├── data-table.tsx   # componente DataTable — "use client"
└── page.tsx         # fetch de datos + render — server component
```

---

## Implementaciones de referencia

### 1. Tabla simple — el caso base

**`columns.tsx`**

```tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Estado" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
          }).format(amount)}
        </div>
      );
    },
  },
];
```

**`data-table.tsx`**

```tsx
"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Table } from "@/ui/display/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <Table.Header>
        {table.getHeaderGroups().map((group) => (
          <Table.Row key={group.id}>
            {group.headers.map((header) => (
              <Table.Head key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Table.Row
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={columns.length} className="h-24 text-center">
              Sin resultados.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
```

**`page.tsx`**

```tsx
import { DataTable } from "./data-table";
import { columns, type Payment } from "./columns";

async function getPayments(): Promise<Payment[]> {
  return [
    { id: "1", amount: 100, status: "success", email: "ken99@example.com" },
    { id: "2", amount: 250, status: "processing", email: "abe45@example.com" },
  ];
}

export default async function PaymentsPage() {
  const data = await getPayments();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
```

---

### 2. Con acciones por fila — `DropdownMenu`

```tsx
// columns.tsx
"use client";

import { MoreHorizontal } from "lucide-react";
import { Button }         from "@/ui/primitives/button";
import { DropdownMenu }   from "@/ui/overlay/dropdown-menu";
import type { Payment }   from "./columns";

{
  id: "actions",
  cell: ({ row }) => {
    const payment = row.original;
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="ghost" tone="neutral" size="icon-sm">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>Acciones</DropdownMenu.Label>
          <DropdownMenu.Item
            onClick={() => navigator.clipboard.writeText(payment.id)}
          >
            Copiar ID
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Ver detalle</DropdownMenu.Item>
          <DropdownMenu.Item variant="destructive">Eliminar</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
},
```

---

### 3. Con ordenamiento — `Button` en el header

```tsx
// columns.tsx — header con sort
import { ArrowUpDown } from "lucide-react";
import { Button }      from "@/ui/primitives/button";

{
  accessorKey: "email",
  header: ({ column }) => (
    <Button
      variant="ghost"
      tone="neutral"
      size="sm"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Email
      <ArrowUpDown />
    </Button>
  ),
},
```

```tsx
// data-table.tsx — agregar getSortedRowModel
import { getSortedRowModel, type SortingState } from "@tanstack/react-table";

const [sorting, setSorting] = useState<SortingState>([]);

const table = useReactTable({
  // ...
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: setSorting,
  state: { sorting },
});
```

---

### 4. Con filtro de texto — `Input`

```tsx
// data-table.tsx
import { Input } from "@/ui/form/input";
import {
  getFilteredRowModel,
  type ColumnFiltersState,
} from "@tanstack/react-table";

const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

const table = useReactTable({
  // ...
  getFilteredRowModel: getFilteredRowModel(),
  onColumnFiltersChange: setColumnFilters,
  state: { columnFilters },
});

// En el JSX, encima de la tabla:
<Input
  placeholder="Buscar por email..."
  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
  className="max-w-sm"
/>;
```

---

### 5. Con selección de filas — `Checkbox`

```tsx
// columns.tsx — primera columna
import { Checkbox } from "@/ui/form/checkbox";

{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Seleccionar todo"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Seleccionar fila"
    />
  ),
  enableSorting: false,
  enableHiding:  false,
},
```

```tsx
// data-table.tsx — estado + contador
const [rowSelection, setRowSelection] = useState({});

const table = useReactTable({
  // ...
  onRowSelectionChange: setRowSelection,
  state: { rowSelection },
});

// Debajo de la tabla:
<p className="text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} de{" "}
  {table.getFilteredRowModel().rows.length} fila(s) seleccionadas
</p>;
```

---

### 6. Con visibilidad de columnas — `DropdownMenu`

```tsx
// data-table.tsx
import { Settings2 } from "lucide-react";
import { Button } from "@/ui/primitives/button";
import { DropdownMenu } from "@/ui/overlay/dropdown-menu";
import { type VisibilityState } from "@tanstack/react-table";

const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

const table = useReactTable({
  // ...
  onColumnVisibilityChange: setColumnVisibility,
  state: { columnVisibility },
});

// Encima de la tabla:
<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline" tone="neutral" size="sm">
      <Settings2 />
      Columnas
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    {table
      .getAllColumns()
      .filter((col) => col.getCanHide())
      .map((col) => (
        <DropdownMenu.CheckboxItem
          key={col.id}
          checked={col.getIsVisible()}
          onCheckedChange={(value) => col.toggleVisibility(!!value)}
        >
          {col.id}
        </DropdownMenu.CheckboxItem>
      ))}
  </DropdownMenu.Content>
</DropdownMenu>;
```

---

### 7. Con paginación — `Button`

```tsx
// data-table.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/ui/primitives/button";
import { getPaginationRowModel } from "@tanstack/react-table";

const table = useReactTable({
  // ...
  getPaginationRowModel: getPaginationRowModel(),
  initialState: { pagination: { pageSize: 10 } },
});

// Debajo de la tabla:
<div className="flex items-center justify-end gap-2">
  <Button
    variant="outline"
    tone="neutral"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    <ChevronLeft />
    Anterior
  </Button>
  <Button
    variant="outline"
    tone="neutral"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Siguiente
    <ChevronRight />
  </Button>
</div>;
```

---

## API de `useReactTable` más usada

| Opción / método                     | Descripción                      |
| ----------------------------------- | -------------------------------- |
| `getCoreRowModel()`                 | Modelo base, siempre requerido   |
| `getSortedRowModel()`               | Ordenamiento client-side         |
| `getFilteredRowModel()`             | Filtrado client-side             |
| `getPaginationRowModel()`           | Paginación client-side           |
| `column.toggleSorting(asc)`         | Toggle ordenamiento en un header |
| `column.getFilterValue()`           | Valor actual del filtro          |
| `column.setFilterValue(val)`        | Aplicar filtro a una columna     |
| `column.toggleVisibility(bool)`     | Mostrar u ocultar una columna    |
| `row.getIsSelected()`               | Estado de selección de la fila   |
| `table.toggleAllPageRowsSelected()` | Seleccionar toda la página       |
| `row.original`                      | Datos raw de la fila             |

---

## Cuándo sí extraerlo a `composition/`

La regla es la regla de los tres: si el mismo pattern exacto (mismas
features habilitadas, mismo tipo de acciones) aparece en tres o más
features, extraerlo a `ui/composition/` se justifica.

Mientras eso no ocurra, la composición inline en cada feature es la opción correcta.
