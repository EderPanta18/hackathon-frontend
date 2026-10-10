// src/ui/form/label/Label.tsx

import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import type { LabelProps } from "./label.types";

export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    data-slot="label"
    className={cn(
      "flex items-center gap-2 text-sm font-medium leading-none select-none",
      "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

export default Label;
