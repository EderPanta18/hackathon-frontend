import type { ApiErrorResponse, ApiValidationIssue } from "./api.types";

function groupFieldErrors(
    errors: readonly ApiValidationIssue[] = [],
): Record<string, string[]> {
    const grouped: Record<string, string[]> = {};

    for (const issue of errors) {
        if (!grouped[issue.field]) grouped[issue.field] = [];

        grouped[issue.field].push(issue.message);
    }

    return grouped;
}

/** Error lanzado por el cliente HTTP sin perder la respuesta Problem Details. */
export class ApiError extends Error {
    readonly status: number;
    readonly code: string;
    readonly type: string;
    readonly requestId?: string;
    readonly errors?: ApiValidationIssue[];
    readonly fieldErrors: Record<string, string[]>;
    readonly dto: ApiErrorResponse;

    constructor(problem: ApiErrorResponse) {
        super(problem.detail || problem.title);
        this.name = "ApiError";
        this.status = problem.status;
        this.code = problem.code ?? "HTTP_ERROR";
        this.type = problem.type;
        this.requestId = problem.requestId;
        this.errors = problem.errors;
        this.fieldErrors = groupFieldErrors(problem.errors);
        this.dto = problem;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
