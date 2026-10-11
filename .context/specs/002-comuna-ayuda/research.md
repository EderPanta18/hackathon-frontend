# Research: 01_COMUNA

Fecha: 2026-10-11. Investigación de planificación, sin implementación. La respuesta A está registrada en [spec.md](spec.md#clarifications).

## 1. Frontera de identidad y de servicio

**Decision**: Reutilizar la cookie configurada y el JWT demo existente. Demo-api verifica HS256, issuer `dev-auth`, expiración, subject y rol; resuelve subject→rol/entidad en SQLite. Además verifica una credencial de servicio que el BFF inyecta desde entorno servidor, después de filtrar cabeceras entrantes. Ambas son necesarias.

**Rationale**: `dev-auth.server.ts` ya firma sub/role/iss/iat/exp, sin entidad ni audiencia. El BFF reconstruye cabeceras y reenvía solo la cookie de acceso; no acredita al proceso llamante. Verificar el JWT autentica la identidad demo; la credencial independiente autentica al adaptador servidor. No cambiar login, formato de cookie, claims ni fuentes de verificación frontend. La API no acepta role/comunaId/subject libres.

**Alternatives considered**: Confiar en X-Role o solo en una credencial compartida perdería identidad/titularidad. Reemitir otro JWT de usuario duplicaría el mecanismo aceptado. Compartir la clave real con la demo violaría el aislamiento existente.

**Evidencia**: `src/modules/dev-auth/dev-auth.server.ts`, `dev-auth.constants.ts`, `src/lib/server/{jwt,security,session}.server.ts`, `src/lib/bff/backend-proxy.server.ts`, `src/proxy.ts`. Roles reales: comuna/ong/brigada/defensaCivil. Subjects: dev-comuna/dev-ong/dev-brigada/dev-defensa-civil. No se encontró servicio operacional demo implementado; `/api/dev-auth` es acceso, `/api/backend` es transporte.

**Precondición observada**: JWT_AUDIENCE debe estar ausente/vacía en demo porque el emisor actual no produce aud y el verificador actual sí la exige si está configurada. Se verifica configuración sin imprimir secretos; no se cambia el emisor para resolverlo.

## 2. Runtime separado sin modificar tooling raíz

**Decision**: `demo-api/` es un paquete/proceso privado independiente, Node 24.19.0, ESM `.mjs`, node:http y node:sqlite. UI/contratos permanecen TypeScript. JSDoc de servicio referencia tipos DTO puros cuando ayude; no se afirma typecheck completo del servicio bajo tipos Node 20.

**Rationale**: Node local es v24.19.0 y pnpm 12.11.2. DatabaseSync/backup están disponibles. Root tsconfig incluye todos los .ts/.tsx/.mts y usa @types/node20; poner servidor SQLite TypeScript bajo esa raíz exigiría cambiar configuración protegida. `.mjs` evita ese acoplamiento y un driver nativo adicional. La implementación del servicio tendrá validación runtime y tests Node, sin importar código Next.

**Alternatives considered**: better-sqlite3 añade compilación binaria/build approvals. Un workspace nuevo o excluir carpetas en tsconfig modifica tooling. Ejecutar negocio en Next contradice Constitution.

**Límite**: node:sqlite figura como release candidate desde Node 24.15. Se fija el runtime local observado, no una garantía de producción. Base síncrona en un único proceso demo, cargas cortas, documentos fuera de transacciones. [Documentación Node 24.19](https://nodejs.org/download/release/v24.19.0/docs/api/sqlite.html).

## 3. Persistencia e idempotencia

**Decision**: Una BD `.development/demo-api/operational.sqlite`; FK ON, WAL, synchronous FULL, busy_timeout 1000 ms. Migraciones versionadas/checksum, SQL up/down. Semilla determinista insert-only y verificada. BEGIN IMMEDIATE para solicitud y recepción, con registro idempotente y auditoría en la misma transacción.

**Rationale**: Ya está ignorada `.development/`; no hace falta editar .gitignore raíz. Un escritor SQLite, restricciones UNIQUE/FK y adquisición anticipada del bloqueo evitan dos cierres. Ante bloqueo agotado devolver 503 recuperable, sin bucles de reintento silenciosos. Mismo intento/contenido recupera resultado incluso tras reinicio; contenido distinto recibe 409.

**Alternatives considered**: Memoria/localStorage no sobreviven reinicio del servicio. Dos BD por rol impiden coherencia. INSERT OR REPLACE puede eliminar filas referenciadas. Copiar únicamente el archivo .sqlite abierto ignora transacciones del WAL.

Fuentes: [transacciones](https://www.sqlite.org/lang_transaction.html), [foreign keys](https://www.sqlite.org/foreignkeys.html), [WAL](https://www.sqlite.org/wal.html), [conflictos](https://www.sqlite.org/lang_conflict.html), [backup consistente](https://www.sqlite.org/backup.html).

## 4. Semilla y saldos

**Decision**: Siete áreas/comunas llamadas Área DEMO Piura 01…07 (FICTICIA), sin coordenadas. Primer COM y ONG/BRI/DC usan subjects existentes; otros seis jefes COM son identidades fixture de servicio, sin login adicional. Catálogo inicial de cinco productos indivisibles, unidad fija declarada. Emergencias demo activa e histórica. Aportes/despachos/llegadas precargados, explícitamente SIMULADO.

**Rationale**: Permite probar aislamiento 1:1 y todos los recorridos sin inventar geografía, inventarios o procesos externos. La semilla no atribuye aprobaciones/llegadas a actos reales de usuarios. Prioridad null/no disponible y matching no disponible.

**Alternatives considered**: Usar nombres o coordenadas plausibles parecería información real. Expandir el selector de login para siete comunas modifica auth. Implementar matching/inventario para fabricar un despacho excede scope.

**Saldos**: Con aprobado A y despachos finalizados F, P=A−Σ(enviado de F), R=Σ(conforme de F). Sin asignar=max(0,S−R−P); no satisfecho=max(0,S−R). Nunca cubierto=max(0,S−A) y diferencias históricas se conservan aparte; ningún saldo dispara matching. Detalle en [data-model.md](data-model.md).

## 5. UI y adaptación HTTP

**Decision**: Rutas Next de composición, módulo comuna para pantallas/hooks y adaptador tipado sobre apiClient existente. Reutilizar QueryProvider, resourceKeys por subject, Form/RHF/Zod y componentes locales. No crear proveedor global ni nuevo cliente HTTP.

**Rationale**: `src/lib/api/api.ts` ya exige envelope success/data/meta, Problem Details y descarga binaria; query-client tiene mutaciones retry:false. `Table` usa whitespace-nowrap/overflow: los bloques críticos móviles usarán Card/dl/campos apilados. La UI muestra saldos/capacidades del servicio, no recalcula reglas autoritativas.

**Alternatives considered**: Copiar shadcn estándar no respeta las APIs locales. Importar SQLite en Next o crear controladores de negocio duplica backend. Usar el prototipo /demo como estado compartido no aporta persistencia.

Fuente de contexto: código local y [Next Server/Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).

## 6. Documentos finales

**Decision**: ExcelJS para XLSX y pdf-lib con fontkit y fuente local licenciada de cobertura española para PDF, solo en el paquete servicio. Generar desde hechos finalizados inmutables; no persistir binarios ni hacerlos durante la transacción de recepción.

**Rationale**: Archivos reales inspeccionables sin navegador/headless. Texto de usuario como celda String, nunca fórmula o hipervínculo; cantidades numéricas. PDF mide/envuelve texto y pagina explícitamente con encabezados repetidos. Fechas del cierre guardado, no nueva fecha operativa por descargar.

**Alternatives considered**: HTML/CSV renombrado no satisface PDF/XLSX. Exportar desde estado cliente no acredita hechos guardados. Fuente remota durante descarga crea dependencia de red. Tipografía/observaciones requieren prueba de caracteres y desbordamiento; ante glifo no soportado, error explícito, sin pérdida silenciosa.

Fuentes: [ExcelJS oficial](https://github.com/exceljs/exceljs#reading-xlsx), [pdf-lib fuentes](https://pdf-lib.js.org/docs/api/classes/pdffont), [páginas](https://pdf-lib.js.org/docs/api/classes/pdfdocument), [opciones de texto](https://pdf-lib.js.org/docs/api/interfaces/pdfpagedrawtextoptions), [fontkit](https://pdf-lib.js.org/).

## 7. Comandos y evidencia de investigación

Ejecutados: lectura Git/artefactos/código, setup-plan con ruta explícita y NO_PERSIST, node --version, pnpm --version, pnpm install --help y comprobación SQLite en memoria. Resultado: SQLite 3.53.3, FK=1, backup function. No es una prueba de persistencia, permisos ni dominio.

`pnpm install --help` local confirma --ignore-workspace y --dir: el paquete servicio podrá instalar dependencias propias sin editar pnpm-workspace.yaml ni lockfile raíz. [pnpm run](https://pnpm.io/cli/run) define scripts por manifiesto. Comandos aún inexistentes se etiquetan en quickstart como propuestos.

find-docs se aplicó con fallback a documentación oficial: no hay conector Context7 disponible; su CLI descargaría tooling, prohibido aquí. No se instalaron herramientas/dependencias. Un intento de abrir pnpm.io/cli/install devolvió503; se contrastó la opción con ayuda local.

## Resultado de Phase 0

Sin decisiones materiales pendientes para COM. Contratos futuros de API real y funciones de otros roles siguen fuera de scope. El detalle de estas decisiones pasa a Phase 1, sin atribuir implementación ni aprobación operativa a esta investigación.

## Cierre de aclaración

Una pregunta material respondida: opción A incorporada en Clarifications y FR-004. No se plantean nuevas preguntas. Checklist documental revisado: 16/16, sin cambiar marcadores.

| Categoría de revisión | Resultado |
| --- | --- |
| Alcance y comportamiento funcional | Claro: seis rutas COM, alta inmutable y recepción terminal |
| Dominio y datos | Claro: entidades 1:1, unidades, cantidades y saldos; fixtures simulados |
| Interacción y recorrido | Claro: revisión, estados de carga/error y confirmación |
| Atributos de calidad | Claro: aislamiento, idempotencia, persistencia y 360 px; sin métricas inventadas |
| Integraciones y dependencias | Resuelto: JWT existente y API demo separada; API real diferida |
| Casos límite y fallos | Claro: llegada, duplicados, diferencias y respuestas inciertas |
| Restricciones y decisiones | Claro: auth reutilizada, tooling protegido y servicio separado |
| Terminología y consistencia | Claro: propuesta/aprobación/envío/llegada/recepción diferenciados |
| Criterios de finalización | Claro: diez criterios medibles; aceptación operacional pendiente |
| Marcadores y supuestos | Sin bloqueos abiertos para planificar; otros roles permanecen fuera de alcance |
