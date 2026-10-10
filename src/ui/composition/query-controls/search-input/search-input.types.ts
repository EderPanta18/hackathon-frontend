// src/ui/composition/query-controls/search-input/search-input.types.ts

import type { InputProps } from "@/ui/form/input";

export interface SearchInputProps extends Omit<InputProps, "value" | "onChange" | "icon"> {
  value: string;
  onChangeValue: (value: string) => void;
  showSearchIcon?: boolean;
  showClearButton?: boolean;
  debounceMs?: number;
}
