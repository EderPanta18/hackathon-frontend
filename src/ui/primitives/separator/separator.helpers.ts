// src/ui/primitives/separator/separator.helpers.ts

import { SEPARATOR_HIDE_AT, SEPARATOR_SHOW_AT } from "./separator.constants";
import type { SeparatorBreakpoint } from "./separator.types";

interface SeparatorVisibility {
  base: string;
  responsive: string;
}

export const getSeparatorVisibility = (breakpoint: SeparatorBreakpoint): SeparatorVisibility => ({
  base: `block ${SEPARATOR_HIDE_AT[breakpoint]}`,
  responsive: `hidden ${SEPARATOR_SHOW_AT[breakpoint]}`,
});
