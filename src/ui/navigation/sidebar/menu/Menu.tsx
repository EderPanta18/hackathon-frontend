// src/ui/navigation/sidebar/menu/Menu.tsx

"use client";

import { Slot } from "radix-ui";
import { type CSSProperties, useEffect, useState } from "react";
import { cn } from "@/lib/styling";
import { Skeleton } from "@/ui/loaders/skeleton";
import { Tooltip } from "@/ui/overlay/tooltip";
import { useSidebar } from "../sidebar.context";
import {
  SIDEBAR_MENU_ACTION_DEFAULTS,
  SIDEBAR_MENU_BUTTON_DEFAULTS,
  SIDEBAR_MENU_SKELETON_DEFAULTS,
} from "./menu.constants";
import { getMenuSkeletonRandomWidth } from "./menu.helpers";
import type {
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarMenuSkeletonProps,
} from "./menu.types";
import { sidebarMenuButtonVariants } from "./menu.variants";

const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => (
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-0", className)}
    {...props}
  />
);

const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => (
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
);

const SidebarMenuButton = ({
  size = SIDEBAR_MENU_BUTTON_DEFAULTS.size,
  variant = SIDEBAR_MENU_BUTTON_DEFAULTS.variant,
  isActive = SIDEBAR_MENU_BUTTON_DEFAULTS.isActive,
  tooltip,
  asChild,
  className,
  ...props
}: SidebarMenuButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";

  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  const tooltipProps = typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
      <Tooltip.Content
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
};

const SidebarMenuAction = ({
  showOnHover = SIDEBAR_MENU_ACTION_DEFAULTS.showOnHover,
  asChild,
  className,
  ...props
}: SidebarMenuActionProps) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center",
        "rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden",
        "transition-transform group-data-[collapsible=icon]:hidden",
        "peer-hover/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=md]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "after:absolute after:-inset-2 md:after:hidden",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:ring-2",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        showOnHover && [
          "group-focus-within/menu-item:opacity-100",
          "group-hover/menu-item:opacity-100",
          "peer-data-active/menu-button:text-sidebar-accent-foreground",
          "aria-expanded:opacity-100",
          "md:opacity-0",
        ],
        className,
      )}
      {...props}
    />
  );
};

const SidebarMenuBadge = ({ className, ...props }: SidebarMenuBadgeProps) => (
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center",
      "rounded-md px-1 text-xs font-medium tabular-nums select-none",
      "text-sidebar-foreground group-data-[collapsible=icon]:hidden",
      "peer-hover/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=md]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "peer-data-active/menu-button:text-sidebar-accent-foreground",
      className,
    )}
    {...props}
  />
);

const SidebarMenuSkeleton = ({
  showIcon = SIDEBAR_MENU_SKELETON_DEFAULTS.showIcon,
  className,
  ...props
}: SidebarMenuSkeletonProps) => {
  const [width, setWidth] = useState<string>("70%");

  useEffect(() => {
    setWidth(getMenuSkeletonRandomWidth());
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{ "--skeleton-width": width } as CSSProperties}
      />
    </div>
  );
};

export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
};
