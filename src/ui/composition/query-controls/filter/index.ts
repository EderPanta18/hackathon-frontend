// src/ui/composition/query-controls/filter/index.ts

import {
  FilterClear,
  FilterContent,
  FilterHeader,
  FilterOption,
  Filter as FilterRoot,
  FilterTrigger,
} from "./Filter";

export const Filter = Object.assign(FilterRoot, {
  Header: FilterHeader,
  Trigger: FilterTrigger,
  Clear: FilterClear,
  Content: FilterContent,
  Option: FilterOption,
});
