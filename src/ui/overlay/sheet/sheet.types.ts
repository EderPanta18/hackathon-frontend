// src/ui/overlay/sheet/sheet.types.ts

import type { Dialog as SheetPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type SheetSide = "top" | "right" | "bottom" | "left";

export interface SheetProps extends ComponentProps<typeof SheetPrimitive.Root> {}

export interface SheetTriggerProps extends ComponentProps<typeof SheetPrimitive.Trigger> {}

export interface SheetCloseProps extends ComponentProps<typeof SheetPrimitive.Close> {}

export interface SheetPortalProps extends ComponentProps<typeof SheetPrimitive.Portal> {}

export interface SheetOverlayProps extends ComponentProps<typeof SheetPrimitive.Overlay> {}

type NativeSheetContentProps = ComponentProps<typeof SheetPrimitive.Content>;

export interface SheetContentProps extends NativeSheetContentProps {
  side?: SheetSide;
  showCloseButton?: boolean;
}

export interface SheetHeaderProps extends ComponentProps<"div"> {}

export interface SheetFooterProps extends ComponentProps<"div"> {}

export interface SheetTitleProps extends ComponentProps<typeof SheetPrimitive.Title> {}

export interface SheetDescriptionProps extends ComponentProps<typeof SheetPrimitive.Description> {}
