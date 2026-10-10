// src/ui/composition/query-controls/filter/filter.context.ts

import { createContext, useContext } from "react";
import type { FilterContextValue } from "./filter.types";

export const FilterContext = createContext<FilterContextValue | null>(null);

export const useFilter = (): FilterContextValue => {
  const ctx = useContext(FilterContext);

  if (!ctx) throw new Error("useFilter debe usarse dentro de <Filter>");

  return ctx;
};
