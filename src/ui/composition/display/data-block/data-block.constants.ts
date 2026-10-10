// src/ui/composition/display/data-block/data-block.constants.ts

import type { DataBlockProps } from "./data-block.types";

export const DATA_BLOCK_DEFAULTS = {
  size: "md",
} as const satisfies Required<Pick<DataBlockProps, "size">>;
