// src/ui/navigation/sidebar/menu-sub/menu-sub.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const sidebarMenuSubButtonVariants = cva(
  [
    "flex h-7 min-w-0 -translate-x-px items-center gap-2",
    "overflow-hidden rounded-md px-2",
    "text-sidebar-foreground ring-sidebar-ring outline-hidden",
    "group-data-[collapsible=icon]:hidden",
    "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
    "focus-visible:ring-2",
    "active:bg-sidebar-accent/50 active:text-sidebar-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground",
    "data-active:hover:bg-sidebar-accent",
    "[&>span:last-child]:truncate",
    "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type SidebarMenuSubButtonVariants = VariantProps<typeof sidebarMenuSubButtonVariants>;
