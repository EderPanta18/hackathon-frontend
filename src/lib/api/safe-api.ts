import type {
    ApiErrorResponse,
    ApiMeta,
    ApiSuccessResponse,
} from "./api.types";
import { handleApiError } from "./error-handler";

/** Resultado explícito para UI que no necesita capturar excepciones. */
export type SafeApiResult<T, M = ApiMeta | null> =
    { ok: true; data: T; meta: M } | { ok: false; error: ApiErrorResponse };

/** Conserva meta (incluida paginación) y permite mapear únicamente data. */
export async function safeApi<TOut, TRaw = TOut, M = ApiMeta | null>(
    fn: () => Promise<ApiSuccessResponse<TRaw, M>>,
    map?: (data: TRaw) => TOut,
): Promise<SafeApiResult<TOut, M>> {
    try {
        const response = await fn();

        return {
            ok: true,
            data: map ? map(response.data) : (response.data as unknown as TOut),
            meta: response.meta,
        };
    } catch (error) {
        return { ok: false, error: handleApiError(error).dto };
    }
}

/** Variante para operaciones HTTP 204 que no devuelven JSON. */
export async function safeNoContent(
    fn: () => Promise<void>,
): Promise<{ ok: true } | { ok: false; error: ApiErrorResponse }> {
    try {
        await fn();

        return { ok: true };
    } catch (error) {
        return { ok: false, error: handleApiError(error).dto };
    }
}
