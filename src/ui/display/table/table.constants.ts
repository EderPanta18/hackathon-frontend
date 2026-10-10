// src/ui/display/table/table.constants.ts

import type { TableBodyProps } from "./table.types";

export const TABLE_BODY_DEFAULTS = {
  hoverable: true,
} as const satisfies Required<Pick<TableBodyProps, "hoverable">>;
