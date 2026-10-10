// src/ui/form/field/field.constants.ts

import type { FieldLegendProps, FieldProps } from "./field.types";

export const FIELD_DEFAULTS = {
  orientation: "vertical",
} as const satisfies Required<Pick<FieldProps, "orientation">>;

export const FIELD_LEGEND_DEFAULTS = {
  variant: "legend",
} as const satisfies Required<Pick<FieldLegendProps, "variant">>;
