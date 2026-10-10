// src/ui/navigation/sidebar/menu-sub/MenuSub.tsx

import { Slot } from "radix-ui";
import { cn } from "@/lib/styling";
import { SIDEBAR_MENU_SUB_BUTTON_DEFAULTS } from "./menu-sub.constants";
import type {
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
} from "./menu-sub.types";
import { sidebarMenuSubButtonVariants } from "./menu-sub.variants";

const SidebarMenuSub = ({ className, ...props }: SidebarMenuSubProps) => (
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1",
      "border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
);

const SidebarMenuSubItem = ({ className, ...props }: SidebarMenuSubItemProps) => (
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    className={cn("group/menu-sub-item relative", className)}
    {...props}
  />
);

const SidebarMenuSubButton = ({
  size = SIDEBAR_MENU_SUB_BUTTON_DEFAULTS.size,
  isActive = SIDEBAR_MENU_SUB_BUTTON_DEFAULTS.isActive,
  asChild,
  className,
  ...props
}: SidebarMenuSubButtonProps) => {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuSubButtonVariants({ size }), className)}
      {...props}
    />
  );
};

export { SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton };
