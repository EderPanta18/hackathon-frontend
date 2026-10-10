// src/ui/display/card/Card.tsx

import { cn } from "@/lib/styling";
import { Separator } from "@/ui/primitives/separator";
import { CARD_DEFAULTS } from "./card.constants";
import type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardSeparatorProps,
  CardTitleProps,
} from "./card.types";

const Card = ({ size = CARD_DEFAULTS.size, className, ...props }: CardProps) => (
  <div
    data-slot="card"
    data-size={size}
    className={cn(
      "group/card flex flex-col gap-3 overflow-hidden rounded-xl",
      "bg-card py-4 text-sm text-card-foreground",
      "ring-1 ring-foreground/10",
      "has-data-[slot=card-footer]:pb-0",
      "has-[>img:first-child]:pt-0",
      "*:[img:first-child]:rounded-t-xl",
      "*:[img:last-child]:rounded-b-xl",
      "data-[size=sm]:gap-2 data-[size=sm]:py-3",
      "data-[size=sm]:has-data-[slot=card-footer]:pb-0",
      className,
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-slot="card-header"
    className={cn(
      "@container/card-header group/card-header",
      "grid auto-rows-min items-start gap-1 rounded-t-xl px-4",
      "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      "has-data-[slot=card-description]:grid-rows-[auto_auto]",
      "[.border-b]:pb-4",
      "group-data-[size=sm]/card:px-3",
      "group-data-[size=sm]/card:[.border-b]:pb-3",
      className,
    )}
    {...props}
  />
);

const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <div
    data-slot="card-title"
    className={cn(
      "font-heading text-base font-medium leading-snug",
      "group-data-[size=sm]/card:text-sm",
      className,
    )}
    {...props}
  />
);

const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <div
    data-slot="card-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    data-slot="card-action"
    className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
    {...props}
  />
);

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    data-slot="card-content"
    className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
    {...props}
  />
);

const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={cn(
      "flex items-center rounded-b-xl border-t bg-muted/50 p-4",
      "group-data-[size=sm]/card:p-3",
      className,
    )}
    {...props}
  />
);

const CardSeparator = ({ className, ...props }: CardSeparatorProps) => (
  <Separator data-slot="card-separator" orientation="horizontal" className={className} {...props} />
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  CardSeparator,
};
