import { describe, expect, it } from "vitest";
import { demoScenario as s } from "../data/demo.fixtures";

describe("escenario DEMO", () => {
  it("mantiene identificadores, referencias y claves únicas", () => {
    for (const group of [
      s.shelters,
      s.items,
      s.warehouses,
      s.proposals,
      s.vehicles,
      s.dispatches,
      s.territories,
      s.zones,
    ]) {
      expect(new Set(group.map((x) => x.id)).size).toBe(group.length);
    }
    for (const rows of [
      s.inventory.map((x) => `${x.warehouseId}/${x.itemId}`),
      s.needs.map((x) => `${x.shelterId}/${x.itemId}`),
    ])
      expect(new Set(rows).size).toBe(rows.length);
    expect(s.shelters.some((x) => x.id === s.defaultShelterId)).toBe(true);
    expect(s.dispatches.some((x) => x.id === s.defaultDispatchId)).toBe(true);
    for (const shelter of s.shelters)
      expect(s.territories.some((x) => x.id === shelter.territoryId)).toBe(true);
    for (const row of s.needs) {
      expect(s.shelters.some((x) => x.id === row.shelterId)).toBe(true);
      expect(Number.isInteger(row.required) && row.required >= 0).toBe(true);
    }
    for (const row of s.inventory) {
      expect(s.warehouses.some((x) => x.id === row.warehouseId)).toBe(true);
      expect(Number.isInteger(row.onHand) && row.onHand >= 0).toBe(true);
    }
    for (const cargo of [...s.proposals, ...s.dispatches]) {
      expect(s.shelters.some((x) => x.id === cargo.shelterId)).toBe(true);
      expect(s.warehouses.some((x) => x.id === cargo.warehouseId)).toBe(true);
      expect(new Set(cargo.lines.map((x) => x.itemId)).size).toBe(cargo.lines.length);
      for (const line of cargo.lines) {
        expect(s.items.some((x) => x.id === line.itemId)).toBe(true);
        expect(Number.isInteger(line.quantity) && line.quantity > 0).toBe(true);
      }
    }
    for (const d of s.dispatches) expect(s.vehicles.some((x) => x.id === d.vehicleId)).toBe(true);
  });
  it("contabiliza cargas existentes una sola vez", () => {
    for (const row of s.inventory) {
      const reserved = s.dispatches
        .filter((d) => d.warehouseId === row.warehouseId && d.status === "preparado")
        .flatMap((d) => d.lines)
        .filter((l) => l.itemId === row.itemId)
        .reduce((n, l) => n + l.quantity, 0);
      expect(reserved).toBeLessThanOrEqual(row.onHand);
    }
    for (const row of s.needs) {
      const accounted = s.dispatches
        .filter((d) => d.shelterId === row.shelterId)
        .flatMap((d) => d.lines)
        .filter((l) => l.itemId === row.itemId)
        .reduce((n, l) => n + l.quantity, 0);
      expect(accounted).toBeLessThanOrEqual(row.required);
    }
  });
});
