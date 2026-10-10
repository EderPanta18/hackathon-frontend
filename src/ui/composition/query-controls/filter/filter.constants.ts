// src/ui/composition/query-controls/filter/filter.constants.ts

import type { FilterOptionProps, FilterProps } from "./filter.types";

export const FILTER_DEFAULTS = {
  multiple: true,
  defaultOpen: true,
  disabled: false,
} as const satisfies Required<Pick<FilterProps, "multiple" | "defaultOpen" | "disabled">>;

export const FILTER_OPTION_DEFAULTS = {
  disabled: false,
} as const satisfies Required<Pick<FilterOptionProps, "disabled">>;
