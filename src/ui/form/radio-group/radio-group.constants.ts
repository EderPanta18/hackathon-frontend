// src/ui/form/radio-group/radio-group.constants.ts

import type { RadioGroupItemProps } from "./radio-group.types";

export const RADIO_GROUP_ITEM_DEFAULTS = {
  size: "md",
  tone: "primary",
} as const satisfies Required<Pick<RadioGroupItemProps, "size" | "tone">>;
