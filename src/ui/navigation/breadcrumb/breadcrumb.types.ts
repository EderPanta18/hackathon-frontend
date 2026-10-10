// src/ui/navigation/breadcrumb/breadcrumb.types.ts

import type { ComponentProps } from "react";

export interface BreadcrumbProps extends ComponentProps<"nav"> {}

export interface BreadcrumbListProps extends ComponentProps<"ol"> {}

export interface BreadcrumbItemProps extends ComponentProps<"li"> {}

export interface BreadcrumbLinkProps extends ComponentProps<"a"> {
  asChild?: boolean;
}

export interface BreadcrumbPageProps extends ComponentProps<"span"> {}

export interface BreadcrumbSeparatorProps extends ComponentProps<"li"> {}

export interface BreadcrumbEllipsisProps extends ComponentProps<"span"> {}
