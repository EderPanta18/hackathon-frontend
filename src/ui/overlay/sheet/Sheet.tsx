// src/ui/overlay/sheet/Sheet.tsx

"use client";

import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { Button } from "@/ui/primitives/button";
import { SHEET_CONTENT_DEFAULTS } from "./sheet.constants";
import type {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetPortalProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps,
} from "./sheet.types";
import { sheetContentVariants } from "./sheet.variants";

const Sheet = ({ ...props }: SheetProps) => <SheetPrimitive.Root data-slot="sheet" {...props} />;

const SheetTrigger = ({ ...props }: SheetTriggerProps) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);

const SheetClose = ({ ...props }: SheetCloseProps) => (
  <SheetPrimitive.Close data-slot="sheet-close" {...props} />
);

const SheetPortal = ({ ...props }: SheetPortalProps) => (
  <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
);

const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => (
  <SheetPrimitive.Overlay
    data-slot="sheet-overlay"
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

const SheetContent = ({
  side = SHEET_CONTENT_DEFAULTS.side,
  showCloseButton = SHEET_CONTENT_DEFAULTS.showCloseButton,
  className,
  children,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      data-slot="sheet-content"
      data-side={side}
      className={cn(sheetContentVariants({ side }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <SheetPrimitive.Close data-slot="sheet-close" asChild>
          <Button variant="ghost" tone="neutral" size="icon-sm" className="absolute top-3 right-3">
            <XIcon />
            <span className="sr-only">Cerrar</span>
          </Button>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </SheetPortal>
);

const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div data-slot="sheet-header" className={cn("flex flex-col gap-0.5 p-4", className)} {...props} />
);

const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    data-slot="sheet-footer"
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);

const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    data-slot="sheet-title"
    className={cn("font-heading text-base font-medium text-foreground", className)}
    {...props}
  />
);

const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => (
  <SheetPrimitive.Description
    data-slot="sheet-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
