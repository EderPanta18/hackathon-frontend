// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ButtonHTMLAttributes } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import DemoMap from "../components/DemoMap";
import { geojsonFor } from "../data/demo.geojson";

const harness = vi.hoisted(() => ({
  fail: true,
  listeners: {} as Record<string, () => void>,
  remove: vi.fn(),
}));
vi.mock("@/ui/primitives/button", () => ({
  Button: (props: ButtonHTMLAttributes<HTMLButtonElement>) => <button type="button" {...props} />,
}));
vi.mock("maplibre-gl", () => ({
  setWorkerUrl: vi.fn(),
  NavigationControl: class {},
  Map: class {
    constructor() {
      if (harness.fail) throw new Error("WebGL no disponible");
    }
    addControl = vi.fn();
    addSource = vi.fn();
    addLayer = vi.fn();
    resize = vi.fn();
    setPaintProperty = vi.fn();
    remove = harness.remove;
    getCanvas() {
      return document.createElement("canvas");
    }
    getSource() {
      return { setData: vi.fn() };
    }
    getLayer() {
      return undefined;
    }
    on(event: string, callbackOrLayer: string | (() => void), callback?: () => void) {
      if (typeof callbackOrLayer === "function") harness.listeners[event] = callbackOrLayer;
      else if (callback) harness.listeners[event] = callback;
    }
  },
}));
beforeEach(() => {
  harness.fail = true;
  harness.listeners = {};
  vi.clearAllMocks();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
    },
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("muestra un fallo WebGL, permite reintentar y limpia la instancia recuperada", () => {
  const view = render(<DemoMap data={geojsonFor()} />);
  expect(screen.getByText("Mapa base no disponible")).not.toBeNull();
  harness.fail = false;
  fireEvent.click(screen.getByRole("button", { name: "Reintentar mapa" }));
  act(() => harness.listeners.load());
  expect(screen.queryByText("Mapa base no disponible")).toBeNull();
  expect(screen.getByLabelText("Mapa ilustrativo de Piura")).not.toBeNull();
  view.unmount();
  expect(harness.remove).toHaveBeenCalledOnce();
});
it("distingue un fallo parcial del mapa ya cargado de la simulación offline", () => {
  harness.fail = false;
  render(<DemoMap data={geojsonFor()} />);
  act(() => harness.listeners.load());
  act(() => harness.listeners.error());
  expect(screen.getByText("Algunas teselas no están disponibles")).not.toBeNull();
  expect(
    screen.getByText(/La lista y los detalles del escenario siguen disponibles/),
  ).not.toBeNull();
  expect(screen.queryByText("Sin conexión DEMO")).toBeNull();
});
