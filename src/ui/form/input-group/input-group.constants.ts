// src/ui/form/input-group/input-group.constants.ts

import type { InputGroupAddonProps, InputGroupButtonProps } from "./input-group.types";

export const INPUT_GROUP_ADDON_DEFAULTS = {
  align: "inline-start",
} as const satisfies Required<Pick<InputGroupAddonProps, "align">>;

export const INPUT_GROUP_BUTTON_DEFAULTS = {
  size: "xs",
  variant: "ghost",
  tone: "neutral",
  type: "button",
} as const satisfies Required<Pick<InputGroupButtonProps, "size" | "variant" | "tone" | "type">>;
