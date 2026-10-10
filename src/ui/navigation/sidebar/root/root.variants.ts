// src/ui/navigation/sidebar/root/root.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const sidebarGapVariants = cva(
  [
    "relative w-(--sidebar-width) bg-transparent",
    "transition-[width] duration-200 ease-linear",
    "group-data-[collapsible=offcanvas]:w-0",
    "group-data-[side=right]:rotate-180",
  ].join(" "),
  {
    variants: {
      variant: {
        sidebar: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        floating:
          "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
        inset: "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
      },
    },
    defaultVariants: { variant: "sidebar" },
  },
);

export const sidebarContainerVariants = cva(
  [
    "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width)",
    "transition-[left,right,width] duration-200 ease-linear",
    "data-[side=left]:left-0",
    "data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
    "data-[side=right]:right-0",
    "data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
    "md:flex",
  ].join(" "),
  {
    variants: {
      variant: {
        sidebar: [
          "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          "group-data-[side=left]:border-r",
          "group-data-[side=right]:border-l",
        ].join(" "),
        floating: [
          "p-2",
          "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
        ].join(" "),
        inset: [
          "p-2",
          "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
        ].join(" "),
      },
    },
    defaultVariants: { variant: "sidebar" },
  },
);

export type SidebarGapVariants = VariantProps<typeof sidebarGapVariants>;

export type SidebarContainerVariants = VariantProps<typeof sidebarContainerVariants>;
