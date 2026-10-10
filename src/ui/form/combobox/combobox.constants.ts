// src/ui/form/combobox/combobox.constants.ts

import type { ComboboxChipProps, ComboboxContentProps, ComboboxInputProps } from "./combobox.types";

export const COMBOBOX_INPUT_DEFAULTS = {
  showTrigger: true,
  showClear: false,
  disabled: false,
} as const satisfies Required<Pick<ComboboxInputProps, "showTrigger" | "showClear" | "disabled">>;

export const COMBOBOX_CONTENT_DEFAULTS = {
  side: "bottom",
  sideOffset: 6,
  align: "start",
  alignOffset: 0,
} as const satisfies Required<
  Pick<ComboboxContentProps, "side" | "sideOffset" | "align" | "alignOffset">
>;

export const COMBOBOX_CHIP_DEFAULTS = {
  showRemove: true,
} as const satisfies Required<Pick<ComboboxChipProps, "showRemove">>;
