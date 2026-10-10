// src/ui/form/switch/switch.constants.ts

import type { SwitchProps } from "./switch.types";

export const SWITCH_DEFAULTS = {
  size: "md",
  tone: "primary",
} as const satisfies Required<Pick<SwitchProps, "size" | "tone">>;
