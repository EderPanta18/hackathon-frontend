// src/ui/primitives/toggle/Toggle.tsx

import { Toggle as TogglePrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { TOGGLE_DEFAULTS } from "./toggle.constants";
import type { ToggleProps } from "./toggle.types";
import { toggleVariants } from "./toggle.variants";

export const Toggle = ({
  size = TOGGLE_DEFAULTS.size,
  variant = TOGGLE_DEFAULTS.variant,
  className,
  ...props
}: ToggleProps) => (
  <TogglePrimitive.Root
    data-slot="toggle"
    data-size={size}
    data-variant={variant}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
);

export default Toggle;
