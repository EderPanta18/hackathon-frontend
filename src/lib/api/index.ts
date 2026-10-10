/** Cliente HTTP público */
export { apiClient } from "./api";
export type { ApiRequestConfig, UploadOptions } from "./api";

/** Manejo de errores */
export { ApiError } from "./api-error";

/** Operaciones seguras */
export { safeApi, safeNoContent } from "./safe-api";
export type { SafeApiResult } from "./safe-api";

/** Contratos del backend */
export type {
    ApiErrorResponse,
    ApiMeta,
    ApiResponse,
    ApiResult,
    ApiSuccessResponse,
    ApiValidationIssue,
    PageMeta,
    PaginatedResponse,
    PaginatedSuccessResponse,
} from "./api.types";
