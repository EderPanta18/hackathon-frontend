// src/ui/primitives/separator/Separator.tsx

import { Separator as SeparatorPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { SEPARATOR_DEFAULTS } from "./separator.constants";
import { getSeparatorVisibility } from "./separator.helpers";
import type { SeparatorProps } from "./separator.types";
import { separatorVariants } from "./separator.variants";

export const Separator = ({
  orientation = SEPARATOR_DEFAULTS.orientation,
  thickness = SEPARATOR_DEFAULTS.thickness,
  decorative = SEPARATOR_DEFAULTS.decorative,
  responsive,
  className,
  ...props
}: SeparatorProps) => {
  if (responsive && responsive.orientation !== orientation) {
    const visibility = getSeparatorVisibility(responsive.breakpoint);

    return (
      <>
        <SeparatorPrimitive.Root
          data-slot="separator"
          orientation={orientation}
          decorative={decorative}
          className={cn(separatorVariants({ orientation, thickness }), visibility.base, className)}
          {...props}
        />
        <SeparatorPrimitive.Root
          data-slot="separator"
          orientation={responsive.orientation}
          decorative={decorative}
          className={cn(
            separatorVariants({
              orientation: responsive.orientation,
              thickness,
            }),
            visibility.responsive,
            className,
          )}
          {...props}
        />
      </>
    );
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      orientation={orientation}
      decorative={decorative}
      className={cn(separatorVariants({ orientation, thickness }), className)}
      {...props}
    />
  );
};

export default Separator;
