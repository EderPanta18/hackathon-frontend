// src/ui/primitives/button/button.types.ts

import type { ComponentPropsWithoutRef } from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg";

export type ButtonTone = "primary" | "secondary" | "neutral" | "destructive";

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link";

export type ButtonType = "button" | "submit" | "reset";

export interface ButtonClassNames {
  content?: string;
  loader?: string;
  dot?: string;
}

type NativeButtonProps = Omit<ComponentPropsWithoutRef<"button">, "type" | "color">;

export interface ButtonProps extends NativeButtonProps {
  size?: ButtonSize;
  tone?: ButtonTone;
  variant?: ButtonVariant;
  pending?: boolean;
  announceLabel?: string;
  asChild?: boolean;
  type?: ButtonType;
  classNames?: ButtonClassNames;
}
