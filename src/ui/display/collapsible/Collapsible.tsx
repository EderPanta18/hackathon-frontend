// src/ui/display/collapsible/Collapsible.tsx

import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "./collapsible.types";

const Collapsible = ({ ...props }: CollapsibleProps) => (
  <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
);

const CollapsibleTrigger = ({ ...props }: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />
);

const CollapsibleContent = ({ ...props }: CollapsibleContentProps) => (
  <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
