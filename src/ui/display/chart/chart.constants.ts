// src/ui/display/chart/chart.constants.ts

/* // ui/display/chart/chart.constants.ts

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import type {
  ChartThemeKey,
  ChartIndicator,
  ChartTooltipContentProps,
  ChartLegendContentProps,
} from "./chart.types";

export const CHART_TOOLTIP_CONTENT_DEFAULS = {
  indicator: "dot",
  hideLabel: false,
  hideIndicator: false,
} as const satisfies Required<
  Pick<ChartTooltipContentProps, "indicator" | "hideLabel" | "hideIndicator">
>;

export const CHART_LEGEND_CONTENT_DEFAULTS = {
  verticalAlign: "bottom",
  hideIcon: false,
} as const satisfies Pick<
  ChartLegendContentProps,
  "verticalAlign" | "hideIcon"
>;

export const THEMES = {
  light: "",
  dark: ".dark",
} as const satisfies Record<ChartThemeKey, string>;

export const CHART_INITIAL_DIMENSION = {
  width: 320,
  height: 200,
} as const;

export const CHART_INDICATOR_TYPES = [
  "dot",
  "line",
  "dashed",
] as const satisfies readonly ChartIndicator[];
 */
