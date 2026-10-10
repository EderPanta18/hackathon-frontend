// src/ui/feedback/alert/alert.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
  [
    "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm",
    "has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18",
    "has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2",
    "*:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
    "*:[svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: "",
        information: "",
        success: "",
        warning: "",
        destructive: "",
      },
      variant: {
        solid: "bg-card",
        soft: "",
      },
    },
    compoundVariants: [
      // ── neutral ──────────────────────────────────────────────
      {
        tone: "neutral",
        variant: "solid",
        class: [
          "border-neutral/30 text-foreground",
          "*:[svg]:text-neutral",
          "dark:border-neutral/20",
        ].join(" "),
      },
      {
        tone: "neutral",
        variant: "soft",
        class: [
          "border-neutral/20 bg-neutral/8 text-foreground",
          "*:[svg]:text-neutral",
          "dark:border-neutral/15 dark:bg-neutral/10",
        ].join(" "),
      },

      // ── information ──────────────────────────────────────────
      {
        tone: "information",
        variant: "solid",
        class: [
          "border-information/35 text-foreground",
          "*:[svg]:text-information",
          "dark:border-information/25",
        ].join(" "),
      },
      {
        tone: "information",
        variant: "soft",
        class: [
          "border-information/25 bg-information/8 text-foreground",
          "*:[svg]:text-information",
          "dark:border-information/20 dark:bg-information/10",
        ].join(" "),
      },

      // ── success ──────────────────────────────────────────────
      {
        tone: "success",
        variant: "solid",
        class: [
          "border-success/35 text-foreground",
          "*:[svg]:text-success",
          "dark:border-success/25",
        ].join(" "),
      },
      {
        tone: "success",
        variant: "soft",
        class: [
          "border-success/25 bg-success/8 text-foreground",
          "*:[svg]:text-success",
          "dark:border-success/20 dark:bg-success/10",
        ].join(" "),
      },

      // ── warning ──────────────────────────────────────────────
      {
        tone: "warning",
        variant: "solid",
        class: [
          "border-warning/35 text-foreground",
          "*:[svg]:text-warning",
          "dark:border-warning/25",
        ].join(" "),
      },
      {
        tone: "warning",
        variant: "soft",
        class: [
          "border-warning/25 bg-warning/8 text-foreground",
          "*:[svg]:text-warning",
          "dark:border-warning/20 dark:bg-warning/10",
        ].join(" "),
      },

      // ── destructive ──────────────────────────────────────────
      {
        tone: "destructive",
        variant: "solid",
        class: [
          "border-destructive/35 text-foreground",
          "*:[svg]:text-destructive",
          "dark:border-destructive/25",
        ].join(" "),
      },
      {
        tone: "destructive",
        variant: "soft",
        class: [
          "border-destructive/25 bg-destructive/8 text-foreground",
          "*:[svg]:text-destructive",
          "dark:border-destructive/20 dark:bg-destructive/10",
        ].join(" "),
      },
    ],
    defaultVariants: {
      tone: "neutral",
      variant: "solid",
    },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
