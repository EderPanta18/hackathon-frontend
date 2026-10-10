import "server-only";

export function getBackendApiUrl(): string {
    const value = process.env.BACKEND_API_URL?.trim();

    if (!value) throw new Error("BACKEND_API_URL no está configurada");

    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol))
        throw new Error("BACKEND_API_URL debe utilizar HTTP o HTTPS");

    return url.toString().replace(/\/$/, "");
}
