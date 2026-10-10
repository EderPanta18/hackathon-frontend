// src/ui/form/select/select.constants.ts

import type { SelectContentProps, SelectTriggerProps } from "./select.types";

export const SELECT_TRIGGER_DEFAULTS = {
  size: "md",
} as const satisfies Required<Pick<SelectTriggerProps, "size">>;

export const SELECT_CONTENT_DEFAULTS = {
  position: "item-aligned",
  align: "center",
} as const satisfies Required<Pick<SelectContentProps, "position" | "align">>;
