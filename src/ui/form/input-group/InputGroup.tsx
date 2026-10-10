// src/ui/form/input-group/InputGroup.tsx

"use client";

import { cn } from "@/lib/styling";
import { Input, Textarea } from "@/ui/form";
import { Button } from "@/ui/primitives/button";
import { INPUT_GROUP_ADDON_DEFAULTS, INPUT_GROUP_BUTTON_DEFAULTS } from "./input-group.constants";
import type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
} from "./input-group.types";
import { inputGroupAddonVariants, inputGroupButtonVariants } from "./input-group.variants";

const InputGroup = ({ className, ...props }: InputGroupProps) => (
  // biome-ignore lint/a11y/useSemanticElements: inline flex input wrapper, fieldset is block-level and breaks layout
  <div
    data-slot="input-group"
    role="group"
    className={cn(
      "group/input-group relative flex h-10 w-full min-w-0 items-center",
      "rounded-lg border border-input bg-transparent transition-colors outline-none",
      // Focus del control interno
      "has-[[data-slot=input-group-control]:focus-visible]:border-ring",
      "has-[[data-slot=input-group-control]:focus-visible]:ring-3",
      "has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",
      // aria-invalid del control interno
      "has-[[data-slot][aria-invalid=true]]:border-destructive",
      "has-[[data-slot][aria-invalid=true]]:ring-3",
      "has-[[data-slot][aria-invalid=true]]:ring-destructive/20",
      "dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
      // Disabled
      "has-disabled:opacity-50 has-disabled:bg-input/50",
      "dark:bg-input/30 dark:has-disabled:bg-input/80",
      // Layout automático con textarea o addons block
      "has-[>textarea]:h-auto",
      "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
      "has-[>[data-align=block-end]]:h-auto   has-[>[data-align=block-end]]:flex-col",
      // Ajuste de padding del input cuando hay addons inline
      "has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
      "has-[>[data-align=inline-end]]:[&>input]:pr-1.5",
      // Ajuste cuando hay addons block
      "has-[>[data-align=block-start]]:[&>input]:pb-3",
      "has-[>[data-align=block-end]]:[&>input]:pt-3",
      // Dentro de combobox, para evitar que el focus del input afecte al borde del grupo
      "in-data-[slot=combobox-content]:focus-within:border-inherit",
      "in-data-[slot=combobox-content]:focus-within:ring-0",
      className,
    )}
    {...props}
  />
);

const InputGroupAddon = ({
  align = INPUT_GROUP_ADDON_DEFAULTS.align,
  className,
  ...props
}: InputGroupAddonProps) => {
  const focusInput = (e: React.MouseEvent<HTMLDivElement>) => {
    // Si el click fue en un botón, no roba el foco
    if ((e.target as HTMLElement).closest("button")) return;

    const parent = e.currentTarget.parentElement;

    if (!parent) return;

    const input = parent.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea");

    input?.focus();
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: focus-forwarding helper
    // biome-ignore lint/a11y/useKeyWithClickEvents: programmatic focus helper, not a true interactive control
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={focusInput}
      {...props}
    />
  );
};

const InputGroupButton = ({
  size = INPUT_GROUP_BUTTON_DEFAULTS.size,
  variant = INPUT_GROUP_BUTTON_DEFAULTS.variant,
  tone = INPUT_GROUP_BUTTON_DEFAULTS.tone,
  type = INPUT_GROUP_BUTTON_DEFAULTS.type,
  className,
  ...props
}: InputGroupButtonProps) => (
  <Button
    type={type}
    size={size}
    variant={variant}
    tone={tone}
    className={cn(inputGroupButtonVariants({ size }), className)}
    {...props}
  />
);

const InputGroupText = ({ className, ...props }: InputGroupTextProps) => (
  <span
    className={cn(
      "flex items-center gap-2 text-sm text-muted-foreground",
      "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
      className,
    )}
    {...props}
  />
);

const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => (
  <Input
    data-slot="input-group-control"
    className={cn(
      "flex-1 rounded-none border-0 bg-transparent shadow-none",
      "focus-visible:ring-0 aria-invalid:ring-0",
      "disabled:bg-transparent",
      "dark:bg-transparent dark:disabled:bg-transparent",
      className,
    )}
    {...props}
  />
);

const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaProps) => (
  <Textarea
    data-slot="input-group-control"
    className={cn(
      "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none",
      "focus-visible:ring-0 aria-invalid:ring-0",
      "disabled:bg-transparent",
      "dark:bg-transparent dark:disabled:bg-transparent",
      className,
    )}
    {...props}
  />
);

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
