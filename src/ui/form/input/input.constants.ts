// src/ui/form/input/input.constants.ts

import type { InputProps } from "./input.types";

export const INPUT_DEFAULTS = {
  size: "md",
  variant: "outline",
} as const satisfies Required<Pick<InputProps, "size" | "variant">>;
