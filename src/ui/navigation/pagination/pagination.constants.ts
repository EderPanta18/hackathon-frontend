// src/ui/navigation/pagination/pagination.constants.ts

import type {
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
} from "./pagination.types";

export const PAGINATION_LINK_DEFAULTS = {
  size: "icon",
  isActive: false,
} as const satisfies Required<Pick<PaginationLinkProps, "size" | "isActive">>;

export const PAGINATION_PREVIOUS_DEFAULTS = {
  text: "Anterior",
} as const satisfies Required<Pick<PaginationPreviousProps, "text">>;

export const PAGINATION_NEXT_DEFAULTS = {
  text: "Siguiente",
} as const satisfies Required<Pick<PaginationNextProps, "text">>;
