// src/ui/overlay/dropdown-menu/DropdownMenu.tsx

import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import {
  DROPDOWN_MENU_CONTENT_DEFAULTS,
  DROPDOWN_MENU_ITEM_DEFAULTS,
} from "./dropdown-menu.constants";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from "./dropdown-menu.types";
import { dropdownMenuItemVariants } from "./dropdown-menu.variants";

const DropdownMenu = ({ ...props }: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
);

const DropdownMenuPortal = ({ ...props }: DropdownMenuPortalProps) => (
  <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
);

const DropdownMenuTrigger = ({ ...props }: DropdownMenuTriggerProps) => (
  <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
);

const DropdownMenuContent = ({
  align = DROPDOWN_MENU_CONTENT_DEFAULTS.align,
  sideOffset = DROPDOWN_MENU_CONTENT_DEFAULTS.sideOffset,
  className,
  ...props
}: DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "z-50 overflow-x-hidden overflow-y-auto rounded-lg",
        "max-h-(--radix-dropdown-menu-content-available-height)",
        "w-(--radix-dropdown-menu-trigger-width) min-w-32",
        "origin-(--radix-dropdown-menu-content-transform-origin)",
        "bg-popover p-1 text-popover-foreground",
        "shadow-md ring-1 ring-foreground/10 duration-100",
        "data-[state=closed]:overflow-hidden",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

const DropdownMenuGroup = ({ ...props }: DropdownMenuGroupProps) => (
  <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
);

const DropdownMenuItem = ({
  variant = DROPDOWN_MENU_ITEM_DEFAULTS.variant,
  inset,
  className,
  ...props
}: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    data-slot="dropdown-menu-item"
    data-inset={inset}
    data-variant={variant}
    className={cn(dropdownMenuItemVariants({ variant }), className)}
    {...props}
  />
);

const DropdownMenuCheckboxItem = ({
  checked,
  inset,
  className,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) => (
  <DropdownMenuPrimitive.CheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    data-inset={inset}
    className={cn(
      "relative flex cursor-default items-center gap-1.5 rounded-md",
      "py-1 pr-8 pl-1.5 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
      "data-inset:pl-7",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span
      data-slot="dropdown-menu-checkbox-item-indicator"
      className="pointer-events-none absolute right-2 flex items-center justify-center"
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioGroup = ({ ...props }: DropdownMenuRadioGroupProps) => (
  <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
);

const DropdownMenuRadioItem = ({
  inset,
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) => (
  <DropdownMenuPrimitive.RadioItem
    data-slot="dropdown-menu-radio-item"
    data-inset={inset}
    className={cn(
      "relative flex cursor-default items-center gap-1.5 rounded-md",
      "py-1 pr-8 pl-1.5 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
      "data-inset:pl-7",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    <span
      data-slot="dropdown-menu-radio-item-indicator"
      className="pointer-events-none absolute right-2 flex items-center justify-center"
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

const DropdownMenuLabel = ({ inset, className, ...props }: DropdownMenuLabelProps) => (
  <DropdownMenuPrimitive.Label
    data-slot="dropdown-menu-label"
    data-inset={inset}
    className={cn(
      "px-1.5 py-1 text-xs font-medium text-muted-foreground",
      "data-inset:pl-7",
      className,
    )}
    {...props}
  />
);

const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => (
  <DropdownMenuPrimitive.Separator
    data-slot="dropdown-menu-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);

const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => (
  <span
    data-slot="dropdown-menu-shortcut"
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      "group-focus/dropdown-menu-item:text-accent-foreground",
      className,
    )}
    {...props}
  />
);

const DropdownMenuSub = ({ ...props }: DropdownMenuSubProps) => (
  <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
);

const DropdownMenuSubTrigger = ({
  inset,
  className,
  children,
  ...props
}: DropdownMenuSubTriggerProps) => (
  <DropdownMenuPrimitive.SubTrigger
    data-slot="dropdown-menu-sub-trigger"
    data-inset={inset}
    className={cn(
      "flex cursor-default items-center gap-1.5 rounded-md",
      "px-1.5 py-1 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground",
      "not-data-[variant=destructive]:focus:**:text-accent-foreground",
      "data-inset:pl-7",
      "data-open:bg-accent data-open:text-accent-foreground",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
);

const DropdownMenuSubContent = ({ className, ...props }: DropdownMenuSubContentProps) => (
  <DropdownMenuPrimitive.SubContent
    data-slot="dropdown-menu-sub-content"
    className={cn(
      "z-50 min-w-24 overflow-hidden rounded-lg",
      "origin-(--radix-dropdown-menu-content-transform-origin)",
      "bg-popover p-1 text-popover-foreground",
      "shadow-lg ring-1 ring-foreground/10 duration-100",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
      "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
      className,
    )}
    {...props}
  />
);

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
