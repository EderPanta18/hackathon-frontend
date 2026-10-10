# date-picker — patrón de composición

> Este directorio no contiene un componente instalable.
> Es documentación de referencia sobre cómo componer un date picker
> usando los primitivos disponibles en `ui/`.
> La implementación concreta vive en cada feature que lo necesite.
> **Estado:** `Calendar` está marcado `[OFF]` en los `index.ts` disponibles;
> no asumir que este patrón funciona sin activarlo y verificarlo antes.

---

## Por qué no existe como componente reutilizable

Un date picker suele componerse de estos tres componentes de `ui/` (aunque `Calendar` todavía está deshabilitado en el inventario actual):

```

ui/overlay/popover + ui/form/calendar + ui/primitives/button

```

Cada caso de uso necesita una combinación distinta de estos tres:

| Caso                | Trigger            | Calendar        | Restricciones                  |
| ------------------- | ------------------ | --------------- | ------------------------------ |
| Filtro de tabla     | `Button` outline   | `mode="single"` | sin restricción de fecha       |
| Campo de formulario | `Button` con icono | `mode="single"` | integrado con `Field`          |
| Rango de fechas     | `Button` con rango | `mode="range"`  | `from` y `to`                  |
| Fecha de nacimiento | `Button`           | `mode="single"` | `disabled` para fechas futuras |
| Fecha de entrega    | `Button`           | `mode="single"` | `disabled` para fechas pasadas |

Crear un `DatePicker` genérico que cubra todos estos casos produce una API
de props extensa y frágil. La composición inline es más honesta y más fácil
de mantener cuando los requisitos cambian.

---

## Dependencias

**Gestor de paquetes: `pnpm`.** No utilizar `npm`, `npx`, `yarn` ni `bun`.

Los archivos de `Button`, `Popover` y `Field` aparecen exportados en los índices compartidos, pero **`Calendar` está deshabilitado**: su `form/calendar/index.ts` y la exportación en `form/index.ts` permanecen comentados por dependencias externas pendientes. Por tanto, **los ejemplos no son utilizables tal como están hasta activarlo**.

Antes de usar el patrón:

1. Inspeccionar `src/ui/form/calendar/` e identificar las dependencias que necesita; instalar con `pnpm add <paquete>` únicamente las que falten.
2. Descomentar `src/ui/form/calendar/index.ts` y la exportación de `Calendar` en `src/ui/form/index.ts`.
3. Verificar compilación, tipos e integración de `Calendar` antes de consumirlo desde cualquier feature.
4. Comprobar también las dependencias utilizadas por el ejemplo concreto. El formateo usa `date-fns`; el ejemplo de rango importa un tipo de `react-day-picker` y el de formulario usa `react-hook-form`. No instalar estas librerías si ya existen o si ese caso de uso no las necesita.

Para agregar la librería de formateo **solo si falta**:

```bash
pnpm add date-fns
```

Los siguientes imports son **previstos** para los ejemplos, una vez habilitado `Calendar`:

```ts
import { Button } from "@/ui/primitives/button";
import { Calendar } from "@/ui/form/calendar";
import { Field } from "@/ui/form/field";
import { Popover } from "@/ui/overlay/popover";
```

---

## Implementaciones de referencia

> Ejemplos orientativos: verificar las props de los componentes adaptados y las dependencias reales del proyecto antes de copiarlos; no se inspeccionaron sus implementaciones `.tsx`.

### 1. Fecha simple — el caso base

```tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/ui/primitives/button";
import { Calendar } from "@/ui/form/calendar";
import { Popover } from "@/ui/overlay/popover";
import { cn } from "@/lib/styling";

interface SingleDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export function SingleDatePicker({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
}: SingleDatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          tone="neutral"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {value ? format(value, "PPP", { locale: es }) : placeholder}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
        />
      </Popover.Content>
    </Popover>
  );
}
```

---

### 2. Fecha simple en formulario — con `Field` y `react-hook-form`

```tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/ui/primitives/button";
import { Calendar } from "@/ui/form/calendar";
import { Field } from "@/ui/form/field";
import { Popover } from "@/ui/overlay/popover";
import { cn } from "@/lib/styling";

interface FormValues {
  enrollmentDate: Date;
}

export function EnrollmentForm() {
  const { control, handleSubmit } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="enrollmentDate"
        control={control}
        rules={{ required: "La fecha es requerida" }}
        render={({ field, fieldState }) => (
          <Field label="Fecha de matrícula" error={fieldState.error?.message}>
            <Popover>
              <Popover.Trigger asChild>
                <Button
                  variant="outline"
                  tone="neutral"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {field.value
                    ? format(field.value, "PPP", { locale: es })
                    : "Selecciona una fecha"}
                </Button>
              </Popover.Trigger>
              <Popover.Content className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                />
              </Popover.Content>
            </Popover>
          </Field>
        )}
      />
    </form>
  );
}
```

---

### 3. Rango de fechas

```tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/ui/primitives/button";
import { Calendar } from "@/ui/form/calendar";
import { Popover } from "@/ui/overlay/popover";
import { cn } from "@/lib/styling";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const label = value?.from
    ? value.to
      ? `${format(value.from, "d MMM", { locale: es })} – ${format(value.to, "d MMM yyyy", { locale: es })}`
      : format(value.from, "d MMM yyyy", { locale: es })
    : "Selecciona un rango";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          tone="neutral"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value?.from && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {label}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </Popover.Content>
    </Popover>
  );
}
```

---

### 4. Filtro en tabla — sin `Field`, cierra al seleccionar

```tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/ui/primitives/button";
import { Calendar } from "@/ui/form/calendar";
import { Popover } from "@/ui/overlay/popover";

export function DateFilter() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button
            variant={date ? "soft" : "outline"}
            tone={date ? "primary" : "neutral"}
            size="sm"
          >
            <CalendarIcon />
            {date ? format(date, "d MMM yyyy", { locale: es }) : "Fecha"}
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
          />
        </Popover.Content>
      </Popover>

      {date && (
        <Button
          variant="ghost"
          tone="neutral"
          size="icon-sm"
          onClick={() => setDate(undefined)}
          aria-label="Limpiar fecha"
        >
          <X />
        </Button>
      )}
    </div>
  );
}
```

---

## Props de `Calendar` más usadas

| Prop                  | Tipo                                | Descripción                                 |
| --------------------- | ----------------------------------- | ------------------------------------------- |
| `mode`                | `"single" \| "range" \| "multiple"` | Modo de selección                           |
| `selected`            | `Date \| DateRange \| Date[]`       | Valor controlado                            |
| `onSelect`            | `function`                          | Callback al seleccionar                     |
| `disabled`            | `(date: Date) => boolean`           | Función para deshabilitar fechas            |
| `numberOfMonths`      | `number`                            | Cantidad de meses visibles (útil en rangos) |
| `defaultMonth`        | `Date`                              | Mes inicial visible                         |
| `fromDate` / `toDate` | `Date`                              | Límites de navegación                       |
| `locale`              | `Locale` de `date-fns`              | Idioma del calendario                       |

---

## Cuándo sí extraerlo a `composition/`

La regla es la regla de los tres: si el mismo pattern exacto (mismo trigger,
mismo modo, mismas restricciones) aparece en tres o más features, extraerlo
a `ui/composition/` se justifica.

Mientras eso no ocurra, la composición inline en cada feature es la opción correcta.

---

## Formateo de fechas — referencia rápida

```tsx
import { format } from "date-fns";
import { es } from "date-fns/locale";

format(date, "PPP", { locale: es }); // "7 de abril de 2026"
format(date, "d MMM yyyy", { locale: es }); // "7 abr 2026"
format(date, "dd/MM/yyyy"); // "07/04/2026"
format(date, "yyyy-MM-dd"); // "2026-04-07" (para APIs)
```
