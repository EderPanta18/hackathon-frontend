// src/ui/feedback/alert/alert.types.ts

import type { ComponentProps } from "react";

export type AlertTone = "neutral" | "information" | "success" | "warning" | "destructive";

export type AlertVariant = "solid" | "soft";

export interface AlertProps extends ComponentProps<"div"> {
  tone?: AlertTone;
  variant?: AlertVariant;
}

export interface AlertTitleProps extends ComponentProps<"div"> {}

export interface AlertDescriptionProps extends ComponentProps<"div"> {}

export interface AlertActionProps extends ComponentProps<"div"> {}
