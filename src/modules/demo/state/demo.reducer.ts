import { demoScenario } from "../data/demo.fixtures";
import { proposalFor } from "../data/demo.selectors";
import type { CargoLine, DemoState } from "../data/demo.types";

export type DemoAction =
  | { type: "reserve"; proposalId: string; lines: readonly CargoLine[] }
  | { type: "receive"; dispatchId: string }
  | { type: "connection"; mode: "online" | "offline" };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  if (action.type === "connection") {
    return action.mode === "online" || action.mode === "offline"
      ? { ...state, connectionMode: action.mode }
      : state;
  }
  if (action.type === "receive") {
    const d = demoScenario.dispatches.find((x) => x.id === action.dispatchId);
    if (d?.status !== "en_transito" || state.receivedDispatchIds.includes(d.id)) return state;
    return { ...state, receivedDispatchIds: [...state.receivedDispatchIds, d.id] };
  }
  const current = proposalFor(action.proposalId, state);
  if (!current || current.reserved) return state;
  const lines = current.lines
    .filter((x) => x.quantity > 0)
    .map(({ itemId, quantity }) => ({ itemId, quantity }));
  if (
    !lines.length ||
    lines.length !== action.lines.length ||
    new Set(action.lines.map((x) => x.itemId)).size !== action.lines.length ||
    !lines.every((l) =>
      action.lines.some((x) => x.itemId === l.itemId && x.quantity === l.quantity),
    )
  )
    return state;
  return {
    ...state,
    reservedProposals: { ...state.reservedProposals, [action.proposalId]: lines },
  };
}
