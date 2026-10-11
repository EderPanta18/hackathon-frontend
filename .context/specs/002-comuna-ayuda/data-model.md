# Modelo de datos de la SIMULACIÓN

Fecha: 2026-10-11. Diseño propuesto, no esquema ya implementado. Propietario único: demo-api; frontend consume DTOs de [contratos](contracts/demo-api.md).

## Almacenamiento y convenciones

- Una BD local `.development/demo-api/operational.sqlite` para los cuatro roles, nunca una copia por usuario. Tablas STRICT; FK activadas por conexión, WAL, synchronous FULL, busy_timeout de 1000 ms; parámetros SQL, sin concatenar entradas.
- Resolver BD/backups mediante ruta absoluta derivada de la ubicación del módulo del servicio hacia `.development/demo-api/` de la raíz del repo, nunca desde process.cwd(). El comando pnpm --dir cambia cwd. En demo, rechazar ubicaciones fuera de ese directorio canónico; tests usan una raíz temporal explícita separada.
- IDs de nuevos hechos como UUID opacos del servicio; IDs semilla deterministas con prefijo seed. Fechas UTC ISO8601 del servidor. Origen USER o SEED_SIMULATED y `is_simulated=true` para datos demo. No coordenadas, beneficiarios nominales ni contactos privados.
- Catálogo inicial indivisible: cantidades enteras positivas seguras en solicitudes/envíos y enteras no negativas en conciliación. API rechaza fracciones, NaN, infinito y valores fuera de Number.MAX_SAFE_INTEGER; sumas también verificadas. Unidad no se convierte. Cualquier catálogo fraccionario futuro necesitará precisión contractual explícita; no usar REAL para conciliar.

## Entidades persistidas

| Tabla | Campos principales | Restricciones / relaciones |
| --- | --- | --- |
| areas | id, nombre, is_simulated | Exactamente siete iniciales, nombres Área DEMO Piura01…07 (FICTICIA); sin geografía inventada. |
| entities | id, tipo, nombre, area_id | tipo comuna/ong/brigada; comuna requiere área; ninguna entidad DC. |
| identities | subject PK, role, entity_id, active | role comuna/ong/brigada/defensaCivil; entity_id UNIQUE; COM/ONG/BRI requieren entidad del mismo tipo, DC requiere NULL. |
| products | id, nombre, unidad, divisible, active | Unidad fija no vacía; semilla divisible=false. No tabla de stock requerida por COM. |
| emergencies | id, nombre, estado | ACTIVA/FINALIZADA; una activa precargada y una histórica ficticia. Sin operación web de cierre. |
| requests | id, comuna_id, emergencia_id, poblacion, situacion, urgencia, created_at, created_by, origen | Población entera positiva; textos trim no vacíos; creador COM titular. No columna de prioridad calculada ficticia. |
| request_lines | id, request_id, product_id, unidad, solicitado | UNIQUE(request_id,product_id); cantidad positiva; unidad snapshot coincide con catálogo; 1…5 líneas por agregado. |
| approvals | id, request_id, ong_id, origen | Referencia mínima precargada de aporte aprobado; origen SEED_SIMULATED. No propuesta generada ni reserva real de inventario. |
| approval_lines | id, approval_id, request_line_id, aprobado | UNIQUE(approval_id,request_line_id); positivo, misma solicitud/producto; suma de aprobados ≤ solicitado. |
| dispatches | id, approval_id, comuna_id, ong_id, brigada_id, origen_operativo, estado, llegada_at, origen | Un aporte/ONG/origen por despacho. Estados logísticos de referencia AUTORIZADO/RECOJO_INICIADO/EN_TRANSITO/LLEGADA_REGISTRADA. Llegada requiere llegada_at. |
| dispatch_lines | id, dispatch_id, approval_line_id, enviado | UNIQUE(dispatch_id,approval_line_id); positivo; producto/unidad heredados; total enviado contra aporte ≤ aprobado. |
| receptions | id, dispatch_id, comuna_id, confirmed_by, confirmed_at, estado, origen | dispatch_id UNIQUE; fecha/identidad de servicio; FINALIZADA_CONFORME/FINALIZADA_CON_OBSERVACIONES, terminales. |
| reception_lines | id, reception_id, dispatch_line_id, enviado_snapshot, conforme, danado, equivocado, faltante, observacion | dispatch_line_id UNIQUE; categorías enteras ≥0; CHECK suma=enviado_snapshot; diferencias requieren observación no vacía. |
| idempotency | subject, operacion, recurso, key, request_hash, status_code, response_json, created_at | PK(subject,operacion,recurso,key); respuesta exitosa guardada con agregado/auditoría. No expiración durante demo. |
| audit_events | id, subject, role, entity_id, tipo, object_id, occurred_at, cantidades_json, origen | Append-only por API; un evento operativo por escritura aceptada. Precarga usa system:seed, no atribución falsa a ONG/BRI. |
| schema_migrations | version PK, checksum, applied_at | Aplicación ordenada, checksum validado; no up/down automático al reiniciar. |
| seed_versions | version PK, checksum, applied_at | Registro solo tras validar semilla completa. Nunca sustituye cambios de usuario. |

FK ordinarias y compuestas, o triggers mínimos cuando una FK no pueda expresar el tipo, protegen: identidad→tipo entidad; línea aprobación→misma solicitud; despacho→misma ONG y comuna de solicitud; recepción→destino; línea recepción→despacho de su cabecera. No basta verificar IDs existentes por separado. Checks de sumas agregadas y 1…5 líneas se aplican dentro de la transacción, además de UNIQUE/FK/CHECK locales.

Cada entidad operacional COM/ONG/BRI debe tener un jefe al terminar la semilla: UNIQUE evita dos jefes; auditoría de carga rechaza entidades sin jefe y jefes compartidos. No API de administración de cuentas. Sin contraseñas nuevas: son identidades verificadas por la sesión preexistente.

## Semilla idempotente

1. Catálogo ficticio de cinco productos: botella de agua, paquete alimentario, manta, kit de higiene y carpa; cada unidad explícita (botella/paquete/unidad/kit/unidad), indivisible. No equivalencias ni stock real.
2. Siete áreas y una comuna ficticia por área; ONG y brigada demo con origen operativo ficticio sin coordenadas. Emergencias anterior/finalizada y actual/activa.
3. Subjects exactos dev-comuna, dev-ong, dev-brigada y dev-defensa-civil con roles reales; seis subjects seed-comuna-02…07 completan jefaturas. Solo helpers de tests pueden firmar esas identidades con clave de prueba: ningún selector/login web nuevo.
4. Escenario S100/A70 con despacho de20 ya finalizado conforme y otro de50 llegado pendiente: P50/R20/sin30/no_satisfecho80. Otro escenario S100/A70 con despacho de70 llegado sin recepción permite caso65/2/1/2. Un despacho EN_TRANSITO prueba bloqueo antes de llegada. Cada envío pertenece a una solicitud y aporte coherentes; no sobreaprobar.
5. Una referencia ajena de otra comuna para aislamiento; precargas identificadas SEED_SIMULATED. Recepción precargada del escenario20 es hecho simulado, no acción real del jefe.
6. INSERT con conflicto dirigido a PK esperada, nunca OR REPLACE. Comparar identidad/contenido/vínculos iniciales; incompatibilidad falla con diagnóstico, sin reset. Si seed_versions coincide y hechos iniciales existen, no reabrir cierres ni reescribir sus resultados.

Los ejemplos y nombres son fixtures explícitamente ficticios de esta demo, no localidades/existencias verificadas. Las nuevas solicitudes del usuario quedan PRESENTADA, sin generación automática de aportes o despacho fixture para cada alta.

## Saldos y estados derivados

Por línea, S solicitado; A total aprobado persistido. F son líneas enviadas con recepción finalizada. P=A−Σ(enviado de F), R=Σ(conforme de F). P incluye aporte pendiente aún no enviado y envíos no finalizados, sin contar dos veces despacho+aprobación.

| Dato | Fórmula / significado |
| --- | --- |
| solicitado | S |
| aprobado_no_recibido | P |
| recibido_conforme | R |
| sin_asignar | max(0,S−R−P), saldo informativo |
| aun_no_satisfecho | max(0,S−R) |
| nunca_cubierto | max(0,S−A), origen de demanda nunca comprometida |
| diferencias_historicas | Σ(danado+equivocado+faltante de F), no elegible por cierre |
| recibido_fisico | conforme+danado+equivocado por recepción, no incluye faltante |

Con S100/A70 y cierre de70 con65 conformes y5 diferencias: P0/R65/sin35/no_satisfecho35, nunca_cubierto30 y diferencias5. Cerrar solo un despacho no elimina el remanente aprobado de otros envíos. Ninguna consulta de saldos escribe ni dispara matching. No tabla materializada de saldos que pueda divergir.

Estados solicitud: PRESENTADA si no hay atención registrada; EN_ATENCION si existe aporte/despacho pero R=0; PARCIAL si alguna recepción conforme existe y falta alguna línea; ATENDIDA solo si todas las líneas alcanzan S. Datos corruptos que excedan cantidades se rechazan como error de integridad, no se ocultan mediante max(0). Llegada y cierre con diferencias no equivalen a atención total.

Recepción no tiene fila borrador: pendiente es despacho llegado sin receptions. Finalizada conforme si todas las categorías no conformes son cero; finalizada con observaciones en otro caso. No mutación pública de llegada/retirada/aprobación.

Las bandejas son excluyentes: finalizadas si existe recepción; llegadas si el despacho está LLEGADA_REGISTRADA y no tiene recepción; esperadas para los estados logísticos anteriores sin recepción. Dashboard y lista usan esta misma proyección. Finalizar recepción no inventa otro cambio de estado logístico.

## Transacción de comandos y reintentos

1. Verificar credencial de servicio, JWT, identidad persistida y titularidad; validar forma del cuerpo. Antes de replay comprobar que la identidad sigue activa/autorizada.
2. BEGIN IMMEDIATE. Buscar idempotency por subject+operación+recurso+clave; comparar hash de cuerpo canónico (campos permitidos, líneas ordenadas por ID, números normalizados). Mismo hash devuelve status/body almacenados; distinto hash409.
3. Sin replay: revalidar dentro de transacción emergencia/propiedad/estado/cantidades. Para recepción exigir LLEGADA_REGISTRADA, destino y ausencia de cierre; cuerpo contiene exactamente las líneas enviadas.
4. Insertar agregado completo, evento y resultado idempotente. Actualizaciones de saldos son vistas derivadas de los mismos hechos. COMMIT antes de responder.
5. Cualquier error implica ROLLBACK. Otra clave para un despacho ya finalizado409; UNIQUE protege un único cierre aun desde conexiones distintas. No HTTP, generación de archivos ni await de red durante la transacción.

Si se pierde la respuesta tras COMMIT, replay devuelve el mismo resultado sin otro evento. Los errores no se guardan como éxito idempotente: el usuario puede corregir/reintentar. La clave conserva propósito/contenido; tras corrección se crea un intento nuevo. Busy agotado503 con Retry-After1, sin efectos parciales.

## Permisos y proyecciones

| Rol verificado y almacenado | Lectura autorizada en esta fase | Escritura |
| --- | --- | --- |
| comuna | Contexto/catálogo y solicitudes/despachos/recepciones propios; documentos propios finalizados | Crear solicitud y confirmar recepción propia |
| ong | Contexto y referencias de sus despachos, sin datos sensibles de otras entidades | Ninguna |
| brigada | Contexto y despachos ya vinculados a su brigada | Ninguna |
| defensaCivil | Contexto/identidad persistidos y capacidades; operaciones/informes aún no disponibles | Ninguna |

No se habilita supervisión territorial o lectura global de recepciones para DC: sigue pendiente resolver su alcance, conforme spec. Los cuatro roles prueban la fuente común mediante contexto persistido; ONG/BRI además leen su proyección mínima. No se añaden pantallas de esos roles.

## Migraciones, backup y reversión

Archivos numerados SQL .up.sql/.down.sql, checksum y transacción. Arranque aplica up pendiente y semilla verificada; nunca down/reset. Primer down elimina tablas en orden inverso de dependencias, exclusivamente sobre BD descartable en pruebas. En datos conservados: backup consistente mediante node:sqlite.backup y autorización para down destructivo. Reversibilidad no significa ausencia de pérdida.

Datos, WAL, SHM y backups dentro de `.development/demo-api/`; secretos en `.env.local` ignorado. Servicio aborta ante ubicación de BD/backups dentro de fuente rastreada. Tests usan temporales únicos y no la BD persistida. No copiar .sqlite abierto ni eliminar WAL/SHM manualmente. Restauración con servicio detenido y conexión cerrada; comprobar integridad y schema version de la copia antes de sustituir. La fase de plan no crea BD, secretos ni backups.
