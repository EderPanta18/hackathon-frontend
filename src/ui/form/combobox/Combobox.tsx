// src/ui/form/combobox/Combobox.tsx

"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/styling";
import { InputGroup } from "@/ui/form/input-group";
import { Button } from "@/ui/primitives/button";
import {
  COMBOBOX_CHIP_DEFAULTS,
  COMBOBOX_CONTENT_DEFAULTS,
  COMBOBOX_INPUT_DEFAULTS,
} from "./combobox.constants";
import type {
  ComboboxAnchorRef,
  ComboboxChipProps,
  ComboboxChipsInputProps,
  ComboboxChipsProps,
  ComboboxClearProps,
  ComboboxCollectionProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
} from "./combobox.types";

const Combobox = ({ ...props }: ComboboxProps) => <ComboboxPrimitive.Root {...props} />;

const ComboboxValue = ({ ...props }: ComboboxValueProps) => (
  <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
);

const ComboboxTrigger = ({ className, children, ...props }: ComboboxTriggerProps) => (
  <ComboboxPrimitive.Trigger
    data-slot="combobox-trigger"
    className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
    {...props}
  >
    {children}
    <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
  </ComboboxPrimitive.Trigger>
);

const ComboboxClear = ({ className, ...props }: ComboboxClearProps) => (
  <ComboboxPrimitive.Clear
    data-slot="combobox-clear"
    render={<InputGroup.Button variant="ghost" size="icon-xs" />}
    className={cn(className)}
    {...props}
  >
    <XIcon className="pointer-events-none" />
  </ComboboxPrimitive.Clear>
);

const ComboboxInput = ({
  showTrigger = COMBOBOX_INPUT_DEFAULTS.showTrigger,
  showClear = COMBOBOX_INPUT_DEFAULTS.showClear,
  disabled = COMBOBOX_INPUT_DEFAULTS.disabled,
  className,
  children,
  ...props
}: ComboboxInputProps) => (
  <InputGroup className={cn("w-auto", className)}>
    <ComboboxPrimitive.Input render={<InputGroup.Input disabled={disabled} />} {...props} />
    <InputGroup.Addon align="inline-end">
      {showTrigger && (
        <InputGroup.Button
          size="icon-xs"
          variant="ghost"
          tone="neutral"
          asChild
          data-slot="input-group-button"
          className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
          disabled={disabled}
        >
          <ComboboxTrigger />
        </InputGroup.Button>
      )}
      {showClear && <ComboboxClear disabled={disabled} />}
    </InputGroup.Addon>
    {children}
  </InputGroup>
);

const ComboboxContent = ({
  side = COMBOBOX_CONTENT_DEFAULTS.side,
  sideOffset = COMBOBOX_CONTENT_DEFAULTS.sideOffset,
  align = COMBOBOX_CONTENT_DEFAULTS.align,
  alignOffset = COMBOBOX_CONTENT_DEFAULTS.alignOffset,
  anchor,
  className,
  ...props
}: ComboboxContentProps) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      anchor={anchor}
      className="isolate z-50"
    >
      <ComboboxPrimitive.Popup
        data-slot="combobox-content"
        data-chips={!!anchor}
        className={cn(
          "group/combobox-content relative overflow-hidden rounded-lg",
          "max-h-(--available-height) w-(--anchor-width) max-w-(--available-width)",
          "min-w-[calc(var(--anchor-width)+--spacing(7))]",
          "origin-(--transform-origin)",
          "bg-popover text-popover-foreground shadow-md",
          "ring-1 ring-foreground/10 duration-100",
          "data-[chips=true]:min-w-(--anchor-width)",
          // slide-in por lado
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=inline-end]:slide-in-from-left-2",
          "data-[side=inline-start]:slide-in-from-right-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          // input-group embebido en el popup
          "*:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0",
          "*:data-[slot=input-group]:h-8",
          "*:data-[slot=input-group]:border-input/30",
          "*:data-[slot=input-group]:bg-input/30",
          "*:data-[slot=input-group]:shadow-none",
          // animaciones
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
);

const ComboboxList = ({ className, ...props }: ComboboxListProps) => (
  <ComboboxPrimitive.List
    data-slot="combobox-list"
    className={cn(
      "no-scrollbar overflow-y-auto overscroll-contain scroll-py-1 p-1",
      "max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))]",
      "data-empty:p-0",
      className,
    )}
    {...props}
  />
);

const ComboboxItem = ({ className, children, ...props }: ComboboxItemProps) => (
  <ComboboxPrimitive.Item
    data-slot="combobox-item"
    className={cn(
      "relative flex w-full cursor-default items-center gap-2 rounded-md",
      "py-1 pr-8 pl-1.5 text-sm outline-hidden select-none",
      "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
      "not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      render={
        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
      }
    >
      <CheckIcon className="pointer-events-none" />
    </ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>
);

const ComboboxGroup = ({ className, ...props }: ComboboxGroupProps) => (
  <ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />
);

const ComboboxLabel = ({ className, ...props }: ComboboxLabelProps) => (
  <ComboboxPrimitive.GroupLabel
    data-slot="combobox-label"
    className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
    {...props}
  />
);

const ComboboxCollection = ({ ...props }: ComboboxCollectionProps) => (
  <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
);

const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => (
  <ComboboxPrimitive.Empty
    data-slot="combobox-empty"
    className={cn(
      "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground",
      "group-data-empty/combobox-content:flex",
      className,
    )}
    {...props}
  />
);

const ComboboxSeparator = ({ className, ...props }: ComboboxSeparatorProps) => (
  <ComboboxPrimitive.Separator
    data-slot="combobox-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);

const ComboboxChips = ({ className, ...props }: ComboboxChipsProps) => (
  <ComboboxPrimitive.Chips
    data-slot="combobox-chips"
    className={cn(
      "flex min-h-8 flex-wrap items-center gap-1 rounded-lg",
      "border border-input bg-transparent bg-clip-padding",
      "px-2.5 py-1 text-sm transition-colors",
      "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
      "has-aria-invalid:border-destructive has-aria-invalid:ring-3",
      "has-aria-invalid:ring-destructive/20",
      "dark:bg-input/30",
      "dark:has-aria-invalid:border-destructive/50",
      "dark:has-aria-invalid:ring-destructive/40",
      "has-data-[slot=combobox-chip]:px-1",
      className,
    )}
    {...props}
  />
);

const ComboboxChip = ({
  showRemove = COMBOBOX_CHIP_DEFAULTS.showRemove,
  className,
  children,
  ...props
}: ComboboxChipProps) => (
  <ComboboxPrimitive.Chip
    data-slot="combobox-chip"
    className={cn(
      "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1",
      "rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground",
      "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50",
      "has-data-[slot=combobox-chip-remove]:pr-0",
      className,
    )}
    {...props}
  >
    {children}
    {showRemove && (
      <ComboboxPrimitive.ChipRemove
        render={
          <Button variant="ghost" tone="neutral" size="icon-xs" className="rounded-full size-5" />
        }
        className={cn(
          "-ml-0.5 opacity-50 hover:opacity-100",
          "in-data-disabled:pointer-events-none in-data-disabled:opacity-30",
        )}
        data-slot="combobox-chip-remove"
      >
        <XIcon className="pointer-events-none" />
      </ComboboxPrimitive.ChipRemove>
    )}
  </ComboboxPrimitive.Chip>
);

const ComboboxChipsInput = ({ className, ...props }: ComboboxChipsInputProps) => (
  <ComboboxPrimitive.Input
    data-slot="combobox-chip-input"
    className={cn("min-w-16 flex-1 outline-none", className)}
    {...props}
  />
);

const useComboboxAnchor = (): ComboboxAnchorRef => useRef<HTMLDivElement | null>(null);

export {
  Combobox,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
};
