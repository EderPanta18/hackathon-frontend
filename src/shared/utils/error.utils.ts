/** Convierte un error a un objeto plano para diagnóstico; no expone el stack por defecto. */
export function serializeError(error: unknown): Record<string, unknown> {
    if (error instanceof Error)
        return { name: error.name, message: error.message };

    if (typeof error === "object" && error !== null) return { ...error };

    return { value: error };
}

export function getErrorSummary(error: unknown): string {
    if (error instanceof Error) return error.message;

    if (typeof error === "string") return error;

    if (typeof error === "object" && error !== null && "message" in error) {
        const message = error.message;

        if (typeof message === "string") return message;
    }

    return "Error desconocido";
}
