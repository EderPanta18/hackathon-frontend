import { actionScopeStore, type ActionState } from "./action-scope.store";

type Executor = () => void | Promise<void>;

const executors = new Map<string, Map<string, Executor>>();

const running = new Set<string>();

function actionId(scopeId: string, key: string): string {
    return JSON.stringify([scopeId, key]);
}

function isEligible(scopeId: string, key: string): boolean {
    const action = actionScopeStore.scopes[scopeId]?.actions[key];

    return Boolean(
        action?.canExecute &&
        !action.isPending &&
        !running.has(actionId(scopeId, key)) &&
        executors.get(scopeId)?.has(key),
    );
}

export const actionScopeRegistry = {
    register(scopeId: string, key: string, executor: Executor): void {
        let scopeExecutors = executors.get(scopeId);

        if (!scopeExecutors) {
            scopeExecutors = new Map();

            executors.set(scopeId, scopeExecutors);
        }

        if (scopeExecutors.has(key))
            throw new Error(`Acción duplicada: ${scopeId}/${key}`);

        scopeExecutors.set(key, executor);

        actionScopeStore.scopes[scopeId] ??= { actions: {} };
        actionScopeStore.scopes[scopeId].actions[key] = {
            isPending: false,
            canExecute: false,
        };
    },

    update(scopeId: string, key: string, state: ActionState): void {
        const action = actionScopeStore.scopes[scopeId]?.actions[key];

        if (action) Object.assign(action, state);
    },

    unregister(scopeId: string, key: string): void {
        const scope = actionScopeStore.scopes[scopeId];

        if (scope) {
            delete scope.actions[key];

            if (Object.keys(scope.actions).length === 0)
                delete actionScopeStore.scopes[scopeId];
        }

        const scopeExecutors = executors.get(scopeId);
        scopeExecutors?.delete(key);

        if (scopeExecutors?.size === 0) executors.delete(scopeId);
    },

    async execute(scopeId: string, key: string): Promise<void> {
        if (!isEligible(scopeId, key)) return;

        const executor = executors.get(scopeId)?.get(key);

        if (!executor) return;

        const id = actionId(scopeId, key);
        running.add(id);

        try {
            await executor();
        } finally {
            running.delete(id);
        }
    },

    executeAll(scopeId: string): Promise<PromiseSettledResult<void>[]> {
        const actions = actionScopeStore.scopes[scopeId]?.actions;

        if (!actions) return Promise.resolve([]);

        const eligible = Object.keys(actions).filter((key) =>
            isEligible(scopeId, key),
        );

        return Promise.allSettled(
            eligible.map((key) => actionScopeRegistry.execute(scopeId, key)),
        );
    },
};
