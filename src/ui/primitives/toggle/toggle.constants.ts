// src/ui/primitives/toggle/toggle.constants.ts

import type { ToggleProps } from "./toggle.types";

export const TOGGLE_DEFAULTS = {
  size: "md",
  variant: "ghost",
} as const satisfies Required<Pick<ToggleProps, "size" | "variant">>;
