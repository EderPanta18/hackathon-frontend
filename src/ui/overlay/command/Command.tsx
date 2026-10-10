// src/ui/overlay/command/Command.tsx

/* // ui/overlay/command/Command.tsx

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, SearchIcon } from "lucide-react";
import { cn } from "@/lib/styling";
import { Dialog } from "@/ui/overlay/dialog";
import { InputGroup } from "@/ui/form/input-group";
import { COMMAND_DIALOG_DEFAULTS } from "./command.constants";
import type {
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from "./command.types";

const Command = ({ className, ...props }: CommandProps) => (
  <CommandPrimitive
    data-slot="command"
    className={cn(
      "flex size-full flex-col overflow-hidden rounded-xl!",
      "bg-popover p-1 text-popover-foreground",
      className,
    )}
    {...props}
  />
);

const CommandDialog = ({
  title = COMMAND_DIALOG_DEFAULTS.title,
  description = COMMAND_DIALOG_DEFAULTS.description,
  showCloseButton = COMMAND_DIALOG_DEFAULTS.showCloseButton,
  className,
  children,
  ...props
}: CommandDialogProps) => (
  <Dialog {...props}>
    <Dialog.Header className="sr-only">
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
    </Dialog.Header>
    <Dialog.Content
      className={cn(
        "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
        className,
      )}
      showCloseButton={showCloseButton}
    >
      {children}
    </Dialog.Content>
  </Dialog>
);

const CommandInput = ({ className, ...props }: CommandInputProps) => (
  <div data-slot="command-input-wrapper" className="p-1 pb-0">
    <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "w-full text-sm outline-hidden",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <InputGroup.Addon>
        <SearchIcon className="size-4 shrink-0 opacity-50" />
      </InputGroup.Addon>
    </InputGroup>
  </div>
);

const CommandList = ({ className, ...props }: CommandListProps) => (
  <CommandPrimitive.List
    data-slot="command-list"
    className={cn(
      "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
      className,
    )}
    {...props}
  />
);

const CommandEmpty = ({ className, ...props }: CommandEmptyProps) => (
  <CommandPrimitive.Empty
    data-slot="command-empty"
    className={cn("py-6 text-center text-sm", className)}
    {...props}
  />
);

const CommandGroup = ({ className, ...props }: CommandGroupProps) => (
  <CommandPrimitive.Group
    data-slot="command-group"
    className={cn(
      "overflow-hidden p-1 text-foreground",
      "**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5",
      "**:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium",
      "**:[[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
);

const CommandSeparator = ({ className, ...props }: CommandSeparatorProps) => (
  <CommandPrimitive.Separator
    data-slot="command-separator"
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
);

const CommandItem = ({ className, children, ...props }: CommandItemProps) => (
  <CommandPrimitive.Item
    data-slot="command-item"
    className={cn(
      "group/command-item relative flex cursor-default items-center gap-2",
      "rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
      "in-data-[slot=dialog-content]:rounded-lg!",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "data-selected:bg-muted data-selected:text-foreground",
      "data-selected:*:[svg]:text-foreground",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    {children}
    <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
  </CommandPrimitive.Item>
);

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => (
  <span
    data-slot="command-shortcut"
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      "group-data-selected/command-item:text-foreground",
      className,
    )}
    {...props}
  />
);

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
};
 */
