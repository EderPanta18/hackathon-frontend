// src/ui/navigation/pagination/pagination.types.ts

import type { ComponentProps } from "react";
import type { ButtonProps } from "@/ui/primitives/button";

export interface PaginationProps extends ComponentProps<"nav"> {}

export interface PaginationContentProps extends ComponentProps<"ul"> {}

export interface PaginationItemProps extends ComponentProps<"li"> {}

export interface PaginationLinkProps extends ComponentProps<"a"> {
  isActive?: boolean;
  size?: ButtonProps["size"];
}

export interface PaginationPreviousProps extends PaginationLinkProps {
  text?: string;
}

export interface PaginationNextProps extends PaginationLinkProps {
  text?: string;
}

export interface PaginationEllipsisProps extends ComponentProps<"span"> {}
