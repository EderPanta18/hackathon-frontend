// src/ui/overlay/alert-dialog/alert-dialog.types.ts

import type { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import type { ButtonProps } from "@/ui/primitives/button";

export type AlertDialogContentSize = "sm" | "md";

export interface AlertDialogProps extends ComponentProps<typeof AlertDialogPrimitive.Root> {}

export interface AlertDialogTriggerProps
  extends ComponentProps<typeof AlertDialogPrimitive.Trigger> {}

export interface AlertDialogPortalProps
  extends ComponentProps<typeof AlertDialogPrimitive.Portal> {}

export interface AlertDialogOverlayProps
  extends ComponentProps<typeof AlertDialogPrimitive.Overlay> {}

export interface AlertDialogContentProps
  extends ComponentProps<typeof AlertDialogPrimitive.Content> {
  size?: AlertDialogContentSize;
}

export interface AlertDialogHeaderProps extends ComponentProps<"div"> {}

export interface AlertDialogFooterProps extends ComponentProps<"div"> {}

export interface AlertDialogMediaProps extends ComponentProps<"div"> {}

export interface AlertDialogTitleProps extends ComponentProps<typeof AlertDialogPrimitive.Title> {}

export interface AlertDialogDescriptionProps
  extends ComponentProps<typeof AlertDialogPrimitive.Description> {}

export interface AlertDialogActionProps extends ComponentProps<typeof AlertDialogPrimitive.Action> {
  size?: ButtonProps["size"];
  tone?: ButtonProps["tone"];
  variant?: ButtonProps["variant"];
  pending?: boolean;
  announceLabel?: string;
}

export interface AlertDialogCancelProps extends ComponentProps<typeof AlertDialogPrimitive.Cancel> {
  size?: ButtonProps["size"];
  tone?: ButtonProps["tone"];
  variant?: ButtonProps["variant"];
}
