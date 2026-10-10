import axios, {
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from "axios";
import { APP_CONFIG, API_CONFIG } from "../config";
import { createApiClientError } from "./error-handler";

function logRequest(config: InternalAxiosRequestConfig): void {
    if (!APP_CONFIG.isDevelopment) return;

    // Jamás registrar payloads, cabeceras, cookies, JWT o parámetros sensibles.
    console.debug("[API][REQUEST]", {
        method: config.method?.toUpperCase(),
        path: config.url?.split("?")[0],
    });
}

function logResponse(response: AxiosResponse): void {
    if (!APP_CONFIG.isDevelopment) return;

    console.debug("[API][RESPONSE]", {
        method: response.config.method?.toUpperCase(),
        path: response.config.url?.split("?")[0],
        status: response.status,
    });
}

export function setupHttpInterceptors(http: AxiosInstance): void {
    http.interceptors.request.use((config) => {
        // Impide que un endpoint absoluto salte el BFF del mismo origen.
        if (
            !config.url?.startsWith("/") ||
            config.url.startsWith("//") ||
            config.baseURL !== API_CONFIG.proxyRoutePrefix
        )
            throw createApiClientError(
                "INVALID_API_PATH",
                0,
                "La ruta debe comenzar por / y utilizar el proxy interno.",
            );

        // Axios calcula el multipart boundary; no imponer JSON a FormData.
        if (typeof FormData !== "undefined" && config.data instanceof FormData)
            config.headers.delete("Content-Type");

        logRequest(config);

        return config;
    });

    http.interceptors.response.use(
        (response) => {
            logResponse(response);
            return response;
        },
        (error: unknown) => {
            if (APP_CONFIG.isDevelopment && axios.isAxiosError(error))
                console.error("[API][ERROR]", {
                    method: error.config?.method?.toUpperCase(),
                    path: error.config?.url?.split("?")[0],
                    status: error.response?.status ?? null,
                    code: error.code ?? null,
                });

            return Promise.reject(error);
        },
    );
}

export default setupHttpInterceptors;
