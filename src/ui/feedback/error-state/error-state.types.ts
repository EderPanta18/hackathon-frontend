// src/ui/feedback/error-state/error-state.types.ts

import type { ComponentProps } from "react";

export type ErrorStateVariant = "soft" | "ghost";

export type ErrorStateMediaVariant = "plain" | "icon";

export interface ErrorStateProps extends ComponentProps<"div"> {
  variant?: ErrorStateVariant;
}

export interface ErrorStateHeaderProps extends ComponentProps<"div"> {}

export interface ErrorStateMediaProps extends ComponentProps<"div"> {
  variant?: ErrorStateMediaVariant;
}

export interface ErrorStateTitleProps extends ComponentProps<"div"> {}

export interface ErrorStateDescriptionProps extends ComponentProps<"p"> {}

export interface ErrorStateContentProps extends ComponentProps<"div"> {}

export interface ErrorStateActionsProps extends ComponentProps<"div"> {}
