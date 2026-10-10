/** Alcance de una consulta: cuenta, organización, tenant, etc. */
export type QueryScope = Readonly<
    Record<string, string | number | boolean | null>
>;

/** Filtros, búsqueda, paginación y demás parámetros serializables. */
export type QueryParams = Readonly<Record<string, unknown>>;

export const resourceKeys = {
    all: (resource: string) => ["resource", resource] as const,

    scoped: (resource: string, scope: QueryScope = {}) =>
        [...resourceKeys.all(resource), { scope }] as const,

    lists: (resource: string, scope: QueryScope = {}) =>
        [...resourceKeys.scoped(resource, scope), "list"] as const,

    list: (
        resource: string,
        params: QueryParams = {},
        scope: QueryScope = {},
    ) => [...resourceKeys.lists(resource, scope), params] as const,

    details: (resource: string, scope: QueryScope = {}) =>
        [...resourceKeys.scoped(resource, scope), "detail"] as const,

    detail: (resource: string, id: string | number, scope: QueryScope = {}) =>
        [...resourceKeys.details(resource, scope), id] as const,
};
