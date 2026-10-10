// src/ui/form/switch/Switch.tsx

import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { SWITCH_DEFAULTS } from "./switch.constants";
import type { SwitchProps } from "./switch.types";
import { switchVariants } from "./switch.variants";

export const Switch = ({
  size = SWITCH_DEFAULTS.size,
  tone = SWITCH_DEFAULTS.tone,
  className,
  ...props
}: SwitchProps) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    data-size={size}
    data-tone={tone}
    className={cn(switchVariants({ size, tone }), className)}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block rounded-full bg-background ring-0 transition-transform",
        // Tamaño del thumb por size
        "group-data-[size=sm]/switch:size-3",
        "group-data-[size=md]/switch:size-4",
        // Translate checked por size
        "group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]",
        "group-data-[size=md]/switch:data-checked:translate-x-[calc(100%-2px)]",
        // Translate unchecked
        "group-data-[size=sm]/switch:data-unchecked:translate-x-0",
        "group-data-[size=md]/switch:data-unchecked:translate-x-0",
        // Dark: checked foreground según tone
        "group-data-[tone=primary]/switch:dark:data-checked:bg-primary-foreground",
        "group-data-[tone=secondary]/switch:dark:data-checked:bg-secondary-foreground",
        "group-data-[tone=neutral]/switch:dark:data-checked:bg-neutral-foreground",
        // Dark: unchecked
        "dark:data-unchecked:bg-foreground",
      )}
    />
  </SwitchPrimitive.Root>
);

export default Switch;
