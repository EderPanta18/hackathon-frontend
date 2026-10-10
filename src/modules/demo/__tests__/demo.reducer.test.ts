import { describe, expect, it } from "vitest";
import { demoScenario } from "../data/demo.fixtures";
import { initialDemoState, inventoryFor, needFor, proposalFor } from "../data/demo.selectors";
import { demoReducer } from "../state/demo.reducer";

const offered = (id: string, state = initialDemoState) =>
  proposalFor(id, state)
    ?.lines.filter((x) => x.quantity > 0)
    .map(({ itemId, quantity }) => ({ itemId, quantity })) ?? [];
describe("simulación local", () => {
  it("reserva parcialmente una vez y rechaza resúmenes obsoletos atómicamente", () => {
    const before = JSON.stringify(demoScenario.dispatches);
    const stale = offered("prop-02");
    const action = { type: "reserve", proposalId: "prop-01", lines: offered("prop-01") } as const;
    const next = demoReducer(initialDemoState, action);
    expect(inventoryFor("alm-01", "agua", next).available).toBe(40);
    expect(inventoryFor("alm-01", "alimentos", next).available).toBe(0);
    expect(demoReducer(next, action)).toBe(next);
    expect(demoReducer(next, { type: "reserve", proposalId: "prop-02", lines: stale })).toBe(next);
    expect(
      demoReducer(next, {
        type: "reserve",
        proposalId: "prop-02",
        lines: [{ itemId: "agua", quantity: 999 }],
      }),
    ).toBe(next);
    expect(demoReducer(next, { type: "reserve", proposalId: "missing", lines: [] })).toBe(next);
    expect(JSON.stringify(demoScenario.dispatches)).toBe(before);
    expect(needFor("alb-01", "agua", next)).toMatchObject({
      received: 0,
      committed: 80,
      uncovered: 0,
    });
  });
  it("recibe sólo tránsito una vez, sin alterar stock ni necesidades sin compromiso", () => {
    const action = { type: "receive", dispatchId: "DES-DEMO-002" } as const;
    const next = demoReducer(initialDemoState, action);
    expect(next.receivedDispatchIds).toEqual(["DES-DEMO-002"]);
    expect(demoReducer(next, action)).toBe(next);
    for (const id of ["DES-DEMO-001", "DES-DEMO-003", "invalid"])
      expect(demoReducer(next, { type: "receive", dispatchId: id })).toBe(next);
    expect(inventoryFor("alm-01", "agua", next)).toEqual(inventoryFor("alm-01", "agua"));
    expect(needFor("alb-02", "agua", next).uncovered).toBe(needFor("alb-02", "agua").uncovered);
  });
  it("offline sólo modifica el aviso y el estado inicial permite otro recorrido", () => {
    const next = demoReducer(initialDemoState, { type: "connection", mode: "offline" });
    expect({ ...next, connectionMode: "online" }).toEqual(initialDemoState);
    const reserved = demoReducer(next, {
      type: "reserve",
      proposalId: "prop-01",
      lines: offered("prop-01"),
    });
    expect(reserved.reservedProposals["prop-01"]).toBeDefined();
    expect(demoReducer(reserved, { type: "connection", mode: "online" }).reservedProposals).toBe(
      reserved.reservedProposals,
    );
    expect(initialDemoState.reservedProposals).toEqual({});
  });
});
