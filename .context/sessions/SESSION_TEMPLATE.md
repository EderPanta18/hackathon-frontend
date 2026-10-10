---
schema: agent-session/v1
id: [SESSION_ID]
date: [SESSION_DATE]
branch: [GIT_BRANCH]
start_head: [START_GIT_HEAD]
end_head: [END_GIT_HEAD]
status: [SESSION_STATUS]
---

# [SESSION_TITLE]

## Goal

[SESSION_GOAL]
<!-- Objetivo o unidad de trabajo mayor que esta sesión avanzó. -->

## Scope

[SESSION_SCOPE]
<!-- Alcance real trabajado durante esta sesión. No confundir con el scope completo del goal o plan si éste continúa. -->

## Tasks

[TASK_SUMMARY]
<!--
Registrar únicamente las tasks relevantes para entender la sesión.
Distinguir, cuando corresponda:
- completed
- partial
- deferred
Cada task completada debe mantener un scope identificable.
-->

## Delivered

[DELIVERED_WORK]
<!--
Resultados materialmente integrados durante la sesión.
Resumir el resultado; no reproducir información recuperable directamente del diff o del código.
-->

## Verification

[VERIFICATION_EVIDENCE]
<!--
Checks realmente ejecutados y todavía relevantes como evidencia histórica.
No registrar verificaciones asumidas ni comandos que no se ejecutaron.
-->

## Commits

[TASK_SCOPED_COMMITS]
<!--
Commits creados durante la sesión.

Cada commit debe:
- corresponder a una task completada y verificada;
- contener únicamente cambios pertenecientes a su scope.

Una sesión puede contener múltiples commits.
No asumir que un único commit representa toda la sesión, goal o plan.
-->

## Decisions Promoted

[PROMOTED_DECISIONS]
<!--
Referencias a decisiones durables promovidas durante la sesión.
No duplicar aquí su rationale completo.
-->

## Persistent Material

[PERSISTENT_MATERIAL]
<!--
Referencias a evidencia, análisis, reportes, artefactos u otro material de la sesión que se decidió conservar.

No imponer una estructura física concreta; registrar sólo material con valor futuro.
-->

## Deferred

[DEFERRED_WORK]
<!--
Trabajo relevante que no quedó completado.

No usar esta sección como backlog general.
Si debe continuarse inmediatamente, reflejar el estado necesario también en el working state.
-->

## Closing State

[CLOSING_STATE]
<!--
Estado verificable al cerrar la sesión:
- qué quedó completado;
- qué sigue activo;
- qué está bloqueado;
- cuál es el punto válido de continuación.
-->
