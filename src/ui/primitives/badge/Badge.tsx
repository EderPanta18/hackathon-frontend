// src/ui/primitives/badge/Badge.tsx

import { Slot } from "radix-ui";
import { cn } from "@/lib/styling";
import { BADGE_DEFAULTS } from "./badge.constants";
import type { BadgeProps } from "./badge.types";
import { badgeVariants } from "./badge.variants";

export function Badge({
  size = BADGE_DEFAULTS.size,
  tone = BADGE_DEFAULTS.tone,
  variant = BADGE_DEFAULTS.variant,
  asChild,
  className,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-tone={tone}
      data-variant={variant}
      data-size={size}
      className={cn(
        badgeVariants({
          tone,
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default Badge;
