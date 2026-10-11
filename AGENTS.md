# hackathon-frontend — Development Contract

<!-- HUMAN_MANAGED · Contrato operativo para desarrolladores y agentes. -->

## Start

- Revisar rama, HEAD, `git status`, cambios existentes, estructura y scripts reales de `package.json`; no sobrescribir trabajo ajeno.
- Si existe `.context/STATE.md`, leerlo una vez y contrastarlo con el workspace. Recuperar solo el contexto necesario; no precargar sesiones ni documentación completa.
- Consultar las secciones pertinentes de `.specify/memory/constitution.md` ante cambios de arquitectura, datos, seguridad o reglas del producto.

## Product Boundaries

- MVP de coordinación de ayuda humanitaria de última milla en Piura. Cuatro roles: **Jefe de Comuna/Albergue, Jefe de ONG, Jefe de Brigada y Jefe de Defensa Civil**. El matching pertenece al sistema, no es un quinto usuario.
- Flujo operativo base: solicitud de ayuda → propuestas de matching → decisión/autorización de ONG → retiro y traslado → recepción en comuna → consulta o reporte autorizado para Defensa Civil.
- Respetar la relación **1:1 entre jefe y entidad** para comuna, ONG y brigada. Restringir cada operación a su rol y entidad; Defensa Civil tiene acceso de solo lectura y no accede al inventario privado de las ONG.
- Distinguir **propuesta, aprobación/reserva, autorización, retiro, llegada y recepción conforme**. No contar propuestas ni entregas en tránsito como ayuda recibida. Conservar cantidades, unidades, saldos y discrepancias por producto, evitando cobertura duplicada.
- La ONG decide sobre su aporte y autoriza su salida; la comuna registra necesidades y verifica recepciones. No implementar asignación de conductores ni vehículos en la plataforma.
- No asumir reglas no definidas para prioridad, reejecución del matching, rutas, información vial, supervisión o exportaciones. Una funcionalidad discutida o pendiente no se convierte en requisito por inferencia.

## Routing & Demo Authentication

- Mantener rutas, layouts y dashboards por rol. La raíz de cada rol redirige a su dashboard (ejemplo: `/ong/` → `/ong/dashboard`); obtener los demás prefijos del código real.
- Sin sesión, aplicar el flujo de acceso existente. Si un usuario intenta visitar una ruta de otro rol, redirigirlo al dashboard de su propio rol. El sidebar debe reflejar el rol efectivo; ocultar UI nunca sustituye la autorización en el servidor.
- Mientras no exista una API de autenticación estable, permitir **solo para la demo** el establecimiento de la cookie esperada `HttpOnly` desde el servidor. Aislar el hardcode en un único punto claramente identificable, reversible y reemplazable por la integración real.
- No acceder a la cookie `HttpOnly` desde JavaScript del cliente, distribuir valores simulados por componentes ni considerar el mecanismo temporal como seguridad de producción. No inventar endpoints ni contratos de API.

## Scope & Implementation

- Implementar solo comportamientos confirmados. No inventar datos geográficos de Piura, existencias reales, criterios de aceptación ni integraciones externas. Ante ambigüedades materiales, realizar la parte independiente y elevar únicamente la decisión bloqueante.
- Resolver cambios pequeños directamente; descomponer trabajo no trivial en tasks verificables. Reutilizar antes de crear abstracciones, dependencias o refactors ajenos al alcance.
- Identificar explícitamente lo **real, simulado, pendiente y no disponible**. Una interfaz visible no acredita matching, persistencia, rutas, exportaciones ni sincronización reales.
- No mostrar éxito de operaciones críticas sin confirmación. Prevenir dobles acciones y transiciones inválidas; cuando no exista backend, probar y declarar únicamente el comportamiento simulado.
- Priorizar UI accesible y utilizable desde **360 px**: etiquetas y unidades explícitas, errores por campo, estados expresados también con texto y confirmación de acciones irreversibles.
- No desplegar, destruir datos ni modificar servicios externos reales sin autorización.

## Tools & Skills — On Demand

- **No hay herramientas especiales obligatorias.** Detectar disponibilidad solo cuando corresponda; usar fallback y continuar. No instalar, actualizar ni configurar herramientas por iniciativa propia.
- **Texto y rutas:** `rg`; fallback: editor o `Select-String`/`Get-ChildItem` (PowerShell). **Sintaxis:** `sg` (ast-grep); fallback: `rg` e inspección.
- **Símbolos/referencias:** Serena; fallback: LSP o `rg`. **Arquitectura/impacto:** Repowise; fallback: imports y código verificado. No usar Repowise para búsqueda literal.
- **Documentación de dependencias externas:** Context7 / `find-docs`; fallback: documentación oficial. Para código propio, búsquedas locales.
- **Planificación:** Spec Kit (`speckit-*`) para trabajo no trivial; fallback: tasks breves. **Disciplina de implementación:** Ponytail si está activo; fallback: parche mínimo y revisión de diff.
- **UI:** `frontend-design`, `project-ui`, `web-design-guidelines`, `antislop-*`, según tarea y disponibilidad; fallback: componentes y convenciones existentes.
- **Verificación:** `project-verification`; fallback: scripts reales y checks explícitos. **Continuidad:** `session-lifecycle`; fallback: `.context/STATE.md` si existe.
- Leer `SKILL.md` solo al necesitar la skill. Su ausencia no bloquea la task; indicar la limitación únicamente si afecta el resultado.

## Verify & Deliver

- Ejecutar verificaciones pertinentes según los scripts reales y el riesgo. No inventar comandos ni reportar checks no ejecutados.
- Para UI, comprobar navegación entre roles, estados, formularios, teclado y uso móvil a **360 px**. Para lógica crítica, revisar permisos, titularidad, reservas, cantidades, duplicados, transiciones y discrepancias; probar exportaciones o rutas solo cuando formen parte del alcance implementado.
- No equiparar verificaciones de mock con validación de servidor, inventario o integración real.
- Revisar diff y staging; realizar **un commit por task completada y verificada** si hay permisos. Nunca incluir cambios ajenos ni forzar un cierre incompleto.
- Entregar resumen de cambios, evidencia de verificaciones, limitaciones y siguiente acción. Si existe `.context/STATE.md`, mantener un único `Now` y un tamaño máximo de **4 KiB**.

## Ownership & Authority

- La Constitution gobierna invariantes; Git y código verificado representan el estado real. El alcance específico debe estar confirmado antes de implementarse.
- `AGENTS.md`, `.specify/`, `.agents/skills/`, `.codex/`, `.opencode/`, `.serena/`, `.repowise/` y configuraciones de tooling son **`HUMAN_MANAGED`**: no editar sin autorización explícita.
- Los archivos de trabajo de `.context/` son **`AGENT_MANAGED`** dentro del scope autorizado; cachés, índices y logs son **`TOOL_MANAGED`**.
