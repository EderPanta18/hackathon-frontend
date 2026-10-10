import { httpClient } from "./api-client";
import type {
    ApiSuccessResponse,
    PageMeta,
    PaginatedSuccessResponse,
} from "./api.types";
import {
    createApiClientError,
    handleApiDownloadError,
    handleApiError,
} from "./error-handler";
import type { AxiosProgressEvent, AxiosRequestConfig, Method } from "axios";

/** No se permite sustituir la URL base, el método ni las credenciales del BFF. */
export type ApiRequestConfig = Pick<
    AxiosRequestConfig,
    "headers" | "params" | "signal" | "timeout" | "onDownloadProgress"
>;

export type UploadOptions = {
    config?: ApiRequestConfig;
    onUploadProgress?: (event: AxiosProgressEvent) => void;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertSuccessEnvelope<T>(value: unknown): ApiSuccessResponse<T> {
    if (
        !isRecord(value) ||
        value.success !== true ||
        !("data" in value) ||
        !("meta" in value) ||
        !(value.meta === null || isRecord(value.meta))
    )
        throw createApiClientError(
            "INVALID_API_RESPONSE",
            502,
            "La respuesta no cumple el contrato de la API.",
        );

    return value as unknown as ApiSuccessResponse<T>;
}

function isPageMeta(value: unknown): value is PageMeta {
    if (!isRecord(value)) return false;

    return (
        typeof value.currentPage === "number" &&
        Number.isInteger(value.currentPage) &&
        typeof value.isFirstPage === "boolean" &&
        typeof value.isLastPage === "boolean" &&
        (value.previousPage === null ||
            (typeof value.previousPage === "number" &&
                Number.isInteger(value.previousPage))) &&
        (value.nextPage === null ||
            (typeof value.nextPage === "number" &&
                Number.isInteger(value.nextPage))) &&
        typeof value.pageCount === "number" &&
        Number.isInteger(value.pageCount) &&
        typeof value.totalCount === "number" &&
        Number.isInteger(value.totalCount)
    );
}

async function executeRequest<T, D = unknown>(
    method: Method,
    url: string,
    data?: D,
    config?: ApiRequestConfig,
): Promise<ApiSuccessResponse<T>> {
    try {
        const response = await httpClient.request<unknown>({
            ...config,
            method,
            url,
            data,
            responseType: "json",
        });

        // 204 no posee envelope; usar apiClient.noContent para ese contrato.
        if (response.status === 204)
            throw createApiClientError(
                "UNEXPECTED_NO_CONTENT",
                502,
                "El endpoint devolvió 204; utiliza apiClient.noContent().",
            );

        return assertSuccessEnvelope<T>(response.data);
    } catch (error) {
        throw handleApiError(error);
    }
}

async function executePaginatedRequest<T>(
    url: string,
    config?: ApiRequestConfig,
): Promise<PaginatedSuccessResponse<T>> {
    const result = await executeRequest<T[]>("GET", url, undefined, config);

    if (
        !Array.isArray(result.data) ||
        !isRecord(result.meta) ||
        !isPageMeta(result.meta.pagination)
    )
        throw createApiClientError(
            "INVALID_PAGINATION_RESPONSE",
            502,
            "El endpoint no devolvió meta.pagination válida.",
        );

    return result as PaginatedSuccessResponse<T>;
}

async function executeNoContentRequest<D = unknown>(
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    data?: D,
    config?: ApiRequestConfig,
): Promise<void> {
    try {
        const response = await httpClient.request<unknown>({
            ...config,
            method,
            url,
            data,
        });

        if (response.status !== 204)
            throw createApiClientError(
                "UNEXPECTED_API_RESPONSE",
                502,
                "El endpoint debía devolver HTTP 204 No Content.",
            );
    } catch (error) {
        throw handleApiError(error);
    }
}

function uploadResource<T = unknown>(
    url: string,
    formData: FormData,
    options: UploadOptions = {},
): Promise<ApiSuccessResponse<T>> {
    const { config, onUploadProgress } = options;

    // Se conserva multipart/form-data con boundary calculado por Axios.
    return executeUpload<T>(url, formData, config, onUploadProgress);
}

async function executeUpload<T>(
    url: string,
    formData: FormData,
    config?: ApiRequestConfig,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
): Promise<ApiSuccessResponse<T>> {
    try {
        const response = await httpClient.post<unknown>(url, formData, {
            ...config,
            onUploadProgress,
        });

        return assertSuccessEnvelope<T>(response.data);
    } catch (error) {
        throw handleApiError(error);
    }
}

async function downloadResource(
    url: string,
    config?: ApiRequestConfig,
): Promise<Blob> {
    try {
        const response = await httpClient.get<Blob>(url, {
            ...config,
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        throw await handleApiDownloadError(error);
    }
}

export const apiClient = {
    get<T = unknown>(url: string, config?: ApiRequestConfig) {
        return executeRequest<T>("GET", url, undefined, config);
    },
    post<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: ApiRequestConfig,
    ) {
        return executeRequest<T, D>("POST", url, data, config);
    },
    put<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: ApiRequestConfig,
    ) {
        return executeRequest<T, D>("PUT", url, data, config);
    },
    patch<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: ApiRequestConfig,
    ) {
        return executeRequest<T, D>("PATCH", url, data, config);
    },
    delete<T = unknown>(url: string, config?: ApiRequestConfig) {
        return executeRequest<T>("DELETE", url, undefined, config);
    },
    getPaginated<T = unknown>(url: string, config?: ApiRequestConfig) {
        return executePaginatedRequest<T>(url, config);
    },
    /** Para endpoints cuyo contrato HTTP es exactamente 204 No Content. */
    noContent: executeNoContentRequest,
    upload: uploadResource,
    download: downloadResource,
};

export default apiClient;
