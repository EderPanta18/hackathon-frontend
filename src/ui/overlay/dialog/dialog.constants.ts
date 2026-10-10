// src/ui/overlay/dialog/dialog.constants.ts

import type { DialogContentProps, DialogFooterProps } from "./dialog.types";

export const DIALOG_CONTENT_DEFAULTS = {
  showCloseButton: false,
  closeOnInteractOutside: false,
  closeOnEscapeKeyDown: false,
  preventClose: false,
} as const satisfies Required<
  Pick<
    DialogContentProps,
    "showCloseButton" | "closeOnInteractOutside" | "closeOnEscapeKeyDown" | "preventClose"
  >
>;

export const DIALOG_FOOTER_DEFAULTS = {
  showCloseButton: false,
} as const satisfies Required<Pick<DialogFooterProps, "showCloseButton">>;
