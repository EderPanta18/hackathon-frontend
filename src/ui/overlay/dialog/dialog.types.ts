// src/ui/overlay/dialog/dialog.types.ts

import type { Dialog as DialogPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface DialogProps extends Omit<ComponentProps<typeof DialogPrimitive.Root>, "modal"> {}

export interface DialogTriggerProps extends ComponentProps<typeof DialogPrimitive.Trigger> {}

export interface DialogPortalProps extends ComponentProps<typeof DialogPrimitive.Portal> {}

export interface DialogCloseProps extends ComponentProps<typeof DialogPrimitive.Close> {}

export interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
  closeOnInteractOutside?: boolean;
  closeOnEscapeKeyDown?: boolean;
  preventClose?: boolean;
}

export interface DialogHeaderProps extends ComponentProps<"div"> {}

export interface DialogFooterProps extends ComponentProps<"div"> {
  showCloseButton?: boolean;
}

export interface DialogTitleProps extends ComponentProps<typeof DialogPrimitive.Title> {}

export interface DialogDescriptionProps
  extends ComponentProps<typeof DialogPrimitive.Description> {}
