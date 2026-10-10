// src/ui/primitives/button/button.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
    [
        "group/button inline-flex shrink-0 items-center justify-center align-middle",
        "rounded-lg border border-transparent bg-clip-padding",
        "font-medium outline-none select-none transition-all",
        "hover:cursor-pointer",
        "focus-visible:ring-[3px]",
        "active:not-aria-[haspopup]:translate-y-px",
        "disabled:pointer-events-none disabled:opacity-70",
        "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",
    ].join(" "),
    {
        variants: {
            size: {
                xs: "h-7 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
                md: "h-9 px-2.5 text-sm",
                lg: "h-10 px-3 text-sm",
                "icon-xs":
                    "size-7 p-0 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
                "icon-sm":
                    "size-8 p-0 rounded-[min(var(--radius-md),12px)] [&_svg:not([class*='size-'])]:size-3.5",
                icon: "size-9 p-0 [&_svg:not([class*='size-'])]:size-4",
                "icon-lg": "size-10 p-0 [&_svg:not([class*='size-'])]:size-5",
            },

            tone: {
                primary: "",
                secondary: "",
                neutral: "",
                destructive: "",
            },

            variant: {
                solid: "",
                outline: "",
                ghost: "",
                soft: "",
                link: "w-fit border-transparent bg-transparent px-0 shadow-none underline-offset-4 hover:underline",
            },

            pending: {
                true: "pointer-events-none",
                false: "",
            },
        },

        compoundVariants: [
            // ── primary ─────────────────────────────────────────────────────────────
            {
                tone: "primary",
                variant: "solid",
                class: [
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "focus-visible:border-primary/60 focus-visible:ring-primary/35",
                    "dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/45",
                ].join(" "),
            },
            {
                tone: "primary",
                variant: "outline",
                class: [
                    "border-primary/25 bg-transparent text-primary hover:bg-primary/10 hover:text-primary",
                    "focus-visible:border-primary/50 focus-visible:ring-primary/25",
                    "dark:focus-visible:border-primary/60 dark:focus-visible:ring-primary/35",
                ].join(" "),
            },
            {
                tone: "primary",
                variant: "ghost",
                class: [
                    "text-primary hover:bg-primary/10 hover:text-primary",
                    "focus-visible:border-primary/40 focus-visible:ring-primary/20",
                    "dark:focus-visible:border-primary/50 dark:focus-visible:ring-primary/30",
                ].join(" "),
            },
            {
                tone: "primary",
                variant: "soft",
                class: [
                    "bg-primary/10 text-primary hover:bg-primary/15",
                    "focus-visible:border-primary/45 focus-visible:ring-primary/25",
                    "dark:focus-visible:border-primary/55 dark:focus-visible:ring-primary/35",
                ].join(" "),
            },
            {
                tone: "primary",
                variant: "link",
                class: [
                    "text-primary",
                    "focus-visible:ring-primary/20",
                    "dark:focus-visible:ring-primary/30",
                ].join(" "),
            },

            // ── secondary ───────────────────────────────────────────────────────────
            {
                tone: "secondary",
                variant: "solid",
                class: [
                    "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                    "focus-visible:border-secondary/60 focus-visible:ring-secondary/35",
                    "dark:focus-visible:border-secondary/70 dark:focus-visible:ring-secondary/45",
                ].join(" "),
            },
            {
                tone: "secondary",
                variant: "outline",
                class: [
                    "border-secondary/25 bg-transparent text-secondary hover:bg-secondary/10 hover:text-secondary",
                    "focus-visible:border-secondary/50 focus-visible:ring-secondary/25",
                    "dark:focus-visible:border-secondary/60 dark:focus-visible:ring-secondary/35",
                ].join(" "),
            },
            {
                tone: "secondary",
                variant: "ghost",
                class: [
                    "text-secondary hover:bg-secondary/10 hover:text-secondary",
                    "focus-visible:border-secondary/40 focus-visible:ring-secondary/20",
                    "dark:focus-visible:border-secondary/50 dark:focus-visible:ring-secondary/30",
                ].join(" "),
            },
            {
                tone: "secondary",
                variant: "soft",
                class: [
                    "bg-secondary/10 text-secondary hover:bg-secondary/15",
                    "focus-visible:border-secondary/45 focus-visible:ring-secondary/25",
                    "dark:focus-visible:border-secondary/55 dark:focus-visible:ring-secondary/35",
                ].join(" "),
            },
            {
                tone: "secondary",
                variant: "link",
                class: [
                    "text-secondary",
                    "focus-visible:ring-secondary/20",
                    "dark:focus-visible:ring-secondary/30",
                ].join(" "),
            },

            // ── neutral ─────────────────────────────────────────────────────────────
            {
                tone: "neutral",
                variant: "solid",
                class: [
                    "bg-neutral text-neutral-foreground hover:bg-neutral/90",
                    "focus-visible:border-neutral/70 focus-visible:ring-neutral/40",
                    "dark:focus-visible:border-neutral/80 dark:focus-visible:ring-neutral/50",
                ].join(" "),
            },
            {
                tone: "neutral",
                variant: "outline",
                class: [
                    "border-neutral/25 bg-transparent text-neutral hover:bg-neutral/10 hover:text-neutral",
                    "focus-visible:border-neutral/55 focus-visible:ring-neutral/30",
                    "dark:focus-visible:border-neutral/65 dark:focus-visible:ring-neutral/40",
                ].join(" "),
            },
            {
                tone: "neutral",
                variant: "ghost",
                class: [
                    "text-neutral hover:bg-neutral/10 hover:text-neutral",
                    "focus-visible:border-neutral/45 focus-visible:ring-neutral/25",
                    "dark:focus-visible:border-neutral/55 dark:focus-visible:ring-neutral/35",
                ].join(" "),
            },
            {
                tone: "neutral",
                variant: "soft",
                class: [
                    "bg-neutral/10 text-neutral hover:bg-neutral/15",
                    "focus-visible:border-neutral/50 focus-visible:ring-neutral/30",
                    "dark:focus-visible:border-neutral/60 dark:focus-visible:ring-neutral/40",
                ].join(" "),
            },
            {
                tone: "neutral",
                variant: "link",
                class: [
                    "text-neutral",
                    "focus-visible:ring-neutral/25",
                    "dark:focus-visible:ring-neutral/35",
                ].join(" "),
            },

            // ── destructive ─────────────────────────────────────────────────────────
            {
                tone: "destructive",
                variant: "solid",
                class: [
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "focus-visible:border-destructive/60 focus-visible:ring-destructive/35",
                    "dark:focus-visible:border-destructive/70 dark:focus-visible:ring-destructive/45",
                ].join(" "),
            },
            {
                tone: "destructive",
                variant: "outline",
                class: [
                    "border-destructive/25 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive",
                    "focus-visible:border-destructive/50 focus-visible:ring-destructive/25",
                    "dark:focus-visible:border-destructive/60 dark:focus-visible:ring-destructive/35",
                ].join(" "),
            },
            {
                tone: "destructive",
                variant: "ghost",
                class: [
                    "text-destructive hover:bg-destructive/10 hover:text-destructive",
                    "focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
                    "dark:focus-visible:border-destructive/50 dark:focus-visible:ring-destructive/30",
                ].join(" "),
            },
            {
                tone: "destructive",
                variant: "soft",
                class: [
                    "bg-destructive/10 text-destructive hover:bg-destructive/20",
                    "dark:bg-destructive/20 dark:hover:bg-destructive/30",
                    "focus-visible:border-destructive/45 focus-visible:ring-destructive/25",
                    "dark:focus-visible:border-destructive/55 dark:focus-visible:ring-destructive/40",
                ].join(" "),
            },
            {
                tone: "destructive",
                variant: "link",
                class: [
                    "text-destructive",
                    "focus-visible:ring-destructive/20",
                    "dark:focus-visible:ring-destructive/30",
                ].join(" "),
            },
        ],

        defaultVariants: {
            size: "md",
            tone: "primary",
            variant: "solid",
            pending: false,
        },
    },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
