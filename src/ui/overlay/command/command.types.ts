// src/ui/overlay/command/command.types.ts

/* // ui/overlay/command/command.types.ts

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import { type ComponentProps } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { type DialogProps } from "@/ui/overlay/dialog";

export interface CommandProps extends ComponentProps<typeof CommandPrimitive> {}

export interface CommandDialogProps extends DialogProps {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  className?: string;
}

export interface CommandInputProps extends ComponentProps<
  typeof CommandPrimitive.Input
> {}

export interface CommandListProps extends ComponentProps<
  typeof CommandPrimitive.List
> {}

export interface CommandEmptyProps extends ComponentProps<
  typeof CommandPrimitive.Empty
> {}

export interface CommandGroupProps extends ComponentProps<
  typeof CommandPrimitive.Group
> {}

export interface CommandSeparatorProps extends ComponentProps<
  typeof CommandPrimitive.Separator
> {}

export interface CommandItemProps extends ComponentProps<
  typeof CommandPrimitive.Item
> {}

export interface CommandShortcutProps extends ComponentProps<"span"> {}
 */
