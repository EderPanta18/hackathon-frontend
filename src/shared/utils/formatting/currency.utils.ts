export function formatCurrency(
    amount: number,
    currency = "PEN",
    locale = "es-PE",
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatPEN(amount?: number | null): string {
    return formatCurrency(amount ?? 0, "PEN", "es-PE");
}
