// src/ui/overlay/dialog/Dialog.tsx

import { FocusScope } from "@radix-ui/react-focus-scope";
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { Button } from "@/ui/primitives/button";
import { DIALOG_CONTENT_DEFAULTS, DIALOG_FOOTER_DEFAULTS } from "./dialog.constants";
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./dialog.types";

const Dialog = ({ ...props }: DialogProps) => (
  <DialogPrimitive.Root data-slot="dialog" modal={false} {...props} />
);

const DialogTrigger = ({ ...props }: DialogTriggerProps) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

const DialogPortal = ({ ...props }: DialogPortalProps) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

const DialogClose = ({ ...props }: DialogCloseProps) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

const DialogContent = ({
  showCloseButton = DIALOG_CONTENT_DEFAULTS.showCloseButton,
  closeOnInteractOutside = DIALOG_CONTENT_DEFAULTS.closeOnInteractOutside,
  closeOnEscapeKeyDown = DIALOG_CONTENT_DEFAULTS.closeOnEscapeKeyDown,
  preventClose = DIALOG_CONTENT_DEFAULTS.preventClose,
  onEscapeKeyDown,
  onInteractOutside,
  className,
  children,
  ...props
}: DialogContentProps) => {
  const hasOpenCombobox = () =>
    Boolean(document.querySelector('[data-slot="combobox-content"][data-open]'));

  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    if (hasOpenCombobox()) {
      e.preventDefault();

      return;
    }

    if (preventClose || !closeOnEscapeKeyDown) {
      e.preventDefault();

      return;
    }

    onEscapeKeyDown?.(e);
  };

  const handleInteractOutside = (
    e: Parameters<NonNullable<DialogContentProps["onInteractOutside"]>>[0],
  ) => {
    if (preventClose || !closeOnInteractOutside) {
      e.preventDefault();

      return;
    }

    onInteractOutside?.(e);
  };

  return (
    <DialogPortal>
      <div
        data-slot="dialog-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-black/30",
          "supports-backdrop-filter:backdrop-blur-xs",
          "animate-in fade-in-0 duration-100",
        )}
        aria-hidden="true"
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        onEscapeKeyDown={handleEscapeKeyDown}
        onInteractOutside={handleInteractOutside}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex flex-col",
          "-translate-x-1/2 -translate-y-1/2",
          "max-h-[90dvh] w-[min(100vw-2rem,48rem)] sm:w-[min(100vw-3rem,56rem)]",
          "rounded-xl bg-popover p-4",
          "text-sm text-popover-foreground",
          "ring-1 ring-foreground/10 duration-100 outline-none",
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      >
        <FocusScope loop className="contents">
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close data-slot="dialog-close" asChild>
              <Button
                variant="ghost"
                tone="neutral"
                size="icon-sm"
                className="absolute top-2 right-2"
                disabled={preventClose}
              >
                <XIcon />
                <span className="sr-only">Cerrar</span>
              </Button>
            </DialogPrimitive.Close>
          )}
        </FocusScope>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div data-slot="dialog-header" className={cn("flex flex-col gap-2 mb-4", className)} {...props} />
);

const DialogFooter = ({
  showCloseButton = DIALOG_FOOTER_DEFAULTS.showCloseButton,
  className,
  children,
  ...props
}: DialogFooterProps) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      "-mx-4 -mb-4 mt-4 flex flex-col-reverse gap-2",
      "rounded-b-xl border-t bg-muted/50 p-4",
      "sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  >
    {children}
    {showCloseButton && (
      <DialogPrimitive.Close asChild>
        <Button tone="neutral" variant="outline">
          Cerrar
        </Button>
      </DialogPrimitive.Close>
    )}
  </div>
);

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn("font-heading text-base font-medium leading-none", className)}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn(
      "text-sm text-muted-foreground",
      "*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
      className,
    )}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
