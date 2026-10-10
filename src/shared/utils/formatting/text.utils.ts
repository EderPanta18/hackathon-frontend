function capitalizeWord(value: string): string {
    return value
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : "";
}

export function capitalizeWords(
    value: string | readonly string[] | null | undefined,
): string {
    if (!value) return "";

    const text = typeof value === "string" ? value : value.join(" ");

    return text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(capitalizeWord)
        .join(" ");
}

export function normalizeText(value?: string | null, fallback = ""): string {
    return value?.trim() ?? fallback;
}

export function normalizeTextOptional(value?: string | null): string | null {
    return value?.trim() || null;
}
