import "server-only";

import { SECURITY_CONFIG } from "../config";

/**
 * Permite publicar únicamente la cookie de sesión que reconoce este frontend.
 * Los atributos de dominio, ruta y SameSite se fijan para el origen del BFF.
 *
 * Este adaptador presupone que el valor es un JWT u otro token sin ';'.
 * No pretende ser un parser genérico de Set-Cookie.
 */
export function appendAccessCookie(
    upstreamHeaders: Headers,
    downstreamHeaders: Headers,
    publicUrl: URL,
): void {
    const cookieName = SECURITY_CONFIG.authCookieNames.accessToken;

    for (const rawCookie of upstreamHeaders.getSetCookie()) {
        const [nameValue, ...attributes] = rawCookie.split(";");
        const separator = nameValue?.indexOf("=") ?? -1;

        if (separator < 1) continue;

        const name = nameValue.slice(0, separator).trim();
        const value = nameValue.slice(separator + 1).trim();

        if (name !== cookieName || /[\r\n;]/.test(value)) continue;

        // Conservar la expiración para respetar el login/logout del backend.
        const expiryAttributes = attributes
            .map((attribute) => attribute.trim())
            .filter((attribute) => /^(max-age|expires)=/i.test(attribute));

        const wasSecure = attributes.some((attribute) =>
            /^\s*secure\s*$/i.test(attribute),
        );

        const normalized = [
            `${cookieName}=${value}`,
            ...expiryAttributes,
            "Path=/",
            "HttpOnly",
            "SameSite=Lax",
            ...(publicUrl.protocol === "https:" || wasSecure ? ["Secure"] : []),
        ];

        // No se copia Domain del backend: la cookie pertenece al host público de Next.js.
        downstreamHeaders.append("Set-Cookie", normalized.join("; "));
    }
}
