// src/ui/navigation/sidebar/group/Group.tsx

import { Slot } from "radix-ui";
import { cn } from "@/lib/styling";
import type {
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
} from "./group.types";

const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
    {...props}
  />
);

const SidebarGroupLabel = ({ asChild, className, ...props }: SidebarGroupLabelProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2",
        "text-xs font-medium text-sidebar-foreground/70",
        "ring-sidebar-ring outline-hidden",
        "transition-[margin,opacity] duration-200 ease-linear",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        "focus-visible:ring-2",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroupAction = ({ asChild, className, ...props }: SidebarGroupActionProps) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center",
        "rounded-md p-0 text-sidebar-foreground",
        "ring-sidebar-ring outline-hidden transition-transform",
        "group-data-[collapsible=icon]:hidden",
        "after:absolute after:-inset-2 md:after:hidden",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:ring-2",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroupContent = ({ className, ...props }: SidebarGroupContentProps) => (
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
);

export { SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent };
