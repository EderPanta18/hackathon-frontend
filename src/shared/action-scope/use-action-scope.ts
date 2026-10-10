"use client";

import { useSnapshot } from "valtio";
import { actionScopeRegistry } from "./action-scope.registry";
import { actionScopeStore, DEFAULT_ACTION_KEY } from "./action-scope.store";

export function useActionScope(scopeId: string, key?: string) {
    const snapshot = useSnapshot(actionScopeStore);

    const actions = snapshot.scopes[scopeId]?.actions;

    const selected = key
        ? actions?.[key]
            ? [actions[key]]
            : []
        : Object.values(actions ?? {});

    return {
        isPending: selected.some((action) => action.isPending),

        canExecute: selected.some(
            (action) => action.canExecute && !action.isPending,
        ),

        execute: (actionKey = key ?? DEFAULT_ACTION_KEY) =>
            actionScopeRegistry.execute(scopeId, actionKey),

        executeAll: () => actionScopeRegistry.executeAll(scopeId),
    };
}
