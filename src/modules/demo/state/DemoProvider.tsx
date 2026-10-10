"use client";

import { createContext, type ReactNode, useContext, useReducer, useState } from "react";
import { initialDemoState } from "../data/demo.selectors";
import type { DemoState } from "../data/demo.types";
import { type DemoAction, demoReducer } from "./demo.reducer";

type DemoContextValue = {
  state: DemoState;
  act: (action: DemoAction) => boolean;
  feedback: { text: string; error: boolean };
};
const DemoContext = createContext<DemoContextValue | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const [feedback, setFeedback] = useState({ text: "", error: false });
  function act(action: DemoAction) {
    const next = demoReducer(state, action);
    const valid = next !== state;
    dispatch(action);
    setFeedback({
      error: !valid,
      text: !valid
        ? "La simulación no se aplicó: el ejemplo cambió o la acción ya fue realizada. Revisa el resumen actualizado."
        : action.type === "reserve"
          ? "Reserva simulada. El disponible se actualizó; los despachos de ejemplo no cambiaron."
          : action.type === "receive"
            ? "Recepción simulada. El acta y las necesidades muestran el mismo estado DEMO."
            : action.mode === "offline"
              ? "Sin conexión DEMO. La cola es una maqueta; las acciones locales continúan."
              : "Conexión DEMO restaurada. No se sincronizó ninguna operación.",
    });
    return valid;
  }
  return <DemoContext.Provider value={{ state, act, feedback }}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("DemoProvider debe envolver las pantallas DEMO");
  return context;
}
