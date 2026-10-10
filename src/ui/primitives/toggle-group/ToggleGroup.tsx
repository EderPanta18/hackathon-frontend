// src/ui/primitives/toggle-group/ToggleGroup.tsx

"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { createContext, useContext } from "react";
import { cn } from "@/lib/styling";
import { toggleVariants } from "@/ui/primitives/toggle";
import {
  TOGGLE_GROUP_CONTEXT_DEFAULTS,
  TOGGLE_GROUP_DEFAULTS,
  TOGGLE_GROUP_ITEM_DEFAULTS,
} from "./toggle-group.constants";
import type {
  ToggleGroupContextValues,
  ToggleGroupItemProps,
  ToggleGroupProps,
} from "./toggle-group.types";

const ToggleGroupContext = createContext<ToggleGroupContextValues>(TOGGLE_GROUP_CONTEXT_DEFAULTS);

const ToggleGroup = ({
  size = TOGGLE_GROUP_DEFAULTS.size,
  variant = TOGGLE_GROUP_DEFAULTS.variant,
  orientation = TOGGLE_GROUP_DEFAULTS.orientation,
  spacing = TOGGLE_GROUP_DEFAULTS.spacing,
  className,
  children,
  ...props
}: ToggleGroupProps) => (
  <ToggleGroupPrimitive.Root
    data-slot="toggle-group"
    data-variant={variant}
    data-size={size}
    data-spacing={spacing}
    data-orientation={orientation}
    style={{ "--gap": spacing } as React.CSSProperties}
    className={cn(
      "group/toggle-group flex w-fit flex-row items-center",
      "gap-[--spacing(var(--gap))] rounded-lg",
      "data-[size=sm]:rounded-[min(var(--radius-md),10px)]",
      "data-vertical:flex-col data-vertical:items-stretch",
      className,
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
);

const ToggleGroupItem = ({
  size = TOGGLE_GROUP_ITEM_DEFAULTS.size,
  variant = TOGGLE_GROUP_ITEM_DEFAULTS.variant,
  className,
  children,
  ...props
}: ToggleGroupItemProps) => {
  const context = useContext(ToggleGroupContext);

  const resolvedVariant = context.variant ?? variant;
  const resolvedSize = context.size ?? size;

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 focus:z-10 focus-visible:z-10",
        // spacing=0: quitar radius y padding propio, hereda del grupo
        "group-data-[spacing=0]/toggle-group:rounded-none",
        "group-data-[spacing=0]/toggle-group:px-2",
        "group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5",
        "group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5",
        // spacing=0 horizontal: radius en extremos
        "group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg",
        "group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg",
        // spacing=0 vertical: radius en extremos
        "group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg",
        "group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg",
        // spacing=0 outline horizontal: colapsar bordes
        "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0",
        "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l",
        // spacing=0 outline vertical: colapsar bordes
        "group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0",
        "group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({ variant: resolvedVariant, size: resolvedSize }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
};

export { ToggleGroup, ToggleGroupItem };
