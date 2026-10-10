# Patrón de tabla de datos (no exportado)

**Origen:** los materiales suministrados mencionan el patrón `data-table`, pero no incluyen el contenido del documento original `DATA_TABLE_PATRON.md`. Esta guía solo desarrolla las relaciones verificables de esos materiales, no simula ser el original.

## Composición

- Base visual: `Table` desde `src/ui/display/table/` con `Table.Header`, `Table.Body`, `Table.Row`, `Table.Head`, `Table.Cell`, `Table.Caption`, etc.
- Estado y comportamiento de tabla: `@tanstack/react-table` **si la feature realmente requiere ordenamiento, filtros, selección o paginación de cliente**. Comprobar primero si está instalado.
- Controles complementarios: `Input`, `Button`, `Checkbox`, `DropdownMenu`, `Pagination`, según necesidad real y APIs locales verificadas.
- Definición de columnas y lógica en la feature correspondiente bajo `src/modules/<feature>/`; no existe un `DataTable` general exportado desde `src/ui/`.

## Reglas

1. No crear un `DataTable` genérico global para una sola pantalla.
2. No inventar esquema de columnas, endpoints ni paginación del backend.
3. Decidir explícitamente si la paginación/ordenamiento es remota o local a partir del contrato real.
4. Instalar `@tanstack/react-table` solo si falta y está justificado: `pnpm add @tanstack/react-table`.
5. Mantener estado de consulta en TanStack Query y estado puramente UI de la tabla en la feature.
6. Revisar accesibilidad de cabeceras, estados de carga, errores, vista vacía y responsive.
