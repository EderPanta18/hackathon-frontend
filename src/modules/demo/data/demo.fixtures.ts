import type { DemoScenario, Position, ZoneGeometry } from "./demo.types";

const origin: Position = [-80.636, -5.192];
const polygon = (west: number, south: number, east: number, north: number): ZoneGeometry => ({
  type: "Polygon",
  coordinates: [
    [
      [west, south],
      [east, south],
      [east, north],
      [west, north],
      [west, south],
    ],
  ],
});

export const demoScenario: DemoScenario = {
  id: "piura-demo-21",
  label: "Escenario de atención DEMO",
  referenceDate: "10 octubre 2026",
  sourceLabel: "Fixtures ficticios para revisión de experiencia",
  geographicSource: "https://www.munipiura.gob.pe/",
  territories: [
    { id: "norte", label: "Piura · sector norte DEMO" },
    { id: "sur", label: "Piura · sector sur DEMO" },
    { id: "reserva", label: "Zona de reserva DEMO (sin albergues)" },
  ],
  zones: [
    {
      id: "zona-norte",
      label: "Zona norte ilustrativa",
      territoryId: "norte",
      geometry: polygon(-80.67, -5.185, -80.6, -5.145),
    },
    {
      id: "zona-sur",
      label: "Zona sur ilustrativa",
      territoryId: "sur",
      geometry: polygon(-80.67, -5.225, -80.6, -5.185),
    },
  ],
  shelters: [
    {
      id: "alb-01",
      name: "La Ribera DEMO",
      territoryId: "norte",
      priority: "alta",
      population: 84,
      vulnerableGroups: [
        { label: "Niñez", count: 25 },
        { label: "Personas mayores", count: 12 },
      ],
      geometry: { type: "Point", coordinates: [-80.638, -5.165] },
    },
    {
      id: "alb-02",
      name: "El Encuentro DEMO",
      territoryId: "norte",
      priority: "alta",
      population: 126,
      vulnerableGroups: [
        { label: "Niñez", count: 38 },
        { label: "Movilidad reducida", count: 7 },
      ],
      geometry: { type: "Point", coordinates: [-80.617, -5.177] },
    },
    {
      id: "alb-03",
      name: "Los Tamarindos DEMO",
      territoryId: "sur",
      priority: "media",
      population: 67,
      vulnerableGroups: [
        { label: "Niñez", count: 19 },
        { label: "Personas mayores", count: 9 },
      ],
      geometry: { type: "Point", coordinates: [-80.65, -5.205] },
    },
    {
      id: "alb-04",
      name: "Nuevo Horizonte DEMO",
      territoryId: "sur",
      priority: "baja",
      population: 93,
      vulnerableGroups: [
        { label: "Niñez", count: 28 },
        { label: "Movilidad reducida", count: 4 },
      ],
      geometry: { type: "Point", coordinates: [-80.615, -5.212] },
    },
  ],
  items: [
    { id: "agua", label: "Agua", unit: "bidones de 20 L" },
    { id: "alimentos", label: "Alimentos", unit: "kits" },
    { id: "mantas", label: "Mantas", unit: "unidades" },
  ],
  warehouses: [
    {
      id: "alm-01",
      name: "Almacén Central DEMO",
      geometry: { type: "Point", coordinates: origin },
    },
  ],
  inventory: [
    { warehouseId: "alm-01", itemId: "agua", onHand: 120 },
    { warehouseId: "alm-01", itemId: "alimentos", onHand: 40 },
    { warehouseId: "alm-01", itemId: "mantas", onHand: 0 },
  ],
  needs: [
    { shelterId: "alb-01", itemId: "agua", required: 80 },
    { shelterId: "alb-01", itemId: "alimentos", required: 50 },
    { shelterId: "alb-01", itemId: "mantas", required: 30 },
    { shelterId: "alb-02", itemId: "agua", required: 120 },
    { shelterId: "alb-02", itemId: "alimentos", required: 70 },
    { shelterId: "alb-02", itemId: "mantas", required: 50 },
    { shelterId: "alb-03", itemId: "agua", required: 60 },
    { shelterId: "alb-03", itemId: "alimentos", required: 40 },
    { shelterId: "alb-03", itemId: "mantas", required: 25 },
    { shelterId: "alb-04", itemId: "agua", required: 90 },
    { shelterId: "alb-04", itemId: "alimentos", required: 50 },
    { shelterId: "alb-04", itemId: "mantas", required: 30 },
  ],
  proposals: [
    {
      id: "prop-01",
      warehouseId: "alm-01",
      shelterId: "alb-01",
      lines: [
        { itemId: "agua", quantity: 60 },
        { itemId: "alimentos", quantity: 40 },
        { itemId: "mantas", quantity: 30 },
      ],
    },
    {
      id: "prop-02",
      warehouseId: "alm-01",
      shelterId: "alb-02",
      lines: [
        { itemId: "agua", quantity: 90 },
        { itemId: "alimentos", quantity: 50 },
        { itemId: "mantas", quantity: 50 },
      ],
    },
    {
      id: "prop-03",
      warehouseId: "alm-01",
      shelterId: "alb-03",
      lines: [
        { itemId: "agua", quantity: 45 },
        { itemId: "alimentos", quantity: 30 },
        { itemId: "mantas", quantity: 25 },
      ],
    },
    {
      id: "prop-04",
      warehouseId: "alm-01",
      shelterId: "alb-04",
      lines: [
        { itemId: "agua", quantity: 90 },
        { itemId: "alimentos", quantity: 50 },
        { itemId: "mantas", quantity: 30 },
      ],
    },
  ],
  vehicles: [
    { id: "veh-01", label: "Camión de carga DEMO", demoRegistration: "DEMO-021" },
    { id: "veh-02", label: "Furgón DEMO", demoRegistration: "DEMO-022" },
  ],
  dispatches: [
    {
      id: "DES-DEMO-001",
      warehouseId: "alm-01",
      shelterId: "alb-01",
      vehicleId: "veh-01",
      status: "preparado",
      lines: [
        { itemId: "agua", quantity: 20 },
        { itemId: "alimentos", quantity: 10 },
      ],
      routeGeometry: { type: "LineString", coordinates: [origin, [-80.638, -5.165]] },
      routeAccess: "bloqueado",
    },
    {
      id: "DES-DEMO-002",
      warehouseId: "alm-01",
      shelterId: "alb-02",
      vehicleId: "veh-02",
      status: "en_transito",
      lines: [
        { itemId: "agua", quantity: 30 },
        { itemId: "alimentos", quantity: 15 },
      ],
      routeGeometry: { type: "LineString", coordinates: [origin, [-80.617, -5.177]] },
      routeAccess: "desconocido",
    },
    {
      id: "DES-DEMO-003",
      warehouseId: "alm-01",
      shelterId: "alb-03",
      vehicleId: "veh-01",
      status: "recibido",
      lines: [
        { itemId: "agua", quantity: 15 },
        { itemId: "alimentos", quantity: 10 },
      ],
      routeGeometry: { type: "LineString", coordinates: [origin, [-80.65, -5.205]] },
      routeAccess: "desconocido",
    },
  ],
  defaultShelterId: "alb-01",
  defaultDispatchId: "DES-DEMO-002",
};
