import { demoScenario as s } from "./demo.fixtures";
import type { CargoLine, DemoState, Dispatch } from "./demo.types";

export const initialDemoState: DemoState = {
  reservedProposals: {},
  receivedDispatchIds: [],
  connectionMode: "online",
};
const amount = (lines: readonly CargoLine[], itemId: string) =>
  lines.find((l) => l.itemId === itemId)?.quantity ?? 0;
export const dispatchStatus = (d: Dispatch, state: DemoState) =>
  state.receivedDispatchIds.includes(d.id) ? "recibido" : d.status;
export function inventoryFor(
  warehouseId: string,
  itemId: string,
  state: DemoState = initialDemoState,
) {
  const onHand =
    s.inventory.find((x) => x.warehouseId === warehouseId && x.itemId === itemId)?.onHand ?? 0;
  const reservedBaseline = s.dispatches
    .filter((d) => d.warehouseId === warehouseId && d.status === "preparado")
    .reduce((n, d) => n + amount(d.lines, itemId), 0);
  const reservedNew = s.proposals
    .filter((p) => p.warehouseId === warehouseId)
    .reduce((n, p) => n + amount(state.reservedProposals[p.id] ?? [], itemId), 0);
  return {
    onHand,
    reservedBaseline,
    reservedNew,
    available: onHand - reservedBaseline - reservedNew,
  };
}
export function needFor(shelterId: string, itemId: string, state: DemoState = initialDemoState) {
  const required =
    s.needs.find((x) => x.shelterId === shelterId && x.itemId === itemId)?.required ?? 0;
  const dispatches = s.dispatches.filter((d) => d.shelterId === shelterId);
  const received = dispatches
    .filter((d) => dispatchStatus(d, state) === "recibido")
    .reduce((n, d) => n + amount(d.lines, itemId), 0);
  const newReservations = s.proposals
    .filter((p) => p.shelterId === shelterId)
    .reduce((n, p) => n + amount(state.reservedProposals[p.id] ?? [], itemId), 0);
  const committed =
    newReservations +
    dispatches
      .filter((d) => dispatchStatus(d, state) !== "recibido")
      .reduce((n, d) => n + amount(d.lines, itemId), 0);
  const pendingReceipt = required - received;
  return { required, received, committed, pendingReceipt, uncovered: pendingReceipt - committed };
}
export function proposalFor(id: string, state: DemoState = initialDemoState) {
  const proposal = s.proposals.find((p) => p.id === id);
  if (!proposal) return undefined;
  const reserved = state.reservedProposals[id];
  return {
    proposal,
    reserved: Boolean(reserved),
    lines: proposal.lines.map((l) => {
      const need = needFor(proposal.shelterId, l.itemId, state);
      const stock = inventoryFor(proposal.warehouseId, l.itemId, state);
      const quantity = reserved
        ? amount(reserved, l.itemId)
        : Math.min(l.quantity, stock.available, need.uncovered);
      return {
        itemId: l.itemId,
        nominal: l.quantity,
        quantity,
        shortfall: reserved ? need.uncovered : need.uncovered - quantity,
        ...need,
        ...stock,
      };
    }),
  };
}
export function documentFor(id: string, state: DemoState = initialDemoState) {
  const d = s.dispatches.find((x) => x.id === id);
  if (!d) return undefined;
  const origin = s.warehouses.find((x) => x.id === d.warehouseId);
  const destination = s.shelters.find((x) => x.id === d.shelterId);
  const vehicle = s.vehicles.find((x) => x.id === d.vehicleId);
  if (!origin || !destination || !vehicle) return undefined;
  return {
    id: d.id,
    origin: origin.name,
    destination: destination.name,
    vehicle: `${vehicle.label} · ${vehicle.demoRegistration}`,
    status: dispatchStatus(d, state),
    referenceDate: s.referenceDate,
    lines: d.lines.map((l) => ({
      ...l,
      label: s.items.find((i) => i.id === l.itemId)?.label ?? "",
      unit: s.items.find((i) => i.id === l.itemId)?.unit ?? "",
    })),
  };
}
export type DemoDocumentData = NonNullable<ReturnType<typeof documentFor>>;

export function sheltersFor(territory = "", priority = "") {
  return s.shelters.filter(
    (x) => (!territory || x.territoryId === territory) && (!priority || x.priority === priority),
  );
}
export function indicatorsFor(territory = "", priority = "", state: DemoState = initialDemoState) {
  const shelters = sheltersFor(territory, priority);
  return {
    shelters: shelters.length,
    population: shelters.reduce((n, x) => n + x.population, 0),
    highPriority: shelters.filter((x) => x.priority === "alta").length,
    uncoveredNeeds: shelters.reduce(
      (n, x) => n + s.items.filter((i) => needFor(x.id, i.id, state).uncovered > 0).length,
      0,
    ),
  };
}
