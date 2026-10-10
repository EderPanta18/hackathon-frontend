// src/ui/form/checkbox/checkbox.constants.ts

import type { CheckboxProps } from "./checkbox.types";

export const CHECKBOX_DEFAULTS = {
  size: "md",
  tone: "primary",
} as const satisfies Required<Pick<CheckboxProps, "size" | "tone">>;
