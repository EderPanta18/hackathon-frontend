// src/ui/display/chart/chart.context.ts

/* // ui/display/chart/chart.context.ts

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import { createContext, useContext } from "react";
import type { ChartContextValue } from "./chart.types";

export const ChartContext = createContext<ChartContextValue | null>(null);

export const useChart = (): ChartContextValue => {
  const context = useContext(ChartContext);

  if (!context) throw new Error("useChart debe usarse dentro de un <Chart />");

  return context;
};
 */
