import { proxy } from "valtio";

export const DEFAULT_ACTION_KEY = "__default__";

export type ActionState = {
    isPending: boolean;
    canExecute: boolean;
};

type ActionScopeState = {
    scopes: Record<string, { actions: Record<string, ActionState> }>;
};

export const actionScopeStore = proxy<ActionScopeState>({ scopes: {} });
