/** Cliente y configuración de caché */
export { createQueryClient, getQueryClient } from "./query-client";

/** Claves de consultas */
export { resourceKeys } from "./query-keys";

export type { QueryParams, QueryScope } from "./query-keys";

/** Invalidación de recursos */
export { invalidateResourceQueries } from "./invalidate-resource";

export type { InvalidateResourceOptions } from "./invalidate-resource";
