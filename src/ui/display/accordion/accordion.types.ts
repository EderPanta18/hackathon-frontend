// src/ui/display/accordion/accordion.types.ts

import type { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root>;

export interface AccordionItemProps extends ComponentProps<typeof AccordionPrimitive.Item> {}

export interface AccordionTriggerProps extends ComponentProps<typeof AccordionPrimitive.Trigger> {}

export interface AccordionContentProps extends ComponentProps<typeof AccordionPrimitive.Content> {}
