// src/ui/form/checkbox/Checkbox.tsx

import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { CHECKBOX_DEFAULTS } from "./checkbox.constants";
import type { CheckboxProps } from "./checkbox.types";
import { checkboxIndicatorClass, checkboxVariants } from "./checkbox.variants";

export const Checkbox = ({
  size = CHECKBOX_DEFAULTS.size,
  tone = CHECKBOX_DEFAULTS.tone,
  className,
  ...props
}: CheckboxProps) => (
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    data-size={size}
    data-tone={tone}
    className={cn(checkboxVariants({ size, tone }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={checkboxIndicatorClass}>
      <CheckIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export default Checkbox;
