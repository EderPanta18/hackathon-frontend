// src/ui/composition/query-controls/search-input/search-input.constants.ts

import type { InputSize } from "@/ui/form/input";
import type { ButtonSize } from "@/ui/primitives/button";
import type { SearchInputProps } from "./search-input.types";

export const SEARCH_INPUT_DEFAULTS = {
  size: "md",
  placeholder: "Buscar...",
  showSearchIcon: true,
  showClearButton: true,
  debounceMs: 0,
  disabled: false,
} as const satisfies Required<
  Pick<
    SearchInputProps,
    "size" | "placeholder" | "showSearchIcon" | "showClearButton" | "debounceMs" | "disabled"
  >
>;

export const SEARCH_INPUT_CLEAR_SIZE = {
  sm: "icon-xs",
  md: "icon-sm",
  lg: "icon",
} as const satisfies Record<InputSize, ButtonSize>;
