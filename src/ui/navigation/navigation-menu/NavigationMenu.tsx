// src/ui/navigation/navigation-menu/NavigationMenu.tsx

import { ChevronDownIcon } from "lucide-react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { NAVIGATION_MENU_DEFAULTS } from "./navigation-menu.constants";
import type {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps,
} from "./navigation-menu.types";

const NavigationMenu = ({
  viewport = NAVIGATION_MENU_DEFAULTS.viewport,
  className,
  children,
  ...props
}: NavigationMenuProps) => (
  <NavigationMenuPrimitive.Root
    data-slot="navigation-menu"
    data-viewport={viewport}
    className={cn(
      "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    {viewport && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
);

const NavigationMenuList = ({ className, ...props }: NavigationMenuListProps) => (
  <NavigationMenuPrimitive.List
    data-slot="navigation-menu-list"
    className={cn("group flex flex-1 list-none items-center justify-center gap-0", className)}
    {...props}
  />
);

const NavigationMenuItem = ({ className, ...props }: NavigationMenuItemProps) => (
  <NavigationMenuPrimitive.Item
    data-slot="navigation-menu-item"
    className={cn("relative", className)}
    {...props}
  />
);

const NavigationMenuTrigger = ({ className, children, ...props }: NavigationMenuTriggerProps) => (
  <NavigationMenuPrimitive.Trigger
    data-slot="navigation-menu-trigger"
    className={cn(
      "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center",
      "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none",
      "hover:bg-muted focus:bg-muted",
      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted",
      "data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted",
      "group",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDownIcon
      aria-hidden="true"
      className={cn(
        "relative top-px ml-1 size-3 transition duration-300",
        "group-data-popup-open/navigation-menu-trigger:rotate-180",
        "group-data-open/navigation-menu-trigger:rotate-180",
      )}
    />
  </NavigationMenuPrimitive.Trigger>
);

const NavigationMenuContent = ({ className, ...props }: NavigationMenuContentProps) => (
  <NavigationMenuPrimitive.Content
    data-slot="navigation-menu-content"
    className={cn(
      "top-0 left-0 w-full p-1",
      "ease-[cubic-bezier(0.22,1,0.36,1)]",
      // sin viewport
      "group-data-[viewport=false]/navigation-menu:top-full",
      "group-data-[viewport=false]/navigation-menu:mt-1.5",
      "group-data-[viewport=false]/navigation-menu:overflow-hidden",
      "group-data-[viewport=false]/navigation-menu:rounded-lg",
      "group-data-[viewport=false]/navigation-menu:bg-popover",
      "group-data-[viewport=false]/navigation-menu:text-popover-foreground",
      "group-data-[viewport=false]/navigation-menu:shadow",
      "group-data-[viewport=false]/navigation-menu:ring-1",
      "group-data-[viewport=false]/navigation-menu:ring-foreground/10",
      "group-data-[viewport=false]/navigation-menu:duration-300",
      // animaciones sin viewport
      "group-data-[viewport=false]/navigation-menu:data-open:animate-in",
      "group-data-[viewport=false]/navigation-menu:data-open:fade-in-0",
      "group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95",
      "group-data-[viewport=false]/navigation-menu:data-closed:animate-out",
      "group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0",
      "group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",
      // motion slides
      "data-[motion=from-end]:slide-in-from-right-52",
      "data-[motion=from-start]:slide-in-from-left-52",
      "data-[motion=to-end]:slide-out-to-right-52",
      "data-[motion=to-start]:slide-out-to-left-52",
      "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in",
      "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
      // link focus override
      "**:data-[slot=navigation-menu-link]:focus:ring-0",
      "**:data-[slot=navigation-menu-link]:focus:outline-none",
      "md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
);

const NavigationMenuViewport = ({ className, ...props }: NavigationMenuViewportProps) => (
  <div className="absolute top-full left-0 isolate z-50 flex justify-center">
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className={cn(
        "origin-top-center relative mt-1.5 overflow-hidden rounded-lg",
        "h-(--radix-navigation-menu-viewport-height) w-full",
        "md:w-(--radix-navigation-menu-viewport-width)",
        "bg-popover text-popover-foreground",
        "shadow ring-1 ring-foreground/10 duration-100",
        "data-open:animate-in data-open:zoom-in-90",
        "data-closed:animate-out data-closed:zoom-out-90",
        className,
      )}
      {...props}
    />
  </div>
);

const NavigationMenuLink = ({ className, ...props }: NavigationMenuLinkProps) => (
  <NavigationMenuPrimitive.Link
    data-slot="navigation-menu-link"
    className={cn(
      "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none",
      "hover:bg-muted focus:bg-muted",
      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1",
      "in-data-[slot=navigation-menu-content]:rounded-md",
      "data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  />
);

const NavigationMenuIndicator = ({ className, ...props }: NavigationMenuIndicatorProps) => (
  <NavigationMenuPrimitive.Indicator
    data-slot="navigation-menu-indicator"
    className={cn(
      "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
      "data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
      "data-[state=visible]:animate-in data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
);

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuLink,
  NavigationMenuIndicator,
};
