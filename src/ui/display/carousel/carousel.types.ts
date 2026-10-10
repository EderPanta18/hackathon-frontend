// src/ui/display/carousel/carousel.types.ts

/* // ui/display/carousel/carousel.types.ts

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import { type ComponentProps } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { type ButtonProps } from "@/ui/primitives/button";

export type CarouselApi = UseEmblaCarouselType[1];

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

export type CarouselOptions = UseCarouselParameters[0];

export type CarouselPlugin = UseCarouselParameters[1];

export type CarouselOrientation = "horizontal" | "vertical";

export interface CarouselContextProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  opts?: CarouselOptions;
  orientation: CarouselOrientation;
}

export interface CarouselProps extends ComponentProps<"div"> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: CarouselOrientation;
  setApi?: (api: CarouselApi) => void;
}

export interface CarouselContentProps extends ComponentProps<"div"> {}

export interface CarouselItemProps extends ComponentProps<"div"> {}

export interface CarouselButtonProps extends ButtonProps {}
 */
