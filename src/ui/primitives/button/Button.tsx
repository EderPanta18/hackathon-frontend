// src/ui/primitives/button/Button.tsx

"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import {
    Children,
    forwardRef,
    isValidElement,
    type MouseEventHandler,
} from "react";
import { APP_CONFIG } from "@/lib/config";
import { cn } from "@/lib/styling";
import { BUTTON_DEFAULTS } from "./button.constants";
import {
    getButtonDotAnimationStyle,
    getButtonDotIndexes,
    getButtonPendingStyles,
    resolveButtonLayout,
    resolveButtonType,
    resolveButtonVisualState,
} from "./button.helpers";
import type { ButtonProps } from "./button.types";
import { buttonVariants } from "./button.variants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        {
            type = BUTTON_DEFAULTS.type,
            size = BUTTON_DEFAULTS.size,
            tone = BUTTON_DEFAULTS.tone,
            variant = BUTTON_DEFAULTS.variant,
            pending = BUTTON_DEFAULTS.pending,
            announceLabel = BUTTON_DEFAULTS.announceLabel,
            disabled = BUTTON_DEFAULTS.disabled,
            asChild,
            onClick,
            classNames,
            className,
            children,
            ...props
        },
        ref,
    ) {
        const layout = resolveButtonLayout(size);
        const visualState = resolveButtonVisualState(disabled, pending);

        const isPending = visualState.pending;
        const isDisabled = visualState.disabled || visualState.pending;

        const pendingStyles = getButtonPendingStyles(size);

        const rootClassName = cn(
            "relative isolate",
            buttonVariants({ size, tone, variant, pending: isPending }),
            isPending && !layout.isIconSize && pendingStyles.bottomPadding,
            className,
        );

        const handleClick: MouseEventHandler<HTMLElement> = (event) => {
            if (isDisabled && asChild) {
                event.preventDefault();
                event.stopPropagation();

                return;
            }
            onClick?.(event as never);
        };

        const pendingDotsOverlay = isPending ? (
            <span
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute flex items-center justify-center",
                    layout.isIconSize
                        ? "inset-0"
                        : cn("inset-x-0", pendingStyles.dotsPosition),
                    pendingStyles.dotsGap,
                    classNames?.loader,
                )}
            >
                {getButtonDotIndexes().map((dotIndex) => (
                    <span
                        key={dotIndex}
                        className={cn(
                            "rounded-full bg-current/80 motion-safe:animate-[button-loading-dot_1.05s_ease-in-out_infinite]",
                            pendingStyles.dotSize,
                            classNames?.dot,
                        )}
                        style={getButtonDotAnimationStyle(dotIndex)}
                    />
                ))}
            </span>
        ) : null;

        if (asChild) {
            if (
                APP_CONFIG.isDevelopment &&
                !(Children.count(children) === 1 && isValidElement(children))
            )
                console.error(
                    "[Button] asChild requiere exactamente un elemento React como hijo.",
                );

            return (
                <Slot
                    ref={ref as never}
                    aria-disabled={isDisabled ? true : undefined}
                    aria-busy={isPending || undefined}
                    className={rootClassName}
                    onClick={handleClick}
                    {...props}
                >
                    {pendingDotsOverlay}
                    <Slottable>{children}</Slottable>
                    {isPending && (
                        <span className="sr-only">{announceLabel}</span>
                    )}
                </Slot>
            );
        }

        return (
            <button
                ref={ref}
                type={resolveButtonType(type)}
                disabled={isDisabled}
                aria-busy={isPending || undefined}
                className={rootClassName}
                onClick={onClick}
                {...props}
            >
                <span
                    className={cn(
                        layout.isIconSize
                            ? cn(
                                  "inline-flex items-center justify-center",
                                  isPending &&
                                      "opacity-0 transition-opacity duration-150",
                              )
                            : "inline-flex min-w-0 items-center justify-center gap-1.5",
                        classNames?.content,
                    )}
                >
                    {children}
                </span>

                {pendingDotsOverlay}

                {isPending && <span className="sr-only">{announceLabel}</span>}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
