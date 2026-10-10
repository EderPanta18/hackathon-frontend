// src/ui/navigation/sidebar/root/Root.tsx

"use client";

import { PanelLeftIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/styling";
import { Input } from "@/ui/form/input";
import { Sheet } from "@/ui/overlay/sheet";
import { Button, Separator } from "@/ui/primitives";
import { SIDEBAR_WIDTH_MOBILE } from "../sidebar.constants";
import { useSidebar } from "../sidebar.context";
import { SIDEBAR_DEFAULTS } from "./root.constants";
import type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarInputProps,
  SidebarInsetProps,
  SidebarProps,
  SidebarRailProps,
  SidebarSeparatorProps,
  SidebarTriggerProps,
} from "./root.types";
import { sidebarContainerVariants, sidebarGapVariants } from "./root.variants";

const Sidebar = ({
  side = SIDEBAR_DEFAULTS.side,
  variant = SIDEBAR_DEFAULTS.variant,
  collapsible = SIDEBAR_DEFAULTS.collapsible,
  dir,
  className,
  children,
  ...props
}: SidebarProps) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none")
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col",
          "bg-sidebar text-sidebar-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );

  if (isMobile)
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <Sheet.Content
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          side={side}
          showCloseButton={false}
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as CSSProperties}
        >
          <Sheet.Header className="sr-only">
            <Sheet.Title>Barra lateral</Sheet.Title>
            <Sheet.Description>Barra lateral para teléfonos móviles.</Sheet.Description>
          </Sheet.Header>
          <div className="flex h-full w-full flex-col">{children}</div>
        </Sheet.Content>
      </Sheet>
    );

  return (
    <div
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      className="group peer hidden text-sidebar-foreground md:block"
    >
      <div data-slot="sidebar-gap" className={sidebarGapVariants({ variant })} />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(sidebarContainerVariants({ variant }), className)}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            "flex size-full flex-col bg-sidebar",
            "group-data-[variant=floating]:rounded-lg",
            "group-data-[variant=floating]:shadow-sm",
            "group-data-[variant=floating]:ring-1",
            "group-data-[variant=floating]:ring-sidebar-border",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const SidebarTrigger = ({ onClick, className, ...props }: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      tone="neutral"
      size="icon-sm"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Alternar barra lateral</span>
    </Button>
  );
};

const SidebarRail = ({ className, ...props }: SidebarRailProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Alternar barra lateral"
      title="Alternar barra lateral"
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        "absolute inset-y-0 z-20 hidden w-2.5 transition-all ease-linear",
        "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
        "after:absolute after:inset-y-0 after:inset-s-1/2 after:w-0.5",
        "hover:after:bg-sidebar-border sm:flex",
        "ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize",
        "[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0",
        "group-data-[collapsible=offcanvas]:after:left-full",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
};

const SidebarContent = ({ className, ...props }: SidebarContentProps) => (
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    className={cn(
      "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto",
      "group-data-[collapsible=icon]:overflow-hidden",
      className,
    )}
    {...props}
  />
);

const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => (
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
);

const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
);

const SidebarSeparator = ({ className, ...props }: SidebarSeparatorProps) => (
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    className={cn("mx-2 w-auto bg-sidebar-border", className)}
    {...props}
  />
);

const SidebarInset = ({ className, ...props }: SidebarInsetProps) => (
  <main
    data-slot="sidebar-inset"
    className={cn(
      "relative flex flex-col w-full flex-1 min-h-0 bg-background",
      "md:peer-data-[variant=inset]:m-2",
      "md:peer-data-[variant=inset]:ml-0",
      "md:peer-data-[variant=inset]:rounded-xl",
      "md:peer-data-[variant=inset]:shadow-sm",
      "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
      className,
    )}
    {...props}
  />
);

const SidebarInput = ({ className, ...props }: SidebarInputProps) => (
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    className={cn("h-8 w-full bg-background shadow-none", className)}
    {...props}
  />
);

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarInset,
  SidebarInput,
  SidebarTrigger,
  SidebarRail,
};
