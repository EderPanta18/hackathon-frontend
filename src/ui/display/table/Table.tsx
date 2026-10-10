// src/ui/display/table/Table.tsx

import { cn } from "@/lib/styling";
import { TABLE_BODY_DEFAULTS } from "./table.constants";
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "./table.types";

const Table = ({ containerClassName, className, ...props }: TableProps) => (
  <div
    data-slot="table-container"
    className={cn("relative size-full overflow-auto", containerClassName)}
  >
    <table
      data-slot="table"
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({
  hoverable = TABLE_BODY_DEFAULTS.hoverable,
  className,
  ...props
}: TableBodyProps) => (
  <tbody
    data-slot="table-body"
    className={cn(
      "[&_tr:last-child]:border-0",
      !hoverable && "[&_[data-slot=table-row]:not([data-state=selected])]:hover:bg-transparent",
      className,
    )}
    {...props}
  />
);

const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    data-slot="table-footer"
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
);

const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    data-slot="table-row"
    className={cn(
      "border-b transition-colors",
      "in-[tbody]:hover:bg-muted/50",
      "has-aria-expanded:bg-muted/50",
      "data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: TableHeadProps) => (
  <th
    data-slot="table-head"
    className={cn(
      "h-10 px-2 text-left align-middle",
      "font-medium whitespace-nowrap text-foreground",
      "[&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    data-slot="table-cell"
    className={cn("p-2 align-middle whitespace-nowrap", "[&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);

const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption
    data-slot="table-caption"
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
);

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
