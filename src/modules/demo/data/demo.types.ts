export type Position = [number, number];
export type Point = { type: "Point"; coordinates: Position };
export type ZoneGeometry = { type: "Polygon"; coordinates: Position[][] };
export type RouteGeometry = { type: "LineString"; coordinates: Position[] };
export type Priority = "alta" | "media" | "baja";
export type DispatchStatus = "preparado" | "en_transito" | "recibido";
export type CargoLine = { readonly itemId: string; readonly quantity: number };
export type Shelter = {
  readonly id: string;
  readonly name: string;
  readonly territoryId: string;
  readonly priority: Priority;
  readonly population: number;
  readonly vulnerableGroups: readonly { label: string; count: number }[];
  readonly geometry: Point;
};
export type Dispatch = {
  readonly id: string;
  readonly warehouseId: string;
  readonly shelterId: string;
  readonly vehicleId: string;
  readonly status: DispatchStatus;
  readonly lines: readonly CargoLine[];
  readonly routeGeometry: RouteGeometry;
  readonly routeAccess: "bloqueado" | "desconocido";
};
export type Proposal = {
  readonly id: string;
  readonly warehouseId: string;
  readonly shelterId: string;
  readonly lines: readonly CargoLine[];
};
export type DemoScenario = {
  readonly id: string;
  readonly label: string;
  readonly referenceDate: string;
  readonly sourceLabel: string;
  readonly geographicSource: string;
  readonly territories: readonly { id: string; label: string }[];
  readonly zones: readonly {
    id: string;
    label: string;
    territoryId: string;
    geometry: ZoneGeometry;
  }[];
  readonly shelters: readonly Shelter[];
  readonly items: readonly { id: string; label: string; unit: string }[];
  readonly warehouses: readonly { id: string; name: string; geometry: Point }[];
  readonly inventory: readonly { warehouseId: string; itemId: string; onHand: number }[];
  readonly needs: readonly { shelterId: string; itemId: string; required: number }[];
  readonly proposals: readonly Proposal[];
  readonly vehicles: readonly { id: string; label: string; demoRegistration: string }[];
  readonly dispatches: readonly Dispatch[];
  readonly defaultShelterId: string;
  readonly defaultDispatchId: string;
};
export type DemoState = {
  readonly reservedProposals: Readonly<Record<string, readonly CargoLine[]>>;
  readonly receivedDispatchIds: readonly string[];
  readonly connectionMode: "online" | "offline";
};
