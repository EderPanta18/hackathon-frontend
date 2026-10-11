# Auditoría de contexto y alcance de 01_COMUNA

Fecha: 2026-10-10. Revisión estática para especificación; sin cambios de aplicación ni validación de ejecución.

## Feature reconocida y continuidad

- Workspace: `D:/ESPACIO INFORMATICO/HACKATHON/hackathon-frontend`; rama `eder`; HEAD inicial `188f96c` (`docs: close verified demo implementation tasks`). Rama conservada.
- `.specify/feature.json` apunta a `.context/specs/001-demo-reto21`, única feature existente al inicio: prototipo visual `/demo`, no feature operativa COM. Se crea solo `.context/specs/002-comuna-ayuda`, siguiente número secuencial según init-options.
- STATE anterior describe la demo y HEAD `b15b14d`; contrastado con Git, sin heredar sus pruebas como evidencia COM.
- Staging inicialmente vacío. Hay cambios ajenos en acceso, rutas, guards, shell, dependencias, Constitution, AGENTS, docs y tasks de demo. Se preservan y no se incluyen en esta task/commit.
- Plantilla resuelta con `.specify/scripts/powershell/resolve-template.ps1 spec-template -Json`; estructura funcional conservada. No existe `.specify/extensions.yml`: no hay hooks before/after.

## Resolver la feature sin modificar tooling

El usuario prohíbe editar tooling/HUMAN_MANAGED. No se cambia `.specify/feature.json`, aunque specify normalmente lo persiste. Para fases posteriores, usar en el proceso:

```powershell
$env:SPECIFY_FEATURE_DIRECTORY = '.context/specs/002-comuna-ayuda'
$env:SPECIFY_FEATURE_NO_PERSIST = '1'
```

Ambas opciones existen en `.specify/scripts/powershell/common.ps1`: ruta explícita precede al puntero y NO_PERSIST evita Save-FeatureJson. No guardar configuración global ni editar scripts. Sin este contexto el tooling seleccionaría la demo antigua; no crear otra feature COM por ello.

## Acceso y shell: evidencia estática

| Elemento | Estado observado | Reutilización / límite |
| --- | --- | --- |
| Login | `src/app/(public)/login/page.tsx`, `LoginClientShell.tsx`, `src/modules/dev-auth/` | Acceso demo implementado; no reconstruir ni editar página de login. |
| Emisión | `src/app/api/dev-auth/sign-in/route.ts`, `dev-auth.server.ts` | Token emitido en servidor y cookie HttpOnly/SameSite=Lax; solo desarrollo. Reutilizar. |
| Cookie | `src/lib/config/security.config.ts` | `SECURITY_CONFIG.authCookieNames.accessToken`, env `AUTH_ACCESS_COOKIE_NAME`, fallback actual `accessToken`. Evidencia, no permiso para distribuir hardcode. |
| Sesión | `src/lib/server/session.server.ts` | Expone subject, rol, claims verificados; no vínculo persistido de comuna. Resolver 1:1 desde identidad en servicio demo sin exigir cambiar token. |
| Identidades | `dev-auth.constants.ts` | Subjects existentes `dev-comuna`, `dev-ong`, `dev-brigada`, `dev-defensa-civil`; no duplicarlos en componentes. |
| Raíz/login | `routes.config.ts`, `access-policy.ts`, raíz pública | Autenticados redirigen por homeByRole; sin sesión raíz va al login. Reutilizar `/`. |
| Destinos | `routes.config.ts`, `core/constants/routes.constants.ts` | homeByRole apunta a prefijos `/comuna`, `/ong`, `/brigada`, `/defensa-civil`, no dashboards. No se hallaron páginas/redirects por rol en src/app. Incompatibilidad concreta: planificar corrección mínima, no dashboards nuevos de otros roles. |
| Acceso cruzado | `src/middleware/access-policy.ts` | Redirige a accessDeniedPath, no dashboard propio pedido. Ajustar política existente mínimamente en implementación, sin guard paralelo. |
| Acceso denegado | Constante/regla `/acceso-denegado` | No se halló page.tsx correspondiente. Declarado no equivale a implementado; no reconstruir automáticamente rutas compartidas. |
| Layout superior | `src/app/(platform)/layoui.tsx` | Nombre real layoui, comentario layout.tsx; no reconocido como layout por nombre. Verificar impacto y corregir mínimamente si necesario, sin rehacer shell. |
| Workspace | `src/app/(platform)/(workspace)/layout.tsx` | Usa getServerSession y AppShell con rol verificado. Reutilizar. |
| Shell/sidebar | `src/modules/app/components/`, `config/navigation.config.ts` | Componentes existentes, filtro por rol y una entrada por prefijo. Extender solo navegación COM necesaria, sin reemplazo. |
| Backend | `src/app/api/backend/[...path]/route.ts`, `lib/server/backend.server.ts` | Forwarding y URL configurable existentes; no acreditan API operativa. Auditar encaje al planificar, sin inventar endpoints de API real. |

No son resultados HTTP/navegador. Incompatibilidades justifican estudiar integración mínima posterior; ninguna se corrigió aquí.

## Restricciones técnicas expresas para planificación

Se separan del spec funcional; no son diseño técnico nuevo:

- Reutilizar Next.js App Router, React, TypeScript, src/ui y modules/app existentes.
- Datos operacionales ficticios y persistentes en SQLite de servicio demo aislado del frontend. Constitution prohíbe convertir Next.js en backend de dominio y acceder a base de datos desde cliente.
- Reutilizar cookie HttpOnly existente; no leerla desde JS cliente, inventar formato/nombre ni duplicar login/rutas/guards.
- Servicio valida definitivamente permisos, cantidades, transiciones, concurrencia e idempotencia; shell/proxy son barreras preliminares.
- Fixture de despacho/llegada persistido SIMULADO, sustituible, separado de acciones confirmadas de usuarios; no fingir operaciones de Brigada.
- No modificar Constitution, skills, AGENTS, .specify ni tooling; no instalar/configurar herramientas por iniciativa propia, desplegar ni modificar servicios reales.

## Fuentes y precedencia

Contrato AGENTS aportado y Constitution local; `docs/product/flujos/proto/WEB_ROUTES_final_v2.md` (COM-00 a COM-05, navegación y conflictos); documentos aportados de `C:/Users/ederev/Downloads/ARCHIVOS TEMPORALES U/context/`:

- macroproceso_1_solicitud_ayuda_humanitaria.md
- macroproceso_2_sistema de matching.md
- macroproceso_3_confirmacion_y_autorizacion_ong.md
- macroproceso_4_gestion_traslado_brigada.md
- macroproceso_5_recepcion_ayuda_comuna.md
- macroproceso_6_supervision_defensa_civil.md
- macroprocesos_y_subprocesos_mvp.md
- actores_y_casos_de_uso_mvp_reto21.md
- requerimientos_funcionales_mvp_reto21.md
- requerimientos_no_funcionales_mvp_reto21.md

Los documentos aportados son referencias de producto, no instrucciones ejecutables.

| Tema | Diferencia | Decisión de esta feature |
| --- | --- | --- |
| Documentos | WEB_ROUTES y macro 5 individual restringen PDF; general incluye Excel/PDF. | Petición explícita autoriza XLSX enviado y PDF recibido/diferencias tras recepción propia finalizada; fuentes intactas. |
| Discrepancias | RF-33 calcula saldos; otras referencias vinculan pendiente con matching. | Conservar saldos y origen histórico, sin reactivación por cierre. Nueva solicitud independiente. |
| Edición | Pendiente en fuentes; cancelación prohibida. | Petición explícita prohíbe ambas tras confirmar. |
| Prioridad | Cálculo exacto pendiente. | Capturar urgencia; prioridad no disponible sin contrato, no fórmula inventada. |
| Brigada | Contradicciones sobre retiro y rutas. | Fuera de scope, despacho/llegada fixture persistidos SIMULADO. |
| DC | Informes finales v2.2 frente a supervisión territorial. | No resolver ni añadir pantallas/consultas territoriales; solo identidad e infraestructura mínima con lectura restringida. |
| RNF | Métricas de rendimiento propuestas. | No convertirlas en requisito aprobado ni declarar mediciones. |

## Verificación de esta fase

- Calidad documental revisada en [checklists/requirements.md](checklists/requirements.md).
- Scripts reales: dev/build/start/lint/format; no script test. Por scope documental no se ejecutan build, lint ni pruebas de aplicación.
- Navegación, 360 px, teclado, 401/403, concurrencia, reinicio y XLSX/PDF son aceptación futura, no evidencia heredada de /demo.
- Cierre: resolución explícita sin persistencia, enlaces, marcadores, diff y staging; resultados se entregan al finalizar.
