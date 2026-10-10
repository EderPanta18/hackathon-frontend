// src/ui/overlay/alert-dialog/alert-dialog.constants.ts

import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
} from "./alert-dialog.types";

export const ALERT_DIALOG_CONTENT_DEFAULTS = {
  size: "md",
} as const satisfies Required<Pick<AlertDialogContentProps, "size">>;

export const ALERT_DIALOG_ACTION_DEFAULTS = {
  size: "md",
  tone: "destructive",
  variant: "solid",
  pending: false,
  announceLabel: "Acción en progreso",
} as const satisfies Required<
  Pick<AlertDialogActionProps, "size" | "tone" | "variant" | "pending" | "announceLabel">
>;

export const ALERT_DIALOG_CANCEL_DEFAULTS = {
  size: "md",
  tone: "neutral",
  variant: "outline",
} as const satisfies Required<Pick<AlertDialogCancelProps, "size" | "tone" | "variant">>;
