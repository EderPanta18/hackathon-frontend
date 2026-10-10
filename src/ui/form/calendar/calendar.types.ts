// src/ui/form/calendar/calendar.types.ts

/* // ui/form/calendar/calendar.types.ts

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import { type ComponentProps } from "react";
import { DayPicker, type DayButton, type Locale } from "react-day-picker";
import { type ButtonProps } from "@/ui/primitives/button";

export type CalendarChevronOrientation = "left" | "right" | "up" | "down";

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  buttonVariant?: ButtonProps["variant"];
};

export interface CalendarDayButtonProps extends ComponentProps<
  typeof DayButton
> {
  locale?: Partial<Locale>;
}

export interface CalendarChevronProps extends ComponentProps<"svg"> {
  orientation?: CalendarChevronOrientation;
}
 */
