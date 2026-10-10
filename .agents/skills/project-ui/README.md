# Project UI — skill local

Skill de agentes específica del sistema `src/ui/` personalizado (adaptado de shadcn/ui).

## Instalación manual

Extraer el ZIP en la raíz de `hackathon-frontend` conservando las carpetas:

```text
hackathon-frontend/
└── .agents/
    └── skills/
        └── project-ui/
            ├── SKILL.md
            └── references/
                ├── component-index.md
                ├── component-guide.md
                ├── workflows.md
                ├── usage-examples.md
                ├── data-table.md
                ├── date-picker.md
                └── verification.md
```

El archivo **`SKILL.md` sí es obligatorio** para la detección estándar de una skill; el resto de archivos se consulta solo cuando haga falta. `.agents/skills/` es una ubicación común adecuada para Codex y OpenCode, si ambos están configurados para cargar skills locales compatibles.

## Uso

Instruye a tu agente: «Usa la skill `project-ui` para componer esta interfaz con los componentes existentes en `src/ui/`; verifica los imports y las props del código real».

El agente debe leer el catálogo **solo cuando lo necesite**, no precargar todos los documentos ni repetirlos en AGENTS.md.

## Política recomendada en AGENTS.md (fragmento opcional)

```md
- Para tareas de interfaz, activar la skill local `project-ui` y reutilizar la API real de `src/ui/` antes de crear componentes.
- El código verificado del proyecto prevalece sobre el catálogo y la documentación externa de shadcn.
- No ejecutar instalaciones o regeneraciones con shadcn CLI ni sobrescribir `src/ui/` sin autorización explícita.
```

## Proveniencia y límites

- `component-index.md` y `component-guide.md` se basan en los dos documentos proporcionados por el usuario.
- Esos documentos describen exportaciones y organización, **no** tipos completos o implementación real de archivos `.tsx`.
- Las guías `data-table.md` y `date-picker.md` se derivan de los resúmenes presentes en dichos documentos; **no** son reproducciones de los patrones originales no adjuntados.
- No se realizó compilación del repositorio Next.js ni inspección del código UI actual, ya que no se proporcionó el repositorio.
- Tras cambios de exportaciones o disponibilidad de componentes, cotejar y actualizar el catálogo si se desea mantenerlo vigente.
