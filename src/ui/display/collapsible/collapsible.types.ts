// src/ui/display/collapsible/collapsible.types.ts

import type { Collapsible as CollapsiblePrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface CollapsibleProps extends ComponentProps<typeof CollapsiblePrimitive.Root> {}

export interface CollapsibleTriggerProps
  extends ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> {}

export interface CollapsibleContentProps
  extends ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> {}
