// src/ui/display/chart/chart.types.ts

/* // ui/display/chart/chart.types.ts

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import type {
  ComponentProps,
  ComponentType,
  CSSProperties,
  ReactNode,
} from "react";
import * as RechartsPrimitive from "recharts";
import { type TooltipValueType } from "recharts";

export type ChartThemeKey = "light" | "dark";

export type ChartIndicator = "dot" | "line" | "dashed";

export type TooltipNameType = number | string;

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<ChartThemeKey, string> }
  )
>;

export interface ChartContextValue {
  config: ChartConfig;
}

export interface ChartIndicatorStyleVars extends CSSProperties {
  "--color-bg": string;
  "--color-border": string;
}

export interface ChartContainerProps extends ComponentProps<"div"> {
  config: ChartConfig;
  children: ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
  initialDimension?: { width: number; height: number };
}

export interface ChartStyleProps {
  id: string;
  config: ChartConfig;
}

export interface ChartTooltipContentProps extends Omit<
  ComponentProps<typeof RechartsPrimitive.Tooltip> &
    ComponentProps<"div"> &
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
  "accessibilityLayer"
> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: ChartIndicator;
  nameKey?: string;
  labelKey?: string;
}

export type ChartLegendContentProps = ComponentProps<"div"> &
  RechartsPrimitive.DefaultLegendContentProps & {
    hideIcon?: boolean;
    nameKey?: string;
  };
 */
