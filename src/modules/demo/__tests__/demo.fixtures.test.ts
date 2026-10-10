import { describe, expect, it } from "vitest";
import { demoScenario as s } from "../data/demo.fixtures";
import { geojsonFor } from "../data/demo.geojson";

it("proyecta GeoJSON válido, filtrado y referido a fixtures", () => {
  expect(geojsonFor("norte").points.features.map((x) => x.id)).toEqual(["alb-01", "alb-02"]);
  expect(geojsonFor("reserva").points.features).toEqual([]);
  expect(geojsonFor("", "", "DES-DEMO-002").routes.features[0].id).toBe("DES-DEMO-002");
  expect(geojsonFor("", "", "invalid").routes.features).toEqual([]);
  for (const z of s.zones) {
    const ring = z.geometry.coordinates[0];
    expect(ring.length).toBeGreaterThanOrEqual(4);
    expect(ring[0]).toEqual(ring.at(-1));
  }
  for (const p of [...s.shelters, ...s.warehouses]) {
    const [lng, lat] = p.geometry.coordinates;
    expect(Math.abs(lng)).toBeLessThanOrEqual(180);
    expect(Math.abs(lat)).toBeLessThanOrEqual(90);
  }
});

import {
  indicatorsFor,
  initialDemoState,
  inventoryFor,
  needFor,
  proposalFor,
} from "../data/demo.selectors";

it("deriva stock, faltantes y filtros sin mezclar unidades", () => {
  expect(inventoryFor("alm-01", "agua")).toEqual({
    onHand: 120,
    reservedBaseline: 20,
    reservedNew: 0,
    available: 100,
  });
  expect(proposalFor("prop-01")?.lines.map((x) => x.quantity)).toEqual([60, 30, 0]);
  expect(indicatorsFor("norte")).toMatchObject({ shelters: 2, population: 210, highPriority: 2 });
  expect(indicatorsFor("reserva")).toEqual({
    shelters: 0,
    population: 0,
    highPriority: 0,
    uncoveredNeeds: 0,
  });
  const received = { ...initialDemoState, receivedDispatchIds: ["DES-DEMO-002"] };
  expect(needFor("alb-02", "agua", received)).toMatchObject({
    received: 30,
    committed: 0,
    uncovered: 90,
    pendingReceipt: 90,
  });
  expect(inventoryFor("alm-01", "agua", received)).toEqual(inventoryFor("alm-01", "agua"));
  expect(proposalFor("missing")).toBeUndefined();
});

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
