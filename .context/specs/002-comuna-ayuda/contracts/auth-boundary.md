# Contrato de sesión y frontera servidor-servidor demo

Fecha: 2026-10-11. Contrato a implementar, sustentado en la opción A. No cambia el login ni promete seguridad de producción.

## Flujo y autoridad

```text
Navegador → /api/backend/* existente en Next
             cookie HttpOnly actual, Origin mismo origen en mutaciones
          → demo-api privada (loopback)
             cookie seleccionada + credencial de servicio inyectada
          → verificación de ambas → subject/rol en SQLite → permisos/recurso/estado
```

El BFF mantiene transporte sin reglas de dominio. Cookie y cabeceras recibidas son entradas no confiables hasta verificación; la firma del JWT, no su presencia, autentica identidad. La credencial de servicio acredita al proceso BFF y no reemplaza al usuario. La API no tiene login/sign-in/selector de rol ni emite Set-Cookie.

## Contrato existente que se conserva

| Aspecto | Valor/fuente comprobada |
| --- | --- |
| Nombre cookie | SECURITY_CONFIG.authCookieNames.accessToken; AUTH_ACCESS_COOKIE_NAME con fallback existente accessToken |
| Atributos | HttpOnly, SameSite=Lax, Path=/, duración de 8 h; emisión/limpieza actuales |
| JWT | HS256, iss=dev-auth, sub y role, iat y exp; no aud ni entityId |
| Subjects actuales | dev-comuna, dev-ong, dev-brigada, dev-defensa-civil |
| Roles | comuna, ong, brigada, defensaCivil; distinguir estos valores de abreviaturas COM/ONG/BRI/DC |
| Clave demo | DEV_AUTH_SECRET ≥32 bytes, distinta de JWT_ACCESS_SECRET; solo servidor, modo desarrollo |
| Frontend sesión | getServerSession/resolveRequestSession y verificador actuales; sin duplicación |

Demo-api comparte exclusivamente DEV_AUTH_SECRET con el emisor demo. Fija algoritmo HS256 e issuer dev-auth, exige exp/sub/role, tolerancia temporal de 5 s y verifica subject no vacío/rol permitido. Nunca fallback a JWT_ACCESS_SECRET ni algoritmos indicados libremente por el token. No añadir aud al token. Precondición: JWT_AUDIENCE vacía/ausente mientras se usa demo, por incompatibilidad observada del verificador frontend; no cambiar auth para sortearla.

Tras verificar, buscar subject activo en identities. Rol firmado debe coincidir con rol almacenado. COM/ONG/BRI necesitan vínculo 1:1 de tipo correcto; DC sin entidad operacional. Rol válido con identidad desconocida/inactiva/vínculo incoherente →403. Roles en body/query/X-Role/X-Comuna-Id se rechazan si son campos no permitidos y jamás se usan para autorizar.

## Credencial del proceso servidor

- Nueva variable operacional propuesta `DEMO_API_SERVICE_TOKEN`: valor aleatorio ≥32 bytes, distinto de las claves JWT. Se provisiona solo durante implementación; nunca en NEXT_PUBLIC, repo, logs, URL, DTO o respuesta.
- Cabecera propuesta `X-Demo-Service-Token`. BFF la establece desde entorno después de reconstruir allowlist; una cabecera homónima del navegador se descarta. El servicio compara en tiempo constante tras validar longitud.
- Activación en transporte solo bajo el flag demo existente `SECURITY_CONFIG.devAuth.enabled` y NODE_ENV distinto de production. Falta de credencial/configuración en modo demo →503 antes de enviar. Demo-api rechaza arranque en production o sin habilitación/configuración demo.
- Antes de inyectar la credencial, validar que BACKEND_API_URL usa el origen loopback y base demo configurados (127.0.0.1:5001/demo/v1), sin credenciales/query/fragmento. Una URL real o inesperada falla503 y nunca recibe la credencial de demo. No seguir redirects con esa credencial.
- La API escucha 127.0.0.1:5001, sin CORS de navegador. No publicar puerto ni añadir despliegue en esta fase. El uso remoto necesitaría transporte TLS explícito; queda fuera de este entorno local.
- Entrada directa con JWT válido pero sin credencial del proceso →401. Credencial correcta sin JWT válido →401. Ninguna entrada de navegador se toma por identidad del servidor.

## Ajustes mínimos al transporte existente

`src/lib/bff/backend-proxy.server.ts`: inyectar credencial en modo demo y permitir únicamente `Idempotency-Key` adicional. No copiar Authorization ni cabeceras de identidad. Mantener selección de cookie, control Origin/Sec-Fetch-Site, validación de destino/path, timeout de 30 s, streaming, redirect manual, no-store, status y Problem Details del upstream.

El handler `src/app/api/backend/[...path]/route.ts` continúa delegando sin negocio. `src/proxy.ts` sigue excluyendo /api/backend y /api/dev-auth: las respuestas API401/403 no se convierten en redirects web. Content-Type/Content-Disposition ya se reenvían para documentos. Demo-api no redirige ni modifica cookies.

Configuración de ejecución propuesta: BACKEND_API_URL=http://127.0.0.1:5001/demo/v1 en entorno local no rastreado. Se reutiliza getBackendApiUrl, no se inventa otra URL pública ni otro BFF. Nombre cookie sincronizado con configuración existente; API no acepta dos nombres arbitrarios como fallback.

El acceso demo usa el DevRoleSwitcher ya implementado. El formulario normal de credenciales llama /auth/login mediante el BFF; demo-api no implementa ese endpoint. Conservar formulario y errores existentes sin afirmar que autentica credenciales contra demo-api. No crear otro login para resolver esta limitación.

La inspección estática también detectó que DevRoleSwitcher llama `/api/dev-auth/sign-out`, mientras el archivo actual está en `src/app/api/dev-auth/sign.out/route.ts`. Registrar esta discrepancia preexistente al verificar cierre de sesión; no atribuirle funcionamiento probado ni corregirla dentro del servicio COM. Este plan conserva esos archivos.

## Auth que queda expresamente fuera de modificación

- `src/app/(public)/login/page.tsx` y `LoginClientShell.tsx`.
- `src/modules/auth/**`, `src/modules/dev-auth/**` y `src/app/api/dev-auth/**`, incluido el nombre real de ruta sign.out.
- `src/lib/server/session.server.ts`, `jwt.server.ts`, `security.server.ts`.
- `src/lib/config/security.config.ts` y `src/lib/bff/backend-cookie.server.ts`.
- Subjects, rol del JWT, firma, emisor, formato/nombre/atributos de cookie y flujo de cierre de sesión.

Separadamente, la incompatibilidad de navegación permite ajustar `access-policy.ts`, `middleware-flow.ts` y destinos/configuración de rutas ya existentes: prefijos→dashboard, acceso cruzado→dashboard propio. Reutilizar la política, sin guard paralelo. Los componentes AppShell/AppSidebar se reutilizan; navegación COM añade rutas confirmadas. No añadir pantallas funcionales de otros roles.

## Casos de validación futura

1. Cookie alterada, token caducado, issuer/algoritmo erróneos y credencial servicio ausente →401 sin contenido privado.
2. X-Role/comunaId/subject del cliente no cambian identidad; rol firmado distinto de DB o recurso ajeno →403.
3. Misma cookie emitida por login actual funciona en Next y demo-api; no leerla con JS cliente. Subjects fixture adicionales se firman solo en tests aislados.
4. Petición BFF de escritura sin señal same-origin →403; con Origin permitido conserva Idempotency-Key y resultado upstream.
5. Paquete cliente no contiene secretos, token de servicio, import node:sqlite ni código de reglas de servicio.
6. Navegación web sin sesión conserva login; cruzada redirige al dashboard propio. Es distinto de la autorización API, que se prueba directamente.

Todo lo anterior es aceptación a ejecutar durante implementación, no resultados ya observados.
