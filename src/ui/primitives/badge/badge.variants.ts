// src/ui/primitives/badge/badge.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1",
    "overflow-hidden rounded-full border border-transparent",
    "font-medium whitespace-nowrap select-none transition-all",
    "focus-visible:ring-[2px] focus-visible:outline-none",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:size-3!",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-3.5 px-1 text-[0.6rem]",
        sm: "h-4 px-1.5 text-[0.65rem]",
        md: "h-5 px-2 text-xs",
        lg: "h-6 px-2.5 text-xs",
      },

      tone: {
        primary: "",
        secondary: "",
        neutral: "",
        success: "",
        destructive: "",
      },

      variant: {
        solid: "",
        outline: "",
        ghost: "",
        soft: "",
      },
    },

    compoundVariants: [
      // ── primary ─────────────────────────────────────────────────────────────
      {
        tone: "primary",
        variant: "solid",
        class: [
          "bg-primary text-primary-foreground",
          "focus-visible:border-primary/60 focus-visible:ring-primary/35",
          "dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/45",
        ].join(" "),
      },
      {
        tone: "primary",
        variant: "outline",
        class: [
          "border-primary/40 text-primary",
          "focus-visible:border-primary/50 focus-visible:ring-primary/25",
          "dark:focus-visible:border-primary/60 dark:focus-visible:ring-primary/35",
        ].join(" "),
      },
      {
        tone: "primary",
        variant: "ghost",
        class: [
          "text-primary hover:bg-primary/10",
          "focus-visible:border-primary/40 focus-visible:ring-primary/20",
          "dark:focus-visible:border-primary/50 dark:focus-visible:ring-primary/30",
        ].join(" "),
      },
      {
        tone: "primary",
        variant: "soft",
        class: [
          "bg-primary/10 text-primary",
          "dark:bg-primary/20",
          "focus-visible:border-primary/45 focus-visible:ring-primary/25",
          "dark:focus-visible:border-primary/55 dark:focus-visible:ring-primary/35",
        ].join(" "),
      },

      // ── secondary ───────────────────────────────────────────────────────────
      {
        tone: "secondary",
        variant: "solid",
        class: [
          "bg-secondary text-secondary-foreground",
          "focus-visible:border-secondary/60 focus-visible:ring-secondary/35",
          "dark:focus-visible:border-secondary/70 dark:focus-visible:ring-secondary/45",
        ].join(" "),
      },
      {
        tone: "secondary",
        variant: "outline",
        class: [
          "border-secondary/40 text-secondary",
          "focus-visible:border-secondary/50 focus-visible:ring-secondary/25",
          "dark:focus-visible:border-secondary/60 dark:focus-visible:ring-secondary/35",
        ].join(" "),
      },
      {
        tone: "secondary",
        variant: "ghost",
        class: [
          "text-secondary hover:bg-secondary/10",
          "focus-visible:border-secondary/40 focus-visible:ring-secondary/20",
          "dark:focus-visible:border-secondary/50 dark:focus-visible:ring-secondary/30",
        ].join(" "),
      },
      {
        tone: "secondary",
        variant: "soft",
        class: [
          "bg-secondary/10 text-secondary",
          "dark:bg-secondary/20",
          "focus-visible:border-secondary/45 focus-visible:ring-secondary/25",
          "dark:focus-visible:border-secondary/55 dark:focus-visible:ring-secondary/35",
        ].join(" "),
      },

      // ── neutral ─────────────────────────────────────────────────────────────
      {
        tone: "neutral",
        variant: "solid",
        class: [
          "bg-neutral text-neutral-foreground",
          "focus-visible:border-neutral/70 focus-visible:ring-neutral/40",
          "dark:focus-visible:border-neutral/80 dark:focus-visible:ring-neutral/50",
        ].join(" "),
      },
      {
        tone: "neutral",
        variant: "outline",
        class: [
          "border-neutral/40 text-neutral",
          "focus-visible:border-neutral/55 focus-visible:ring-neutral/30",
          "dark:focus-visible:border-neutral/65 dark:focus-visible:ring-neutral/40",
        ].join(" "),
      },
      {
        tone: "neutral",
        variant: "ghost",
        class: [
          "text-neutral hover:bg-neutral/10",
          "focus-visible:border-neutral/45 focus-visible:ring-neutral/25",
          "dark:focus-visible:border-neutral/55 dark:focus-visible:ring-neutral/35",
        ].join(" "),
      },
      {
        tone: "neutral",
        variant: "soft",
        class: [
          "bg-neutral/10 text-neutral",
          "dark:bg-neutral/20",
          "focus-visible:border-neutral/50 focus-visible:ring-neutral/30",
          "dark:focus-visible:border-neutral/60 dark:focus-visible:ring-neutral/40",
        ].join(" "),
      },

      // ── success ─────────────────────────────────────────────────────────────
      {
        tone: "success",
        variant: "solid",
        class: [
          "bg-success text-success-foreground",
          "focus-visible:border-success/60 focus-visible:ring-success/35",
          "dark:focus-visible:border-success/70 dark:focus-visible:ring-success/45",
        ].join(" "),
      },
      {
        tone: "success",
        variant: "outline",
        class: [
          "border-success/40 text-success",
          "focus-visible:border-success/50 focus-visible:ring-success/25",
          "dark:focus-visible:border-success/60 dark:focus-visible:ring-success/35",
        ].join(" "),
      },
      {
        tone: "success",
        variant: "ghost",
        class: [
          "text-success hover:bg-success/10",
          "focus-visible:border-success/40 focus-visible:ring-success/20",
          "dark:focus-visible:border-success/50 dark:focus-visible:ring-success/30",
        ].join(" "),
      },
      {
        tone: "success",
        variant: "soft",
        class: [
          "bg-success/10 text-success",
          "dark:bg-success/20",
          "focus-visible:border-success/45 focus-visible:ring-success/25",
          "dark:focus-visible:border-success/55 dark:focus-visible:ring-success/35",
        ].join(" "),
      },

      // ── destructive ─────────────────────────────────────────────────────────
      {
        tone: "destructive",
        variant: "solid",
        class: [
          "bg-destructive text-destructive-foreground",
          "focus-visible:border-destructive/60 focus-visible:ring-destructive/35",
          "dark:focus-visible:border-destructive/70 dark:focus-visible:ring-destructive/45",
        ].join(" "),
      },
      {
        tone: "destructive",
        variant: "outline",
        class: [
          "border-destructive/40 text-destructive",
          "focus-visible:border-destructive/50 focus-visible:ring-destructive/25",
          "dark:focus-visible:border-destructive/60 dark:focus-visible:ring-destructive/35",
        ].join(" "),
      },
      {
        tone: "destructive",
        variant: "ghost",
        class: [
          "text-destructive hover:bg-destructive/10",
          "focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
          "dark:focus-visible:border-destructive/50 dark:focus-visible:ring-destructive/30",
        ].join(" "),
      },
      {
        tone: "destructive",
        variant: "soft",
        class: [
          "bg-destructive/10 text-destructive",
          "dark:bg-destructive/20 dark:hover:bg-destructive/30",
          "focus-visible:border-destructive/45 focus-visible:ring-destructive/25",
          "dark:focus-visible:border-destructive/55 dark:focus-visible:ring-destructive/40",
        ].join(" "),
      },
    ],

    defaultVariants: {
      tone: "neutral",
      variant: "soft",
      size: "md",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
