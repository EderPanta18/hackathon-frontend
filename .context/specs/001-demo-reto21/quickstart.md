# Quickstart: validación futura

Guía de verificación del prototipo implementado. Los resultados observados se registran al final; una vista previa DEMO no es una operación real.

## Prerrequisitos

- Checkout y dependencias existentes, Node/pnpm ya configurados. No instalar/configurar runtimes, MCP o infraestructura. Preservar cambios previos en package/lock y documentación UI.
- Cartografía OpenFreeMap requiere red, WebGL y worker. No requiere API de negocio, credenciales, sesión o base de datos; fallback textual si mapa falla.
- Materializar antes los tests propuestos en [plan.md](plan.md). Los comandos no son evidencia de ejecución previa.

## Comandos desde la raíz

```powershell
pnpm dev
```

Abrir el puerto anunciado por Next, sin asumirlo si ya hay servidor. Después de materializar tests:

```powershell
pnpm exec vitest run src/modules/demo/__tests__/demo.fixtures.test.ts src/modules/demo/__tests__/demo.reducer.test.ts src/middleware/route-policy.test.ts --environment node
pnpm exec tsc --noEmit
pnpm exec biome check 'src/app/(public)/demo' src/modules/demo src/lib/config/routes.config.ts src/middleware/route-policy.test.ts
pnpm build
```

Tests puros con imports relativos, sin nuevo `vitest.config`. No existen `pnpm test`/`pnpm typecheck`. `pnpm lint` es el script Biome real, ampliable si hay riesgo compartido; no usar `pnpm format` global para verificar, pues escribe. Un fallo de red de `next/font/google` se registra por separado, sin sustituir fuentes o tocar configuración protegida. Comprobar worker/estilo en navegador además del build.

## Recorrido manual

1. Abrir las cinco rutas de [contrato UI](contracts/demo-ui.md) sin sesión. Ver DEMO/contenido/navegación; comprobar login, privada y prefijos similares conservados.
2. Filtrar, limpiar y provocar vacío; seleccionar por pin/lista, comparar indicadores/detalle/prioridad fija.
3. Reservar propuesta atendible/parcial, cancelar e intentar duplicado. Cantidades según [modelo](data-model.md), sin negativos ni cambios de despacho.
4. Comparar preparado/tránsito/recibido. Sólo tránsito permite recepción una vez; cancelar conserva estado y recibir no descuenta origen otra vez.
5. Manifiesto/acta: mismo ID, carga, unidades, vehículo/estado y retorno. Entrada sin ID y con ID inválido ofrece ejemplo/aviso; no descarga ni firma final.
6. Alternar offline visual: mismos datos/acciones locales y sin sincronización al reconectar. Bloquear por separado cartografía o WebGL: fallo real y continuidad textual, sin modificar escenario.
7. Navegar y volver conserva reservas/recepciones; recargar reinicia, manteniendo sólo referencia URL si válida. Salir desmontando layout y volver inicia otro recorrido.
8. Verificar soporte desde 360 px y revisar también a 1280 px, claro/oscuro, Tab/Enter/Escape, foco y mensajes accesibles. Contraste: texto ≥4,5:1, controles/foco ≥3:1. Sin overflow de página; mapa ajustado y atribución visible. La cola offline es sólo maqueta y no se procesa al reconectar.
9. Remontar mapa/cambiar filtros: sin canvas/listeners duplicados ni errores no controlados. Acciones DEMO no generan solicitudes de negocio.

## Evidencia y cierre

Registrar checks realmente ejecutados, resultados y limitaciones; distinguir fallos previos. Revisar diff/staging y archivos protegidos; commit de tarea verificada sin cambios ajenos.

Las tareas y la evidencia de implementación se mantienen en este directorio de Spec Kit; no se aprueban automáticamente las casillas del revisor.

## Evidencia técnica · 2026-10-10 · T023

- Vitest: 3 archivos, 9 pruebas aprobadas (integridad, cantidades, duplicados, estados y acceso). Comando de arriba ejecutado con las dependencias existentes.
- `pnpm exec tsc --noEmit`: aprobado. También se comprobó TypeScript antes de cada commit de implementación.
- Biome focalizado: 28 archivos comprobados, sin fixes pendientes ni errores.
- `pnpm build`: aprobado; compilación, TypeScript y generación de páginas completadas. `/demo` está prerenderizada; las cuatro vistas con parámetros usan prerender parcial y un Suspense local. No hay Server Actions ni endpoints DEMO.
- Un intento anterior de Vitest falló con ENOENT en la caché temporal del sandbox; la repetición fuera del sandbox y el barrido final aprobaron. No se instaló ni configuró tooling.
- El pipeline CSS existente no expone clases de CSS Modules. Se usa `src/modules/demo/components/demo.css` con clases `demo-*` y estilos limitados a la demo; no se modificó Next/configuración o `globals.css`.
- Las páginas normalizan parámetros escalares; el módulo valida cada referencia contra fixtures antes de seleccionar datos. Una referencia inválida muestra aviso y ejemplo válido.
- Revisión de código DEMO: sin fetch/axios/clientes de negocio, persistencia, service worker, grafo vial ni exportadores. OpenFreeMap es únicamente cartografía de presentación con red y atribución.
- Las cinco rutas se comprobaron a 360 y 1280 px: sin desbordamiento de página; las tablas desplazan dentro de su contenedor. Mapa y worker cargaron en el navegador existente `http://localhost:3000`; no se terminó ni reemplazó su servidor.
- Contraste calculado desde los tokens: texto secundario/card 12,49:1 claro y 9,65:1 oscuro; texto de botón primario 13,57:1 y 5,96:1. Texto, controles y foco revisados superan los umbrales acordados. La comprobación visual actual se realizó en oscuro; no equivale a un ensayo con lector de pantalla real.
