// src/ui/form/radio-group/RadioGroup.tsx

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { RADIO_GROUP_ITEM_DEFAULTS } from "./radio-group.constants";
import type { RadioGroupItemProps, RadioGroupProps } from "./radio-group.types";
import { radioGroupItemVariants } from "./radio-group.variants";

const RadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    data-slot="radio-group"
    className={cn("grid w-full gap-2", className)}
    {...props}
  />
);

const RadioGroupItem = ({
  size = RADIO_GROUP_ITEM_DEFAULTS.size,
  tone = RADIO_GROUP_ITEM_DEFAULTS.tone,
  className,
  ...props
}: RadioGroupItemProps) => (
  <RadioGroupPrimitive.Item
    data-slot="radio-group-item"
    data-size={size}
    data-tone={tone}
    className={cn(radioGroupItemVariants({ size, tone }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className="flex size-full items-center justify-center"
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
          // Tamaño del dot por size
          "group-data-[size=xs]/radio-group-item:size-1.5",
          "group-data-[size=md]/radio-group-item:size-2",
          // Color del dot por tone
          "group-data-[tone=primary]/radio-group-item:bg-primary-foreground",
          "group-data-[tone=secondary]/radio-group-item:bg-secondary-foreground",
          "group-data-[tone=neutral]/radio-group-item:bg-neutral-foreground",
        )}
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
);

export { RadioGroup, RadioGroupItem };
