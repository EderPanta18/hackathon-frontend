// src/ui/primitives/resizable/Resizable.tsx

/* // ui/primitives/resizable/Resizable.tsx

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/styling";
import { RESIZABLE_HANDLE_DEFAULTS } from "./resizable.constants";
import type {
  ResizableHandleProps,
  ResizablePanelGroupProps,
  ResizablePanelProps,
} from "./resizable.types";

const ResizablePanelGroup = ({
  className,
  ...props
}: ResizablePanelGroupProps) => (
  <ResizablePrimitive.Group
    data-slot="resizable-panel-group"
    className={cn(
      "flex h-full w-full aria-[orientation=vertical]:flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ({ ...props }: ResizablePanelProps) => (
  <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
);

const ResizableHandle = ({
  withHandle = RESIZABLE_HANDLE_DEFAULTS.withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <ResizablePrimitive.Separator
    data-slot="resizable-handle"
    data-with-handle={withHandle}
    className={cn(
      "relative flex w-px items-center justify-center",
      "bg-border ring-offset-background",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring",
      "aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full",
      "aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1",
      "aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0",
      "aria-[orientation=horizontal]:after:-translate-y-1/2",
      "[&[aria-orientation=horizontal]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" />
    )}
  </ResizablePrimitive.Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
 */
