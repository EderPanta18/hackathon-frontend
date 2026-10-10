# Verificación de cambios UI (Windows / PowerShell)

## Antes de modificar

- Identificar qué componentes ya existen en el código actual; leer su `index.ts` e implementación.
- Revisar usos reales para evitar romper consumidores o introducir duplicados.
- Confirmar que el componente no está comentado [OFF].
- Leer tokens y configuración de estilos actuales antes de proponer paleta/variantes.
- Si la propuesta instala dependencias, regenera shadcn, cambia `components.json` o altera la API pública, confirmar alcance y autorización.

## Comandos orientativos

Ejecutar desde la raíz del proyecto, respetando los scripts reales de `package.json`.

```powershell
# Comprobar tipos
pnpm exec tsc --noEmit

# Validación de producción (cuando corresponda)
pnpm build

# Biome, si el proyecto lo utiliza y está configurado
pnpm exec biome check src/ui
```

No afirmar que estos comandos pasan sin ejecutarlos. Si el usuario no solicita tocar `src/ui/`, aplicar Biome sobre las rutas modificadas, no sobre toda la carpeta.

## Inspección incremental en Windows

```powershell
# Descubrir archivos relacionados con un componente
rg --files src/ui | rg 'button|card|field'

# Encontrar consumo y exportaciones (si existe rg)
rg -n 'Card\.Header|Field\.Label|from "@/ui' src

# Consultar un índice concreto
Get-Content src/ui/display/card/index.ts
```

No ejecutar una búsqueda de todo el repositorio de forma repetida si se conoce la ruta exacta. Preferir inspectar el componente necesario.

## Comportamientos mínimos a revisar

- Tipado de props y contratos de los elementos compuestos.
- Teclado, foco visible, nombre accesible, etiquetas y control de errores.
- Estado normal, loading, disabled, vacío y error según proceda.
- Modo claro/oscuro, contraste y variables CSS del proyecto.
- Responsive: móvil y escritorio; ausencia de desbordamiento involuntario.
- SSR/hidratación: límites cliente-servidor, `next-themes`, `Toaster` custom.
- Evitar añadidos de dependencias/exports no utilizados.

## Reporte final mínimo

1. **Archivos modificados y propósito.**
2. **Componentes locales reutilizados.**
3. **Verificaciones ejecutadas y resultados reales.**
4. **Limitaciones** (p. ej. no se pudo navegar la app, implementación ausente o backend no disponible).
5. **Nuevas dependencias / exports**, solo si realmente se añadieron.
