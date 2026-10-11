# Guía de validación de 01_COMUNA

Fecha: 2026-10-11. **Guía futura**: demo-api, sus archivos/comandos y páginas COM aún no están implementados. No ejecutar comandos que dependan de esos archivos hasta que existan. Evidencia ejecutada de esta fase al final.

## Contexto y comandos existentes

Desde la raíz, seleccionar feature sin editar tooling:

```powershell
$env:SPECIFY_FEATURE_DIRECTORY = '.context/specs/002-comuna-ayuda'
$env:SPECIFY_FEATURE_NO_PERSIST = '1'
```

Root package.json inspeccionado: pnpm dev/build/start/lint/format. Vitest instalado, sin script test/typecheck ni vitest.config. `pnpm format` escribe y no es verificación. Node local 24.19.0, pnpm 12.11.2. Mantener esos runtimes observados y no instalar herramientas por iniciativa propia.

## Preparación futura del servicio

1. Confirmar que paquete demo-api existe y revisar su manifiesto/lockfile propios. Antes de instalar dependencias, ejecutar pnpm con --ignore-workspace para no modificar workspace/lockfile raíz; no crear scripts globales.
2. Proveer entorno privado local: DEV_AUTH_ENABLED=true, DEV_AUTH_SECRET existente compartido con API, distinto de JWT_ACCESS_SECRET; AUTH_ACCESS_COOKIE_NAME idéntico al frontend si está configurado; JWT_AUDIENCE vacía/ausente; DEMO_API_SERVICE_TOKEN independiente ≥32 bytes; BACKEND_API_URL=http://127.0.0.1:5001/demo/v1. Nunca imprimir claves/cookies ni agregar NEXT_PUBLIC.
3. Guardar secretos en .env.local ignorado o entorno; datos/backups solo en .development/demo-api de la raíz del repo, resuelta desde ubicación del módulo y no cwd del comando. Comprobar Git antes de crear BD. No copiar .env ni bases a artefactos/evidencia.

Comandos **propuestos**, no ejecutados ahora, cuando existan paquete y archivos:

```powershell
pnpm --dir demo-api --ignore-workspace install
pnpm --dir demo-api --ignore-workspace exec node --env-file=../.env.local src/server.mjs
```

Arranque aplica up pendientes/semilla verificada. En otra terminal raíz `pnpm dev`. API solo loopback; navegador usa BFF y el DevRoleSwitcher existente para ingresar. El formulario normal /auth/login queda sin backend de credenciales en este modo, con sus errores actuales; no se rehace. No arrancar demo-api con NODE_ENV=production ni usar `pnpm start` como sustituto de acceso demo: el frontend actual deshabilita dev-auth en producción.

Checks Git sin crear archivos, ejecutables antes/después de implementación:

```powershell
git check-ignore .development/demo-api/operational.sqlite .development/demo-api/operational.sqlite-wal .development/demo-api/operational.sqlite-shm .development/demo-api/backups/prueba.sqlite .env.local
git ls-files '*.sqlite' '*.sqlite-wal' '*.sqlite-shm'
git status --short
```

Resultado requerido: todos los runtime paths ignorados y ninguna BD/secreto/backup rastreado. Paquete servicio debe ignorar node_modules propio sin modificar tooling raíz. No usar esos nombres como invitación a crear archivos.

## Servicio antes de UI

Los archivos siguientes son **planificados**, no presentes hoy. Tras implementarlos:

```powershell
pnpm --dir demo-api --ignore-workspace exec node --test tests/service.test.mjs tests/persistence.test.mjs
```

- Tests levantan servicio en puerto temporal, BD temporal y claves de test, no .env.local ni BD demo existente. Helpers firman mismos claims del emisor actual, sin implementar login paralelo.
- Seed dos veces: siete áreas ficticias, entidades/jefaturas 1:1, mismas claves, operaciones conservadas, ningún cierre reabierto. Identidades actuales y fixture adicional para segunda comuna.
- Credencial servicio ausente/incorrecta, cookie alterada/caducada/issuer incorrecto→401. Cabeceras/body de rol ajeno no elevan acceso; propiedad/vínculo inválido→403. /contexto responde desde BD a los cuatro roles; ONG/BRI referencias propias, DC sin datos operacionales globales.
- Alta1/5 válida;0/6, duplicado, unidad adicional/manipulada, población/cantidad/textos inválidos rechazados sin filas parciales. Detalle100/70/20→100/50/20/30/80.
- Cierre antes de llegada409; conciliación inválida422;70=65+2+1+2 con observación finaliza una vez. ResultadoP0/R65/sin35/no_satisfecho35 separa nunca cubierto30 y diferencias5; ninguna asignación/solicitud automática.
- Dos procesos/conexiones compiten por mismo despacho con misma/distinta clave: exactamente una recepción y evento. Simular respuesta perdida después de COMMIT y replay tras reinicio: mismo resultado/status, sin efectos extra. Busy agotado503 recuperable.
- Forzar error antes de COMMIT: rollback de agregado/evento/intento. Up/down/up solo sobre temporal; backup y restauración comprobados en temporal. No down/reset/restauración sobre demo conservada sin autorización.

## Integración BFF y pantallas

- Usar login/switcher actual sin alterar archivos auth. Peticiones contra BFF usan cookie emitida por servidor y Origin mismo origen en escrituras. El harness puede leer Set-Cookie HTTP en servidor; JS de navegador no lee cookie HttpOnly.
- Registrar la discrepancia preexistente entre llamada sign-out y carpeta sign.out al probar cierre de sesión; no declarar ese recorrido aprobado por inspección estática. Véase [frontera de sesión](contracts/auth-boundary.md).
- Comprobar credencial servicio inyectada (sin volcar su valor), Idempotency-Key reenviada,401/403/409/422 upstream intactos y archivos binarios sin corrupción. BFF sin backend devuelve error real, sin datos de reemplazo.
- Navegar seis rutas COM, revisión misma URL y detalles solo lectura. Visitar raíz/prefijo con/sin sesión y otra familia de rol: redirect esperado sin bucle; distinguir destino de redirect de disponibilidad real de dashboards no COM.
- Nueva solicitud y recepción con teclado y viewport 360 × 800: campos/unidades/errores visibles, foco, confirmación, estado textual; vacío/carga/error; sin scroll horizontal obligatorio. Cache por subject evita datos anteriores tras cambiar identidad demo.
- Interrumpir respuesta de escritura: UI conserva intento, consulta resultado/reintenta misma clave, no anuncia éxito ni crea otro intento silenciosamente.

Comandos raíz reales para el cierre de implementación (no ejecutados por plan):

```powershell
pnpm lint
pnpm build
pnpm exec tsc --noEmit
pnpm exec vitest run src/middleware/route-policy.test.ts --environment node
```

Ampliar Vitest con archivos COM/BFF efectivamente creados; inspeccionar imports/config antes del comando. No usar `pnpm test` inexistente ni afirmar que un test mock valida API/SQLite. Registrar fallos preexistentes, dependencias de red y checks no ejecutados con su alcance.

## Documentos y persistencia final

Tras existir generadores/tests:

```powershell
pnpm --dir demo-api --ignore-workspace exec node --test tests/documents.test.mjs
```

Descargar XLSX/PDF propios finalizados; comparar líneas contra la BD/DTO persistido usando lector distinto del generador, y abrir visualmente. Inspeccionar español (ñ/tildes/¿), observaciones largas/paginación, cantidades, fecha/responsable y DEMO/SIMULADO; textos que empiezan =,+,-,@ no se vuelven fórmulas. Manifiesto enviado y acta físico/conforme/diferencias no intercambian magnitudes.

Sin recepción final o desde otra comuna no hay documento. Forzar error de generación conserva cierre y permite reintentar. Reabrir frontend y servicio tras reinicio conserva solicitudes/recepciones/eventos/documentos regenerados; archivos de runtime continúan ignorados.

## Evidencia ejecutada en planificación

Git/rama/HEAD/status, lectura de artefactos/código/scripts, setup-plan con NO_PERSIST, node --version(v24.19.0), pnpm --version(12.11.2), pnpm install --help(--ignore-workspace disponible), SQLite en memoria(3.53.3/FK=1/backup function). No se inició servicio de dominio ni se ejecutaron pruebas de aplicación, HTTP, 360 px, reinicio persistente o exportación. Revisión documental/diff final se entrega con el commit de esta fase.

Validación documental ejecutada: diez archivos Markdown, 17 enlaces locales válidos, 30 FR, 10 SC y checklist 16/16; sin placeholders pendientes. STATE tiene un único Now y 2746 bytes. git diff --check del alcance documental sin errores. git check-ignore confirmó los cinco paths de BD/WAL/SHM/backup/.env.local y git ls-files no encontró SQLite rastreado. No existen extension hooks; el puntero protegido sigue en 001-demo-reto21.
