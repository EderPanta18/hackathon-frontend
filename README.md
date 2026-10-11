# Alivía

**Plataforma web de coordinación de ayuda humanitaria para la región Piura, Perú.**

Alivía reúne en una interfaz las necesidades registradas por las comunidades, las propuestas de apoyo de las ONG, el seguimiento de despachos por brigadas y la consulta territorial de Defensa Civil. Cada perfil dispone de un espacio de trabajo propio, con información y acciones acordes con su responsabilidad.

> **Entorno de demostración:** los usuarios, solicitudes, inventarios, entregas y escenarios de bloqueos viales son simulados. Las referencias cartográficas e históricas, cuando se utilizan, se diferencian de las condiciones operativas actuales. La plataforma no debe emplearse como fuente de información oficial durante una emergencia real.

## Espacios de la aplicación

| Perfil | Ruta de inicio | Función de la interfaz |
|---|---|---|
| Jefe de Comuna | `/comuna/dashboard` | Registrar necesidades, consultar solicitudes y confirmar recepciones. |
| Jefe de ONG | `/ong/dashboard` | Consultar inventario y propuestas, confirmar aportes y autorizar despachos. |
| Jefe de Brigada | `/brigada/dashboard` | Revisar despachos autorizados, consultar recorridos y registrar retiro y llegada. |
| Defensa Civil | `/defensa-civil/dashboard` | Explorar información territorial, entregas confirmadas, brechas e informes en modo lectura. |

La raíz `/` conduce al acceso o al dashboard del perfil autenticado. Las rutas de otros roles se mantienen protegidas y los recursos se limitan a la entidad correspondiente. No existe un dashboard común para todos los perfiles.

## Tecnologías

- **Aplicación:** Next.js 16 (App Router), React 19 y TypeScript.
- **Interfaz:** Tailwind CSS 4, componentes adaptados de shadcn/Base UI/Radix e iconos Lucide.
- **Formularios y datos:** React Hook Form, Zod y TanStack Query, según la funcionalidad.
- **Cartografía:** Leaflet y React Leaflet; MapLibre GL está disponible para necesidades de visualización específicas.
- **Calidad:** Biome y herramientas de prueba instaladas en el proyecto.
- **Gestor de paquetes:** pnpm.

## Arquitectura del frontend

La aplicación separa rutas y layouts (`app/`), composición de pantallas (`views/`), funcionalidades (`modules/`), componentes visuales reutilizables (`ui/` y `shared/`) e integración técnica (`lib/` y `core/`). El shell de navegación se organiza dentro de `modules/app/` y adapta el menú al rol autenticado.

La interfaz consume contratos de servicio: **no accede directamente a SQLite desde el navegador ni asume la persistencia y las reglas definitivas de negocio**. Mientras la API externa no esté disponible, los datos de la demostración se gestionan mediante una integración simulada y sustituible, con persistencia SQLite prevista en un servicio aislado. Esto permite incorporar la API real sin reescribir las pantallas.

El **inicio de sesión de demostración ya está implementado** con una cookie `HttpOnly` gestionada del lado del servidor. Se conserva como mecanismo temporal hasta su reemplazo por la autenticación definitiva; las verificaciones visuales de rol no sustituyen los permisos que deberá imponer la API real.

## Mapas y recorridos

Las vistas cartográficas están enfocadas en **Piura** y contemplan mapas manipulables, selección de lugares, capas, referencias de origen y destino, y comparación de recorridos sobre geometría vial. Los cierres de vías y las alternativas de recorrido del escenario son **simulados**: no representan tráfico, GPS, transitabilidad actual ni una ruta segura certificada.

## Puesta en marcha

**Requisitos:** Node.js compatible con Next.js 16 y pnpm. Ejecutar los comandos desde la raíz del proyecto.

```bash
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000), salvo que la configuración local utilice otro puerto.

### Comandos disponibles

| Comando | Función |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo. |
| `pnpm build` | Genera la compilación de producción. |
| `pnpm start` | Inicia la aplicación compilada. |
| `pnpm lint` | Ejecuta `biome check`. |
| `pnpm format` | Aplica formato con Biome; **modifica archivos**. |

Estos comandos corresponden a los scripts declarados en `package.json`. Las pruebas automatizadas se ejecutan según las suites realmente presentes; no se presupone un script `test`.

## Estado de la demostración

Alivía se encuentra en desarrollo incremental. El acceso temporal sin API real está implementado; las pantallas de los cuatro perfiles, la simulación persistente, los mapas operativos y las descargas se integran y verifican por fases. Su inclusión en el alcance no implica que todas estas capacidades estén terminadas o validadas actualmente.

La aplicación distingue entre **propuesto, aprobado, autorizado, retirado, llegado y recibido conforme**. Una acción mostrada en la interfaz solo debe considerarse completada tras su confirmación por el servicio correspondiente; una llegada registrada no equivale a recepción confirmada.

## Documentación

La carpeta [`docs/`](docs/) contiene la documentación técnica del frontend: arquitectura, módulos, rutas, sesiones, datos simulados, mapas, sistema visual, descargas y criterios de validación.

---

**Alivía · Coordinación humanitaria en Piura · Datos de demostración**
