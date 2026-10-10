# Sessions

## Purpose

Conserva historia útil de unidades de trabajo persistentes sin convertirla en contexto de arranque.

Una sesión representa una unidad de continuidad del trabajo.

No equivale necesariamente a:

```text
una conversación
una task
un goal completo
```

Una misma sesión puede continuar entre distintos agentes o chats mientras siga representando la misma unidad de trabajo.

## Loading Policy

Las sesiones históricas no forman parte del bootstrap.

Se consultan únicamente cuando existe una pregunta concreta que no puede resolverse de forma suficiente con:

```text
código actual
working state
decisiones durables
planificación vigente
```

El historial sirve para recuperar contexto pasado, no para sustituir el estado actual del proyecto.

## Responsibility

`sessions/` representa:

```text
qué trabajo se realizó
→ qué tasks se completaron
→ qué verificaciones fueron relevantes
→ qué commits materializaron ese trabajo
→ qué decisiones o artefactos surgieron
→ qué quedó diferido
```

No representa:

```text
estado actual
→ working state

intención y planificación
→ specs

rationale durable
→ decisions

procedimientos reutilizables
→ skills
```

## Session Boundaries

Una sesión debe mantenerse mientras exista continuidad real de trabajo.

Cambiar de:

```text
chat
agente
runtime
context window
```

no obliga por sí mismo a crear una nueva sesión.

Una nueva sesión persistente tiene sentido cuando cambia de forma material la unidad de trabajo o cuando el workflow de continuidad determina que el contexto anterior debe cerrarse.

## Tasks and Commits

Una sesión puede contener múltiples tasks.

Cada task completada y verificada puede producir su propio commit.

Por tanto:

```text
task
→ unidad de implementación, verificación y commit

session
→ unidad de continuidad

goal / plan
→ unidad de coordinación mayor
```

Los commits registrados durante una sesión deben mantener su scope limitado a la task correspondiente.

## Historical Value

No todo lo ocurrido durante una sesión merece conservarse.

Persistir únicamente información con valor futuro, por ejemplo:

- trabajo entregado;
- verificaciones relevantes;
- commits task-scoped;
- decisiones promovidas;
- material técnico útil;
- trabajo diferido;
- estado de cierre.

No conservar por defecto:

- outputs crudos de herramientas;
- transcript completo;
- hipótesis descartadas;
- relecturas;
- logs sin valor futuro;
- temporales.

## Supporting Material

Una sesión puede producir material auxiliar cuando realmente tenga valor.

Ejemplos:

```text
reports
evidence
artifacts
scratch
```

La organización física concreta puede variar según el proyecto y el workflow utilizado.

No crear estructuras vacías sólo para satisfacer una forma predefinida.

El material temporal debe descartarse al cerrar la sesión.

Si un artefacto merece sobrevivir, debe conservarse en la categoría adecuada.

## Knowledge Promotion

Antes de cerrar una sesión, clasificar la información relevante:

```text
sólo útil durante ejecución
→ descartar

historia útil
→ conservar en la sesión

condiciona trabajo futuro
→ promover a durable decision

procedimiento repetible
→ promover a skill

documentación estable
→ actualizar cuando el trabajo haya convergido
```

No promover información sólo porque haya sido producida durante la sesión.

## Closing

El cierre debe dejar un historial breve y verificable del trabajo realizado.

Debe ser posible entender:

```text
qué se intentó
qué se completó
qué se verificó
qué commits corresponden al trabajo
qué conocimiento fue promovido
qué quedó pendiente
```

`SESSION_TEMPLATE.md` define el formato concreto usado para registrar una sesión.

## Invariants

- Las sesiones históricas no se precargan.
- Una sesión no equivale automáticamente a un chat.
- Una sesión puede contener múltiples tasks y commits.
- Los commits pertenecen al scope de tasks, no al scope completo de la sesión.
- El historial no sustituye al working state.
- El transcript no es la fuente durable de verdad.
- Sólo debe conservarse información con valor futuro.
- La organización física de material auxiliar puede adaptarse al proyecto sin cambiar la responsabilidad de `sessions/`.
