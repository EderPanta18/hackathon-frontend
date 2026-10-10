/** Contrato de paginación del backend: withPages({ includePageCount: true }). */
export type PageMeta = {
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
};

/** Metadatos extensibles; pagination solo existe cuando el endpoint pagina. */
export type ApiMeta = {
    pagination?: PageMeta;
    [key: string]: unknown;
};

export type ApiSuccessResponse<T, M = ApiMeta | null> = {
    success: true;
    data: T;
    meta: M;
};

export type PaginatedSuccessResponse<T> = ApiSuccessResponse<
    T[],
    ApiMeta & { pagination: PageMeta }
>;

export type ApiValidationIssue = {
    field: string;
    code: string;
    message: string;
};

/** RFC 9457 + extensiones del backend. */
export type ApiErrorResponse = {
    success: false;
    type: string;
    title: string;
    status: number;
    detail?: string;
    code?: string;
    instance?: string;
    requestId?: string;
    errors?: ApiValidationIssue[];
};

export type ApiResponse<T, M = ApiMeta | null> = ApiSuccessResponse<T, M>;

export type PaginatedResponse<T> = PaginatedSuccessResponse<T>;

export type ApiResult<T, M = ApiMeta | null> =
    ApiSuccessResponse<T, M> | ApiErrorResponse;
