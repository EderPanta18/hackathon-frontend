// src/ui/navigation/menubar/Menubar.tsx

import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { Menubar as MenubarPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { MENUBAR_CONTENT_DEFAULTS, MENUBAR_ITEM_DEFAULTS } from "./menubar.constants";
import type {
  MenubarCheckboxItemProps,
  MenubarContentProps,
  MenubarGroupProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarMenuProps,
  MenubarPortalProps,
  MenubarProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarSubContentProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarTriggerProps,
} from "./menubar.types";
import { menubarItemVariants } from "./menubar.variants";

const Menubar = ({ className, ...props }: MenubarProps) => (
  <MenubarPrimitive.Root
    data-slot="menubar"
    className={cn("flex h-8 items-center gap-0.5 rounded-lg border p-0.75", className)}
    {...props}
  />
);

const MenubarMenu = ({ ...props }: MenubarMenuProps) => (
  <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
);

const MenubarGroup = ({ ...props }: MenubarGroupProps) => (
  <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
);

const MenubarPortal = ({ ...props }: MenubarPortalProps) => (
  <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
);

const MenubarRadioGroup = ({ ...props }: MenubarRadioGroupProps) => (
  <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
);

const MenubarTrigger = ({ className, ...props }: MenubarTriggerProps) => (
  <MenubarPrimitive.Trigger
    data-slot="menubar-trigger"
    className={cn(
      "flex items-center rounded-sm px-1.5 py-0.5",
      "text-sm font-medium outline-hidden select-none",
      "hover:bg-muted aria-expanded:bg-muted",
      className,
    )}
    {...props}
  />
);

const MenubarContent = ({
  align = MENUBAR_CONTENT_DEFAULTS.align,
  alignOffset = MENUBAR_CONTENT_DEFAULTS.alignOffset,
  sideOffset = MENUBAR_CONTENT_DEFAULTS.sideOffset,
  className,
  ...props
}: MenubarContentProps) => (
  <MenubarPortal>
    <MenubarPrimitive.Content
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-36 overflow-hidden rounded-lg",
        "origin-(--radix-menubar-content-transform-origin)",
        "bg-popover p-1 text-popover-foreground",
        "shadow-md ring-1 ring-foreground/10 duration-100",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        className,
      )}
      {...props}
    />
  </MenubarPortal>
);

const MenubarItem = ({
  variant = MENUBAR_ITEM_DEFAULTS.variant,
  inset,
  className,
  ...props
}: MenubarItemProps) => (
  <MenubarPrimitive.Item
    data-slot="menubar-item"
    data-inset={inset}
    data-variant={variant}
    className={cn(menubarItemVariants({ variant }), className)}
    {...props}
  />
);

const MenubarCheckboxItem = ({
  checked,
  inset,
  className,
  children,
  ...props
}: MenubarCheckboxItemProps) => (
  <MenubarPrimitive.CheckboxItem
    data-slot="menubar-checkbox-item"
    data-inset={inset}
    className={cn(
      "relative flex cursor-default items-center gap-1.5 rounded-md",
      "py-1 pr-1.5 pl-7 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
      "data-inset:pl-7",
      "data-disabled:pointer-events-none",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
);

const MenubarRadioItem = ({ inset, className, children, ...props }: MenubarRadioItemProps) => (
  <MenubarPrimitive.RadioItem
    data-slot="menubar-radio-item"
    data-inset={inset}
    className={cn(
      "relative flex cursor-default items-center gap-1.5 rounded-md",
      "py-1 pr-1.5 pl-7 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
      "data-inset:pl-7",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    <span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
);

const MenubarLabel = ({ className, inset, ...props }: MenubarLabelProps) => (
  <MenubarPrimitive.Label
    data-slot="menubar-label"
    data-inset={inset}
    className={cn("px-1.5 py-1 text-sm font-medium data-inset:pl-7", className)}
    {...props}
  />
);

const MenubarSeparator = ({ className, ...props }: MenubarSeparatorProps) => (
  <MenubarPrimitive.Separator
    data-slot="menubar-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);

const MenubarShortcut = ({ className, ...props }: MenubarShortcutProps) => (
  <span
    data-slot="menubar-shortcut"
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      "group-focus/menubar-item:text-accent-foreground",
      className,
    )}
    {...props}
  />
);

const MenubarSub = ({ ...props }: MenubarSubProps) => (
  <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
);

const MenubarSubTrigger = ({ inset, className, children, ...props }: MenubarSubTriggerProps) => (
  <MenubarPrimitive.SubTrigger
    data-slot="menubar-sub-trigger"
    data-inset={inset}
    className={cn(
      "flex cursor-default items-center gap-1.5 rounded-md",
      "px-1.5 py-1 text-sm outline-none select-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-inset:pl-7",
      "data-open:bg-accent data-open:text-accent-foreground",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-4" />
  </MenubarPrimitive.SubTrigger>
);

const MenubarSubContent = ({ className, ...props }: MenubarSubContentProps) => (
  <MenubarPrimitive.SubContent
    data-slot="menubar-sub-content"
    className={cn(
      "z-50 min-w-32 overflow-hidden rounded-lg",
      "origin-(--radix-menubar-content-transform-origin)",
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
  Menubar,
  MenubarMenu,
  MenubarGroup,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
