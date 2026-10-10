// src/ui/overlay/alert-dialog/AlertDialog.tsx

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { Button } from "@/ui/primitives/button";
import {
  ALERT_DIALOG_ACTION_DEFAULTS,
  ALERT_DIALOG_CANCEL_DEFAULTS,
  ALERT_DIALOG_CONTENT_DEFAULTS,
} from "./alert-dialog.constants";
import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogMediaProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from "./alert-dialog.types";

const AlertDialog = ({ ...props }: AlertDialogProps) => (
  <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
);

const AlertDialogTrigger = ({ ...props }: AlertDialogTriggerProps) => (
  <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
);

const AlertDialogPortal = ({ ...props }: AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
);

const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => (
  <AlertDialogPrimitive.Overlay
    data-slot="alert-dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/10 duration-100",
      "supports-backdrop-filter:backdrop-blur-xs",
      "data-open:animate-in data-open:fade-in-0",
      "data-closed:animate-out data-closed:fade-out-0",
      className,
    )}
    {...props}
  />
);

const AlertDialogContent = ({
  size = ALERT_DIALOG_CONTENT_DEFAULTS.size,
  className,
  ...props
}: AlertDialogContentProps) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      data-slot="alert-dialog-content"
      data-size={size}
      className={cn(
        "group/alert-dialog-content",
        "fixed top-1/2 left-1/2 z-50 grid w-full",
        "-translate-x-1/2 -translate-y-1/2 gap-4",
        "rounded-xl bg-popover p-4 text-popover-foreground",
        "ring-1 ring-foreground/10 duration-100 outline-none",
        "data-[size=md]:max-w-xs data-[size=sm]:max-w-xs",
        "data-[size=md]:sm:max-w-sm",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
);

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
  <div
    data-slot="alert-dialog-header"
    className={cn(
      "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center",
      "has-data-[slot=alert-dialog-media]:grid-cols-[auto_1fr]",
      "has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
      "has-data-[slot=alert-dialog-media]:place-items-start",
      "has-data-[slot=alert-dialog-media]:text-left",
      "has-data-[slot=alert-dialog-media]:gap-x-4",
      "sm:group-data-[size=md]/alert-dialog-content:place-items-start",
      "sm:group-data-[size=md]/alert-dialog-content:text-left",
      className,
    )}
    {...props}
  />
);

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <div
    data-slot="alert-dialog-footer"
    className={cn(
      "-mx-4 -mb-4 flex flex-col-reverse gap-2",
      "rounded-b-xl border-t bg-muted/50 p-4",
      "group-data-[size=sm]/alert-dialog-content:grid",
      "group-data-[size=sm]/alert-dialog-content:grid-cols-2",
      "sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

const AlertDialogMedia = ({ className, ...props }: AlertDialogMediaProps) => (
  <div
    data-slot="alert-dialog-media"
    className={cn(
      "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted",
      "row-span-2 mb-0",
      "*:[svg:not([class*='size-'])]:size-6",
      className,
    )}
    {...props}
  />
);

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <AlertDialogPrimitive.Title
    data-slot="alert-dialog-title"
    className={cn(
      "font-heading text-base font-medium",
      "group-has-data-[slot=alert-dialog-media]/alert-dialog-header:col-start-2",
      className,
    )}
    {...props}
  />
);

const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => (
  <AlertDialogPrimitive.Description
    data-slot="alert-dialog-description"
    className={cn(
      "text-sm text-muted-foreground text-balance md:text-pretty",
      "group-has-data-[slot=alert-dialog-media]/alert-dialog-header:col-start-2",
      "*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
      className,
    )}
    {...props}
  />
);

const AlertDialogAction = ({
  size = ALERT_DIALOG_ACTION_DEFAULTS.size,
  tone = ALERT_DIALOG_ACTION_DEFAULTS.tone,
  variant = ALERT_DIALOG_ACTION_DEFAULTS.variant,
  pending = ALERT_DIALOG_ACTION_DEFAULTS.pending,
  announceLabel = ALERT_DIALOG_ACTION_DEFAULTS.announceLabel,
  className,
  ...props
}: AlertDialogActionProps) => (
  <Button
    variant={variant}
    tone={tone}
    size={size}
    pending={pending}
    announceLabel={announceLabel}
    asChild
  >
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  </Button>
);

const AlertDialogCancel = ({
  size = ALERT_DIALOG_CANCEL_DEFAULTS.size,
  tone = ALERT_DIALOG_CANCEL_DEFAULTS.tone,
  variant = ALERT_DIALOG_CANCEL_DEFAULTS.variant,
  className,
  ...props
}: AlertDialogCancelProps) => (
  <Button variant={variant} tone={tone} size={size} asChild>
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      {...props}
    />
  </Button>
);

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
