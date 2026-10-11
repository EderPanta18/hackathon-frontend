# Alivía — Presentación y alcance del frontend

**Sistema:** Alivía.  
**Producto:** plataforma web de coordinación de ayuda humanitaria de última milla para escenarios situados en la **región Piura, Perú**.  
**Ámbito de este documento:** experiencia web y capacidades visibles para las personas usuarias.

## Propósito de la aplicación

El frontend presenta en un único entorno la información necesaria para registrar necesidades, consultar propuestas de aportes, coordinar despachos y visualizar resultados territoriales. Cada persona ingresa a un espacio propio, con navegación y acciones adaptadas a su responsabilidad. La interfaz evita que el usuario tenga que interpretar identificadores técnicos para comprender cantidades, fechas o estados.

La aplicación utiliza **Next.js App Router, React y TypeScript**. Se emplea en escritorio y teléfonos móviles desde 360 px de ancho, con formularios, tablas adaptables, paneles de indicadores y mapas interactivos.

## Usuarios y áreas de interfaz

| Perfil | Área web | Experiencia principal |
|---|---|---|
| Jefe de Comuna | `/comuna` | Registrar necesidades propias y comprobar recepciones. |
| Jefe de ONG | `/ong` | Consultar propuestas, existencias y aportes autorizados. |
| Jefe de Brigada | `/brigada` | Consultar sus despachos, recorridos y registrar avances permitidos. |
| Jefe de Defensa Civil | `/defensa-civil` | Supervisar información territorial agregada, consultar reportes y mapas sin modificar operaciones. |

La identidad asociada al perfil determina qué información se muestra. No hay un panel administrativo general ni una cuenta que combine los cuatro roles.

## Capacidades del frontend

- **Acceso contextual:** inicio de sesión, rutas protegidas, dashboard y menú lateral por rol.
- **Operación asistida:** formularios con validación, confirmación explícita, estados de carga y respuesta del servicio.
- **Información legible:** distinción entre necesidades, cantidades comprometidas, despachos y recepciones confirmadas.
- **Visualización geográfica:** mapas de Piura con capas, marcadores, selección de localidades y comparación de recorridos sobre vías.
- **Documentos:** consulta y descarga de archivos Excel y PDF desde las pantallas autorizadas.
- **Supervisión:** filtros y paneles de consulta territorial que no exponen el inventario privado de las ONG.

## Alcance de la demostración

La demostración se restringe a escenarios y entidades **simuladas de Piura**. Una ubicación cartográfica con fuente documentada puede ser real, pero su asociación con una necesidad, una ONG, un despacho o una condición vial del simulacro no implica una situación operativa vigente.

El acceso web de demostración ya dispone de un mecanismo temporal de sesión con cookie `HttpOnly`. Las funcionalidades que requieren datos utilizan contratos preparados para un servicio de simulación persistente y, posteriormente, una API externa real. La sustitución de la fuente de datos no redefine la navegación ni las interfaces de usuario.

El producto **no se presenta como un sistema operativo para emergencias reales**: no certifica vías transitables, no rastrea vehículos por GPS, no predice desastres, no funciona sin conexión por el mero hecho de mostrar datos locales y no produce documentos con valor de firma oficial.

## Criterios de lectura para evaluación

El alcance funcional se expresa como diseño de la experiencia del producto, no como certificación de que todas las pantallas hayan sido terminadas o verificadas. Cuando una capacidad utiliza información ficticia se indica **Simulación**; cuando una fuente es histórica, se muestra su origen y fecha disponibles; cuando faltan datos, la interfaz comunica **Sin información** o **No disponible** en lugar de completar valores inventados.
