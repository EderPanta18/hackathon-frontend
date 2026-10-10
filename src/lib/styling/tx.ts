function withPrefix(prefix: string, className?: string): string | undefined {
    if (!className) return undefined;

    return className
        .split(" ")
        .filter(Boolean)
        .map((token) => `${prefix}:${token}`)
        .join(" ");
}

export const tx = {
    focus(cn?: string) {
        return withPrefix("focus", cn);
    },
    focusVisible(cn?: string) {
        return withPrefix("focus-visible", cn);
    },
    hover(cn?: string) {
        return withPrefix("hover", cn);
    },
    active(cn?: string) {
        return withPrefix("active", cn);
    },
    placeholder(cn?: string) {
        return withPrefix("placeholder", cn);
    },
    disabled(cn?: string) {
        return withPrefix("disabled", cn);
    },
    groupHover(cn?: string) {
        return withPrefix("group-hover", cn);
    },
    peerFocusVisible(cn?: string) {
        return withPrefix("peer-focus-visible", cn);
    },
    custom(prefix: string, cn?: string) {
        return withPrefix(prefix, cn);
    },
} as const;
