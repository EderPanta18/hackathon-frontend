// src/ui/navigation/tabs/Tabs.tsx

import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { TABS_DEFAULTS, TABS_LIST_DEFAULTS } from "./tabs.constants";
import type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "./tabs.types";
import { tabsListVariants } from "./tabs.variants";

const Tabs = ({ orientation = TABS_DEFAULTS.orientation, className, ...props }: TabsProps) => (
  <TabsPrimitive.Root
    data-slot="tabs"
    data-orientation={orientation}
    className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
    {...props}
  />
);

const TabsList = ({ variant = TABS_LIST_DEFAULTS.variant, className, ...props }: TabsListProps) => (
  <TabsPrimitive.List
    data-slot="tabs-list"
    data-variant={variant}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    data-slot="tabs-trigger"
    className={cn(
      // base
      "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center",
      "gap-1.5 rounded-md border border-transparent px-1.5 py-0.5",
      "text-sm font-medium whitespace-nowrap transition-all",
      "text-foreground/60 dark:text-muted-foreground",
      // vertical layout
      "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
      // hover
      "hover:text-foreground dark:hover:text-foreground",
      // focus
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
      "focus-visible:outline-1 focus-visible:outline-ring",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50",
      // icon slots
      "has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1",
      // svg
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4",
      // active — pill variant
      "group-data-[variant=pill]/tabs-list:data-active:shadow-sm",
      "data-active:bg-background data-active:text-foreground",
      "dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
      // active — line variant overrides
      "group-data-[variant=line]/tabs-list:bg-transparent",
      "group-data-[variant=line]/tabs-list:data-active:bg-transparent",
      "group-data-[variant=line]/tabs-list:data-active:shadow-none",
      "dark:group-data-[variant=line]/tabs-list:data-active:border-transparent",
      "dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
      // line indicator (::after)
      "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity",
      "group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.25 group-data-horizontal/tabs:after:h-0.5",
      "group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5",
      "group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
      className,
    )}
    {...props}
  />
);

const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content
    data-slot="tabs-content"
    className={cn("flex-1 text-sm outline-none", className)}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
