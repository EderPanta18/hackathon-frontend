// src/ui/display/accordion/Accordion.tsx

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./accordion.types";

const Accordion = ({ className, ...props }: AccordionProps) => (
  <AccordionPrimitive.Root
    data-slot="accordion"
    className={cn("flex w-full flex-col", className)}
    {...props}
  />
);

const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item
    data-slot="accordion-item"
    className={cn("not-last:border-b", className)}
    {...props}
  />
);

const AccordionTrigger = ({ className, children, ...props }: AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "group/accordion-trigger relative flex flex-1 items-start justify-between",
        "rounded-lg border border-transparent py-2.5",
        "text-left text-sm font-medium transition-all outline-none",
        "hover:underline",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "focus-visible:after:border-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "**:data-[slot=accordion-trigger-icon]:ml-auto",
        "**:data-[slot=accordion-trigger-icon]:size-4",
        "**:data-[slot=accordion-trigger-icon]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="accordion-trigger-icon"
        className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
      />
      <ChevronUpIcon
        data-slot="accordion-trigger-icon"
        className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({ className, children, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Content
    data-slot="accordion-content"
    className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
    {...props}
  >
    <div
      className={cn(
        "h-(--radix-accordion-content-height) pb-2.5 pt-0",
        "[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        "[&_p:not(:last-child)]:mb-4",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
