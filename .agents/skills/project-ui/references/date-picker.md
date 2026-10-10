# Patrón de selección de fecha (requiere habilitación)

**Origen:** los materiales suministrados mencionan `date-picker`, pero no incluyen el contenido del documento original `DATE_PICKER_PATRON.md`. Esta guía solo desarrolla los aspectos descritos en las fuentes.

## Componentes del proyecto

- `Popover` y sus miembros desde `src/ui/overlay/popover/`.
- `Calendar` desde `src/ui/form/calendar/`: **[OFF]** según inventario recibido.
- `Button` desde `src/ui/primitives/button/`; `Field` opcional desde `src/ui/form/field/`.

## Requisitos previos

1. Inspeccionar el código actual de `Calendar`: puede haber cambiado desde el inventario.
2. Si sigue [OFF], confirmar necesidad y autorización antes de activar.
3. Detectar sus imports externos y versiones necesarias; no suponer que requiere `date-fns` o `react-hook-form` para todos los usos.
4. Si faltan dependencias, instalar **solo las necesarias** con `pnpm add <paquete>`.
5. Habilitar el `index.ts` de `Calendar` y la reexportación desde `form/index.ts`, según los contratos reales.
6. Verificar selección única/rango si se necesita, formato, zona horaria, teclado, foco y tema oscuro.

## Ubicación

Componer el selector concreto en la feature que lo necesita. Extraer a `src/ui/composition/` únicamente si se demuestra reutilización con una API clara. No añadir un componente genérico a `src/ui/` por anticipado.
