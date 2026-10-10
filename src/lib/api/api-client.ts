import axios from "axios";
import { API_CONFIG } from "@/lib/config/api.config";
import { setupHttpInterceptors } from "./api.interceptor";

/**
 * Cliente de solicitudes ORIGINADAS EN EL NAVEGADOR.
 * Apunta al BFF de Next.js, nunca a BACKEND_API_URL.
 * Para Server Components usar un transporte server-only que reenvíe las cookies.
 */
export const httpClient = axios.create({
    baseURL: API_CONFIG.proxyRoutePrefix,
    timeout: API_CONFIG.requestTimeoutMs,
    withCredentials: true,
    headers: {
        Accept: "application/json, application/problem+json",
    },
    paramsSerializer: {
        indexes: null,
    },
});

setupHttpInterceptors(httpClient);

export default httpClient;
