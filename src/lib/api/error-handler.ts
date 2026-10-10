import axios from "axios";
import type { ApiErrorResponse } from "./api.types";
import { ApiError } from "./api-error";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Solo valida la forma general. La validación de datos de dominio usa Zod. */
export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
    if (!isObject(value)) return false;

    return (
        value.success === false &&
        typeof value.type === "string" &&
        typeof value.title === "string" &&
        typeof value.status === "number" &&
        Number.isFinite(value.status) &&
        (value.code === undefined || typeof value.code === "string") &&
        (value.detail === undefined || typeof value.detail === "string") &&
        (value.requestId === undefined ||
            typeof value.requestId === "string") &&
        (value.errors === undefined ||
            (Array.isArray(value.errors) &&
                value.errors.every(
                    (issue) =>
                        isObject(issue) &&
                        typeof issue.field === "string" &&
                        typeof issue.code === "string" &&
                        typeof issue.message === "string",
                )))
    );
}

const DEFAULT_TITLES: Record<number, string> = {
    400: "Solicitud inválida",
    401: "Autenticación requerida",
    403: "Acceso denegado",
    404: "Recurso no encontrado",
    408: "Tiempo de espera agotado",
    409: "Conflicto",
    422: "Datos no procesables",
    429: "Demasiadas solicitudes",
    500: "Error interno del servidor",
    502: "Error de comunicación con el servidor",
    503: "Servicio no disponible",
    504: "Servidor sin respuesta",
};

/** Errores locales/HTTP sin Problem Details válido: misma forma pública. */
export function createApiClientError(
    code: string,
    status: number,
    detail?: string,
): ApiError {
    return new ApiError({
        success: false,
        type: "about:blank",
        title: DEFAULT_TITLES[status] ?? "Error de comunicación",
        status,
        code,
        ...(detail ? { detail } : {}),
    });
}

export function handleApiError(error: unknown): ApiError {
    if (error instanceof ApiError) return error;

    if (isApiErrorResponse(error)) return new ApiError(error);

    if (axios.isAxiosError(error)) {
        if (error.response) {
            const { data, status } = error.response;

            if (isApiErrorResponse(data))
                // El código HTTP real tiene prioridad si el body es inconsistente.
                return new ApiError({ ...data, status });

            return createApiClientError("HTTP_ERROR", status);
        }

        if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT")
            return createApiClientError(
                "REQUEST_TIMEOUT",
                0,
                "La solicitud excedió el tiempo de espera.",
            );

        if (error.code === "ERR_CANCELED")
            return createApiClientError(
                "REQUEST_CANCELED",
                0,
                "La solicitud fue cancelada.",
            );

        return createApiClientError(
            "NETWORK_ERROR",
            0,
            "No se pudo establecer comunicación.",
        );
    }

    // No exponemos excepciones internas o configuraciones del servidor en la UI.
    return createApiClientError(
        "CLIENT_ERROR",
        0,
        "No se pudo completar la operación.",
    );
}

/** Descargas con responseType=blob: Axios también devuelve errores como Blob. */
export async function handleApiDownloadError(
    error: unknown,
): Promise<ApiError> {
    if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
        const response = error.response;
        const blob = response.data as Blob;
        const contentType = String(
            response.headers?.["content-type"] ?? blob.type,
        );

        if (contentType.includes("json") && blob.size <= 64 * 1024) {
            try {
                const value: unknown = JSON.parse(await blob.text());

                if (isApiErrorResponse(value))
                    return new ApiError({ ...value, status: response.status });
            } catch {
                // Si el cuerpo es inválido, se conserva el estado HTTP.
            }
        }
    }

    return handleApiError(error);
}
