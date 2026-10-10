// src/ui/feedback/empty-state/empty-state.types.ts

import type { ComponentProps } from "react";

export type EmptyStateMediaVariant = "plain" | "icon";

export interface EmptyStateProps extends ComponentProps<"div"> {}

export interface EmptyStateHeaderProps extends ComponentProps<"div"> {}

export interface EmptyStateMediaProps extends ComponentProps<"div"> {
  variant?: EmptyStateMediaVariant;
}

export interface EmptyStateTitleProps extends ComponentProps<"div"> {}

export interface EmptyStateDescriptionProps extends ComponentProps<"p"> {}

export interface EmptyStateContentProps extends ComponentProps<"div"> {}

export interface EmptyStateActionsProps extends ComponentProps<"div"> {}
