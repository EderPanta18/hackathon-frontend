// src/ui/navigation/sidebar/menu/menu.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const sidebarMenuButtonVariants = cva(
  [
    "peer/menu-button group/menu-button flex w-full items-center gap-2",
    "overflow-hidden rounded-md p-2 text-left text-sm",
    "ring-sidebar-ring outline-hidden",
    "transition-[width,height,padding]",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8",
    "group-data-[collapsible=icon]:size-8!",
    "group-data-[collapsible=icon]:p-2!",
    "group-data-[collapsible=icon]:justify-center",
    "group-data-[collapsible=icon]:gap-0",
    "group-data-[collapsible=icon]:[&>span]:hidden",
    "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
    "focus-visible:ring-2",
    "active:bg-sidebar-accent/50 active:text-sidebar-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-open:hover:bg-sidebar-accent/50 data-open:hover:text-sidebar-accent-foreground",
    "data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground",
    "data-active:hover:bg-sidebar-accent",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    "[&>span:last-child]:truncate",
  ].join(" "),
  {
    variants: {
      variant: {
        ghost: "",
        outline: [
          "bg-background",
          "shadow-[0_0_0_1px_hsl(var(--sidebar-border))]",
          "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          "hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
        ].join(" "),
      },
      size: {
        sm: "h-7 text-xs",
        md: "h-8 text-sm",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;
