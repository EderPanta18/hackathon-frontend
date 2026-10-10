import { demoScenario as s } from "./demo.fixtures";
import { sheltersFor } from "./demo.selectors";
import type { Point, RouteGeometry, ZoneGeometry } from "./demo.types";

type Feature<G> = {
  type: "Feature";
  id: string;
  geometry: G;
  properties: { id: string; label: string; priority?: string; access?: string };
};
export type DemoGeoJSON = {
  type: "FeatureCollection";
  features: Feature<Point | ZoneGeometry | RouteGeometry>[];
};
const collection = (features: DemoGeoJSON["features"]): DemoGeoJSON => ({
  type: "FeatureCollection",
  features,
});
export function geojsonFor(territory = "", priority = "", dispatchId?: string) {
  const d = s.dispatches.find((x) => x.id === dispatchId);
  const shelters = d
    ? s.shelters.filter((x) => x.id === d.shelterId)
    : sheltersFor(territory, priority);
  const points = shelters.map((x) => ({
    type: "Feature" as const,
    id: x.id,
    geometry: x.geometry,
    properties: { id: x.id, label: x.name, priority: x.priority },
  }));
  const origin = s.warehouses.find((x) => x.id === d?.warehouseId);
  if (origin)
    points.push({
      type: "Feature",
      id: origin.id,
      geometry: origin.geometry,
      properties: { id: origin.id, label: origin.name, priority: "origen" },
    });
  return {
    zones: collection(
      s.zones
        .filter((x) => !territory || x.territoryId === territory)
        .map((x) => ({
          type: "Feature",
          id: x.id,
          geometry: x.geometry,
          properties: { id: x.id, label: x.label },
        })),
    ),
    points: collection(points),
    routes: collection(
      d
        ? [
            {
              type: "Feature",
              id: d.id,
              geometry: d.routeGeometry,
              properties: {
                id: d.id,
                label: "Ruta ilustrativa DEMO, no verificada",
                access: d.routeAccess,
              },
            },
          ]
        : [],
    ),
  };
}
export type DemoMapData = ReturnType<typeof geojsonFor>;
