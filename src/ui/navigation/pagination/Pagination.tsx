// src/ui/navigation/pagination/Pagination.tsx

import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/styling";
import { Button } from "@/ui/primitives/button";
import {
  PAGINATION_LINK_DEFAULTS,
  PAGINATION_NEXT_DEFAULTS,
  PAGINATION_PREVIOUS_DEFAULTS,
} from "./pagination.constants";
import type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps,
} from "./pagination.types";

const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    data-slot="pagination"
    aria-label="Paginación"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = ({ className, ...props }: PaginationContentProps) => (
  <ul
    data-slot="pagination-content"
    className={cn("flex items-center gap-0.5", className)}
    {...props}
  />
);

const PaginationItem = ({ ...props }: PaginationItemProps) => (
  <li data-slot="pagination-item" {...props} />
);

const PaginationLink = ({
  size = PAGINATION_LINK_DEFAULTS.size,
  isActive = PAGINATION_LINK_DEFAULTS.isActive,
  className,
  ...props
}: PaginationLinkProps) => (
  <Button
    asChild
    variant={isActive ? "outline" : "ghost"}
    tone="neutral"
    size={size}
    className={cn(className)}
  >
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    />
  </Button>
);

const PaginationPrevious = ({
  text = PAGINATION_PREVIOUS_DEFAULTS.text,
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Ir a la página anterior"
    size="md"
    className={cn("pl-1.5!", className)}
    {...props}
  >
    <ChevronLeftIcon data-icon="inline-start" />
    <span className="hidden sm:block">{text}</span>
  </PaginationLink>
);

const PaginationNext = ({
  text = PAGINATION_NEXT_DEFAULTS.text,
  className,
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label="Ir a la página siguiente"
    size="md"
    className={cn("pr-1.5!", className)}
    {...props}
  >
    <span className="hidden sm:block">{text}</span>
    <ChevronRightIcon data-icon="inline-end" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }: PaginationEllipsisProps) => (
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn(
      "flex size-8 items-center justify-center",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    <MoreHorizontalIcon />
    <span className="sr-only">Más páginas</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
