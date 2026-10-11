# Alivía — Diseño visual, componentes y usabilidad

**Objetivo:** una interfaz de operación clara, consistente y utilizable en escritorio y móvil, con elementos visuales reutilizados y lectura comprensible para usuarios no técnicos.

## Sistema visual

La aplicación utiliza Tailwind CSS y componentes del proyecto basados en shadcn, Base UI y Radix, junto con iconos Lucide. Las primitivas adaptadas se reutilizan sin sobrescribirlas indiscriminadamente con generadores.

| Grupo | Componentes y función |
|---|---|
| Navegación | Sidebar, menús, breadcrumbs, pestañas y enlaces. |
| Formularios | Input, Select, Field, Textarea, Checkbox y diálogos de confirmación. |
| Consulta | Card, Badge, Table, listas y bloques de indicadores. |
| Estados | Alert, Empty State, Error State, Skeleton, Spinner y notificaciones. |
| Composición | Paneles, filtros y controles de búsqueda. |
| Geografía | Contenedor de mapa, leyendas, fichas y controles de capa. |

Algunas primitivas del repositorio pueden encontrarse deshabilitadas en sus exportaciones; su mera presencia física no indica que estén disponibles en ejecución.

## Composición de pantallas

Las áreas autenticadas comparten una estructura: identidad de la aplicación, rol/entidad, menú contextual, contenido principal y opción de cerrar sesión. El sidebar cambia sus enlaces según el rol, pero mantiene las mismas convenciones visuales.

Los dashboards priorizan indicadores útiles y tareas de acceso rápido; los listados permiten localizar registros; los detalles reúnen contexto, estado y acciones permitidas. Los mensajes no exponen códigos internos cuando existe una descripción legible.

## Formas de expresar estados

- Utilizar **texto, icono y color**, nunca color únicamente, para prioridad, riesgo o progreso.
- Distinguir carga, ausencia de resultados, operación pendiente, confirmación y fallo.
- Mostrar unidades junto a cantidades y fecha/hora junto a eventos relevantes.
- Explicar operaciones irreversibles antes de enviar su confirmación.
- En una acción denegada o un conflicto, mantener una salida clara: volver, actualizar o reintentar de forma segura.

## Adaptación a móvil

La interfaz se organiza desde un viewport mínimo de **360 × 800 px**. En ancho reducido, el menú lateral se convierte en un panel desplegable; los formularios se apilan y las tablas críticas adoptan filas etiquetadas o permiten una lectura no ambigua sin desplazamiento horizontal de toda la página.

Los controles táctiles mantienen área de interacción suficiente, los mapas no impiden utilizar el resto de la pantalla y los diálogos conservan acciones visibles al abrir el teclado del teléfono.

## Accesibilidad aplicada

| Necesidad | Tratamiento de la interfaz |
|---|---|
| Navegación por teclado | Orden lógico de foco y controles operables sin ratón. |
| Formularios | Etiquetas persistentes, ayudas y errores asociados a sus campos. |
| Acciones con iconos | Nombre accesible y estado perceptible. |
| Confirmaciones y errores | Mensajes comprensibles, no dependientes solo de color. |
| Movimiento | Respetar preferencias de movimiento reducido. |
| Mapas | Complementar el contenido visual con listados y detalles textuales. |

## Identidad y legibilidad

La identidad del producto se aplica mediante una paleta consistente, tipografía de interfaz legible, separación visual de secciones y números tabulares cuando convenga comparar cantidades. Las señales visuales de simulación deben ser discretas pero inequívocas. Se evita ornamentación que compita con la información operativa.
