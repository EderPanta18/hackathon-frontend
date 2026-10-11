# HTTP de demo-api v1

Fecha: 2026-10-11. Endpoints **propuestos para el servicio demo nuevo**, no endpoints ya implementados ni contrato atribuido a API futura. DTOs y errores desacoplan la UI; una API real requerirá su propio mapeo verificado.

## Transporte y respuestas

Base privada propuesta `http://127.0.0.1:5001/demo/v1`. Navegador usa exclusivamente `/api/backend` existente; el BFF añade la base y las credenciales de [auth-boundary.md](auth-boundary.md). Sin redirects ni Set-Cookie de demo-api.

JSON UTF-8. Éxito igual al cliente actual: `{success:true,data:<DTO>,meta:{demo:true}}`. Listas en data[] sin inventar PageMeta si no paginan. Error `application/problem+json`: `{success:false,type:"about:blank",title,status,code,requestId,errors?:[{field,code,message}]}`. No exponer token, SQL, stack, cuerpo ajeno ni detalles privados. `Cache-Control:no-store`, `X-Request-Id` generado servidor. Binary downloads no usan envelope.

Prioridad: null con disponibilidad explícita; capacidades no implementadas no dan resultados fabricados. Cantidades son enteros seguros; fechas UTC. Todos los datos operacionales tienen indicador simulado. Rechazar propiedades desconocidas para evitar introducir identidad/estado/cantidades calculadas desde cliente.

## Operaciones

| Método y ruta relativa | Permisos | Resultado / precondición |
| --- | --- | --- |
| GET /contexto | Cuatro roles verificados | Identidad/rol/entidad persistidos, contexto demo y capacidades; DC sin entidad operativa ni operaciones habilitadas. |
| GET /catalogo | COM | Productos activos con unidad/divisibilidad fija. |
| GET /comuna/dashboard | COM propia | Resumen de solicitudes/recepciones propias, cantidades por producto/unidad, no total heterogéneo. |
| GET /comuna/solicitudes | COM propia | Bandeja de solicitudes; sin filtro para elegir comuna ajena. |
| POST /comuna/solicitudes | COM propia |201 solicitud completa PRESENTADA; emergencia activa servidor, Idempotency-Key obligatoria. |
| GET /comuna/solicitudes/{solicitudId} | COM titular | Solicitud, saldos, diferencias históricas y despachos asociados. |
| GET /comuna/recepciones?bandeja=esperadas\|llegadas\|finalizadas | COM propia | Sin parámetro: todas las propias. Valor inválido422. |
| GET /comuna/recepciones/{despachoId} | COM destino | Enviado persistido, estado/llegada, capacidad confirmar, resultado final si existe. |
| POST /comuna/recepciones/{despachoId}/confirmacion | COM destino |201 recepción, solo llegado/no finalizado; Idempotency-Key obligatoria. |
| GET /comuna/recepciones/{despachoId}/manifiesto.xlsx | COM destino y recepción finalizada | XLSX real de lo enviado. |
| GET /comuna/recepciones/{despachoId}/acta.pdf | COM destino y recepción finalizada | PDF real de lo recibido/diferencias. |
| GET /referencias/despachos | ONG o BRI titular | Proyección mínima de sus propios despachos, solicitud de origen/productos/cantidades/estado; sin inventario ni contacto privado. No página nueva. |
| GET /intentos/{clave}?operacion=crear_solicitud\|confirmar_recepcion&recurso={ambito} | COM dueño del intento | Identificador de resultado confirmado para consultar su detalle;404 si no hay intento confirmado. ámbito=solicitudes o ID despacho. |

No endpoints de editar/cancelar solicitudes, aprobar/autorizar/retirar/llegar, administrar cuentas, cerrar emergencias, ejecutar matching, inventario o supervisión DC. Método no soportado405 con Allow; identidad sin rol para ruta403. No convertir errores de método en éxito. DC prueba fuente persistida mediante /contexto, no recibe acceso global a operaciones por este contrato.

## DTOs y cuerpos

Nombres propuestos estables para la demo y su adaptador:

```typescript
import type { Role } from "@/core/enums/user.enums";
type ContextoDTO = {
  subject: string;
  role: Role;
  entidad: { id: string; nombre: string; tipo: "comuna" | "ong" | "brigada" } | null;
  emergenciaActiva: { id: string; nombre: string } | null;
  demo: true;
  capacidades: { crearSolicitud: boolean; confirmarRecepcion: boolean;
    matching: false; prioridadCalculada: false; operacionesDC: false };
};
type ProductoDTO = { id: string; nombre: string; unidad: string; divisible: false };
type CrearSolicitud = {
  poblacionAfectada: number;
  situacion: string;
  justificacionUrgencia: string;
  lineas: { productoId: string; cantidad: number }[];
};
type SaldosDTO = {
  solicitado: number; aprobado_no_recibido: number; recibido_conforme: number;
  sin_asignar: number; aun_no_satisfecho: number;
  nunca_cubierto: number; diferencias_historicas: number;
};
type SolicitudLineaDTO = {
  id: string; productoId: string; productoNombre: string; unidad: string;
  saldos: SaldosDTO;
};
type SolicitudResumenDTO = {
  id: string; fecha: string; estado: "PRESENTADA" | "EN_ATENCION" | "PARCIAL" | "ATENDIDA";
  isSimulated: true;
};
type SolicitudDTO = SolicitudResumenDTO & {
  comuna: { id: string; nombre: string }; emergencia: { id: string; nombre: string };
  poblacionAfectada: number; situacion: string; justificacionUrgencia: string;
  prioridad: null; prioridadDisponible: false;
  lineas: SolicitudLineaDTO[];
  despachos: { id: string; estado: string; recepcionFinalizada: boolean }[];
};
type ConfirmarRecepcion = {
  lineas: { despachoLineaId: string; conforme: number; danado: number;
    equivocado: number; faltante: number; observacion: string | null }[];
};
type RecepcionDTO = {
  id: string; despachoId: string;
  estado: "FINALIZADA_CONFORME" | "FINALIZADA_CON_OBSERVACIONES";
  confirmedAt: string; confirmedBy: string; isSimulated: true;
  lineas: { despachoLineaId: string; productoId: string; productoNombre: string;
    unidad: string; enviado: number; conforme: number; danado: number;
    equivocado: number; faltante: number; recibidoFisico: number;
    observacion: string | null }[];
};
type DespachoDTO = {
  id: string; solicitudId: string;
  ong: { id: string; nombre: string }; comuna: { id: string; nombre: string };
  brigada: { id: string; nombre: string }; origenOperativo: string;
  estado: "AUTORIZADO" | "RECOJO_INICIADO" | "EN_TRANSITO" | "LLEGADA_REGISTRADA";
  llegadaAt: string | null; origen: "SEED_SIMULATED"; isSimulated: true;
  lineas: { id: string; productoId: string; productoNombre: string;
    unidad: string; enviado: number }[];
  puedeConfirmar: boolean; documentosDisponibles: boolean;
  recepcion: RecepcionDTO | null;
};
type DashboardDTO = {
  comuna: { id: string; nombre: string }; demo: true;
  solicitudesPorEstado: { estado: SolicitudResumenDTO["estado"]; cantidad: number }[];
  recepcionesPorBandeja: { bandeja: "esperadas" | "llegadas" | "finalizadas"; cantidad: number }[];
  productos: { productoId: string; nombre: string; unidad: string; saldos: SaldosDTO }[];
};
type IntentoDTO = { operacion: "crear_solicitud" | "confirmar_recepcion";
  recurso: string; resultadoId: string; estado: "CONFIRMADO" };
```

DTOs viven en `src/core/contracts/comuna.contracts.ts` como contratos puros, sin HTTP/Next/SQLite, y reutilizan el enum Role existente. El servicio implementa validadores runtime propios con Zod; JSDoc puede referenciar tipos sin importar implementaciones frontend. Los tipos TypeScript no sustituyen validación HTTP.

Unidades, comuna, emergencia, responsable, fechas, estado y saldos no son campos de creación: se obtienen en servidor. Recepción incluye exactamente todas las líneas; observación requerida por cada línea con alguna categoría no conforme positiva. `puedeConfirmar` es feedback; el comando revalida el estado vigente.

## Idempotencia y recuperación

Idempotency-Key es UUID del cliente para cada intento confirmado. Scope persistido subject+operación+recurso+clave; conservar durante toda la demo. Hash canónico de campos permitidos y líneas ordenadas. Primero validar acceso, luego buscar replay antes de rechazar estado finalizado: un replay válido debe funcionar tras el cierre/reinicio.

Mismo intento y cuerpo devuelve el status201 y el body original, sin nueva fila/evento. Misma clave con distinto cuerpo409 IDEMPOTENCY_CONFLICT. Otro intento para recepción cerrada409 RECEPTION_ALREADY_FINALIZED. Un nuevo intento de creación representa una nueva solicitud independiente, no se deduplica por parecerse a otra.

UI conserva clave y snapshot del intento pendiente por subject en sessionStorage; no credenciales. Esto permite recuperación de respuesta incierta, no operación offline ni persistencia autoritativa de solicitudes. GET intentos recupera el ID final;404 no prueba que una petición concurrente no vaya a confirmar, por lo que se reintenta siempre con la misma clave/contenido. Tras error de validación, corregir y crear intento nuevo. Tras confirmación, limpiar pendiente e invalidar consultas propias.

## Errores verificables

| Status | Códigos demo | Efecto |
| --- | --- | --- |
|400|INVALID_JSON, INVALID_IDEMPOTENCY_KEY|Sin escritura |
|401|SERVICE_UNAUTHENTICATED, SESSION_INVALID, SESSION_EXPIRED|Sin datos operacionales |
|403|FORBIDDEN, IDENTITY_NOT_BOUND, ROLE_MISMATCH|Sin contenido ajeno ni cambios |
|404|NOT_FOUND, ATTEMPT_NOT_FOUND|No existe recurso/resultado visible al sujeto |
|405|METHOD_NOT_ALLOWED|Allow explícito |
|409|IDEMPOTENCY_CONFLICT, RECEPTION_ALREADY_FINALIZED, ARRIVAL_REQUIRED, NO_ACTIVE_EMERGENCY|Estado/intent incompatibles, sin efectos |
|422|VALIDATION_ERROR|errors con ruta campo, p.ej. lineas.0.faltante; rollback total |
|503|DATABASE_BUSY, DOCUMENT_GENERATION_FAILED|Error recuperable; no éxito inventado, no alterar cierre |

BFF mantiene sus propios403 same-origin,503 backend sin configurar,502 no disponible y504 timeout, con el formato Problem Details existente. No revelar qué comuna posee un recurso ajeno.

## Documentos e informe interno

Manifiesto: MIME application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; acta: application/pdf. Content-Disposition attachment con nombre basado solo en ID seguro y extensión; no incorporar texto libre en cabeceras. Ambos no-store y solo tras finalización propia, también por URL directa.

XLSX: hoja de identificación y líneas de enviado por producto/unidad. Texto como String literal incluso si inicia =,+,-,@; no fórmulas o enlaces desde entrada de usuario. Acta: identificación común, fecha/responsable de recepción, enviado y desglose conforme/dañado/equivocado/faltante, recibido físico y observaciones. Ambos declaran DEMO/SIMULADO y no certifican entrega real. Las diferencias son parte del detalle de recepción/informe interno, sin un nuevo PDF específico ni otro módulo de reportes.

Leer hechos inmutables y generar fuera de transacción. Repetir descarga conserva cantidades/fechas operacionales; no se promete igualdad byte a byte de metadatos internos del archivo. Error de render/generación no revierte la recepción ni devuelve un archivo incompleto como éxito.
