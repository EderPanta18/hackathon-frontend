// src/ui/display/carousel/carousel.context.ts

/* // ui/display/carousel/carousel.context.ts

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import { createContext, useContext } from "react";
import type { CarouselContextProps } from "./carousel.types";

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context)
    throw new Error("useCarousel debe usarse dentro de <Carousel />");

  return context;
};
 */
