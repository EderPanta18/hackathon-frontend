/** Normaliza rutas para comparaciones; no valida autorizaciones ni URLs externas. */
export function normalizeRoutePath(path: string | null | undefined): string {
    if (!path || !path.startsWith("/")) return "";

    const pathname = path.split(/[?#]/, 1)[0] ?? "";

    return pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
}
