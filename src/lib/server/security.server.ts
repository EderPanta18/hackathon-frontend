import "server-only";

export function getAccessTokenVerificationSource() {
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) throw new Error("JWT_ACCESS_SECRET no está configurado");

    const key = new TextEncoder().encode(secret);

    if (key.byteLength < 32)
        throw new Error("JWT_ACCESS_SECRET debe tener al menos 32 bytes");

    return {
        type: "shared-secret",
        algorithm: "HS256",
        key,
    } as const;
}
