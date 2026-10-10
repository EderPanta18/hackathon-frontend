"use client";

import { useEffect, useRef } from "react";
import { actionScopeRegistry } from "./action-scope.registry";
import { DEFAULT_ACTION_KEY } from "./action-scope.store";

export type UseScopedActionOptions = {
    scopeId: string;
    key?: string;
    isPending: boolean;
    canExecute?: boolean;
    executeAction: () => void | Promise<void>;
};

export function useScopedAction({
    scopeId,
    key = DEFAULT_ACTION_KEY,
    isPending,
    canExecute = true,
    executeAction,
}: UseScopedActionOptions): void {
    const executeRef = useRef(executeAction);

    useEffect(() => {
        executeRef.current = executeAction;
    }, [executeAction]);

    useEffect(() => {
        actionScopeRegistry.register(scopeId, key, () => executeRef.current());
        return () => actionScopeRegistry.unregister(scopeId, key);
    }, [scopeId, key]);

    useEffect(() => {
        actionScopeRegistry.update(scopeId, key, { isPending, canExecute });
    }, [scopeId, key, isPending, canExecute]);
}
