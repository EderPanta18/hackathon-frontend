"use client";

import { type GeoJSONSource, Map as LibreMap, NavigationControl, setWorkerUrl } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/ui/primitives/button";
import type { DemoMapData } from "../data/demo.geojson";
import styles from "./demo.module.css";
import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).toString());

export default function DemoMap({
  data,
  selectedId,
  onSelect,
}: {
  data: DemoMapData;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LibreMap | null>(null);
  const latest = useRef(data);
  const selectRef = useRef(onSelect);
  const [attempt, setAttempt] = useState(0);
  const [mode, setMode] = useState<"loading" | "ready" | "partial" | "unavailable">("loading");
  useEffect(() => {
    latest.current = data;
    selectRef.current = onSelect;
    const map = mapRef.current;
    for (const key of ["zones", "points", "routes"] as const)
      (map?.getSource(key) as GeoJSONSource | undefined)?.setData(data[key]);
  }, [data, onSelect]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: Reintentar debe desmontar y crear una instancia después de un fallo de worker/estilo.
  useEffect(() => {
    if (!container.current) return;
    let map: LibreMap;
    let loaded = false;
    let failed = false;
    setMode("loading");
    try {
      map = new LibreMap({
        container: container.current,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [-80.635, -5.185],
        zoom: 11.8,
        attributionControl: { compact: false },
        keyboard: false,
        locale: {
          "NavigationControl.ZoomIn": "Acercar mapa",
          "NavigationControl.ZoomOut": "Alejar mapa",
          "NavigationControl.ResetBearing": "Orientar al norte",
        },
      });
      mapRef.current = map;
      map.addControl(new NavigationControl({ showCompass: false }), "top-right");
      map.getCanvas().setAttribute("aria-hidden", "true");
      map.getCanvas().tabIndex = -1;
      map.on("load", () => {
        loaded = true;
        for (const key of ["zones", "points", "routes"] as const)
          map.addSource(key, { type: "geojson", data: latest.current[key] });
        map.addLayer({
          id: "demo-zones",
          type: "fill",
          source: "zones",
          paint: { "fill-color": "#285e9a", "fill-opacity": 0.09 },
        });
        map.addLayer({
          id: "demo-zones-border",
          type: "line",
          source: "zones",
          paint: { "line-color": "#285e9a", "line-width": 1, "line-dasharray": [3, 3] },
        });
        map.addLayer({
          id: "demo-route",
          type: "line",
          source: "routes",
          paint: { "line-color": "#9a3412", "line-width": 4, "line-dasharray": [2, 2] },
        });
        map.addLayer({
          id: "demo-pins",
          type: "circle",
          source: "points",
          paint: {
            "circle-radius": 11,
            "circle-color": [
              "match",
              ["get", "priority"],
              "alta",
              "#b42318",
              "media",
              "#8a4b00",
              "baja",
              "#1f6e52",
              "#123e71",
            ],
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": 3,
          },
        });
        map.addLayer({
          id: "demo-pin-labels",
          type: "symbol",
          source: "points",
          layout: {
            "text-field": [
              "match",
              ["get", "priority"],
              "alta",
              "A",
              "media",
              "M",
              "baja",
              "B",
              "O",
            ],
            "text-size": 11,
            "text-allow-overlap": true,
          },
          paint: { "text-color": "#ffffff" },
        });
        map.on("click", "demo-pins", (e) => {
          const id = e.features?.[0]?.properties?.id;
          if (typeof id === "string") selectRef.current?.(id);
        });
        map.on("mouseenter", "demo-pins", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "demo-pins", () => {
          map.getCanvas().style.cursor = "";
        });
        setMode(failed ? "partial" : "ready");
      });
      map.on("error", () => {
        failed = true;
        setMode(loaded ? "partial" : "unavailable");
      });
    } catch {
      setMode("unavailable");
      return;
    }
    const timeout = window.setTimeout(() => {
      if (!loaded) setMode("unavailable");
    }, 12000);
    const observer = new ResizeObserver(() => map.resize());
    observer.observe(container.current);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [attempt]);
  useEffect(() => {
    const map = mapRef.current;
    if (mode === "loading" || mode === "unavailable") return;
    if (!map?.getLayer("demo-pins")) return;
    map.setPaintProperty("demo-pins", "circle-radius", [
      "case",
      ["==", ["get", "id"], selectedId ?? ""],
      15,
      11,
    ]);
  }, [selectedId, mode]);
  return (
    <section className={styles.map} aria-label="Mapa ilustrativo de Piura">
      <div ref={container} className={styles.mapCanvas} />
      {mode !== "ready" && (
        <div className={styles.mapNotice} aria-live="polite" aria-atomic="true">
          <strong>
            {mode === "loading"
              ? "Cargando cartografía…"
              : mode === "partial"
                ? "Algunas teselas no están disponibles"
                : "Mapa base no disponible"}
          </strong>
          <p>
            La lista y los detalles del escenario siguen disponibles. Este aviso no es la simulación
            offline.
          </p>
          {mode !== "loading" && (
            <Button variant="outline" tone="neutral" onClick={() => setAttempt((x) => x + 1)}>
              Reintentar mapa
            </Button>
          )}
        </div>
      )}
      <div className={styles.mapCaption}>
        Piura · ubicaciones y zonas aproximadas DEMO
        <br />
        A: alta · M: media · B: baja · O: origen
      </div>
    </section>
  );
}
