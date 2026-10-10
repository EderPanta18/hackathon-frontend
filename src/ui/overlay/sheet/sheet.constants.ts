// src/ui/overlay/sheet/sheet.constants.ts

import type { SheetContentProps } from "./sheet.types";

export const SHEET_CONTENT_DEFAULTS = {
  side: "right",
  showCloseButton: true,
} as const satisfies Required<Pick<SheetContentProps, "side" | "showCloseButton">>;
