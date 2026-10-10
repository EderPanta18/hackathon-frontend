// src/ui/form/textarea/textarea.constants.ts

import type { TextareaProps } from "./textarea.types";

export const TEXTAREA_DEFAULTS = {
  variant: "outline",
} as const satisfies Required<Pick<TextareaProps, "variant">>;
