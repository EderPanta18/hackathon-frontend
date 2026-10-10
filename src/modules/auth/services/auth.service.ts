import { apiClient } from "@/lib/api";
import type { LoginCredentialsDTO } from "../contracts";

const AUTH_ENDPOINTS = {
    login: "/auth/login",
} as const;

async function login(credentials: LoginCredentialsDTO): Promise<void> {
    // NestJS establece la cookie HttpOnly mediante la respuesta del BFF.
    // El frontend no almacena ni manipula el access token.
    await apiClient.post<unknown>(AUTH_ENDPOINTS.login, credentials);
}

export const authService = { login };
