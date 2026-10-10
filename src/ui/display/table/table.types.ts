// src/ui/display/table/table.types.ts

import type { ComponentProps } from "react";

export interface TableProps extends ComponentProps<"table"> {
  containerClassName?: string;
}

export interface TableHeaderProps extends ComponentProps<"thead"> {}

export interface TableBodyProps extends ComponentProps<"tbody"> {
  hoverable?: boolean;
}

export interface TableFooterProps extends ComponentProps<"tfoot"> {}

export interface TableRowProps extends ComponentProps<"tr"> {}

export interface TableHeadProps extends ComponentProps<"th"> {}

export interface TableCellProps extends ComponentProps<"td"> {}

export interface TableCaptionProps extends ComponentProps<"caption"> {}
