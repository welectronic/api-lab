# ROSTER — quién ocupa cada rol

Este es el **único archivo** que menciona herramientas y modelos concretos. La metodología habla solo de roles. Cuando cambie un modelo o una herramienta, se edita aquí y nada más.

Un proyecto puede tener su propio `ROSTER.md` en su carpeta; si existe, reemplaza a este.

## Roles

| ID | Rol | Perfil de tareas |
|---|---|---|
| `PO` | Product Owner (humano) | Define el qué y el porqué, prioriza, aprueba alcance y arquitectura, activa a las instancias y hace merge/PR |
| `LIDER` | Líder técnico (IA) | Planea, especifica, reparte, desarrolla lo crítico, revisa y aprueba o rechaza |
| `SENIOR-1` | Desarrollador senior (IA) | Módulos backend con contrato claro, lógica de negocio, tests de integración |
| `SENIOR-2` | Desarrollador senior (IA) | Features completas, frontend, tareas de mucho contexto, diagnósticos de repos |
| `RAPIDO` | Desarrollador de volumen (IA) | Componentes, boilerplate, tests unitarios, fixtures, documentación, refactors mecánicos, pre-revisiones |

## Asignación actual

| ID | Herramienta | Modelo | Familia | Plan / cuota | Notas |
|---|---|---|---|---|---|
| `LIDER` | Claude (app de escritorio, Cowork) | Claude Opus (el más reciente disponible) | Claude | Team | Cuota más valiosa: planear y revisar |
| `SENIOR-1` | Claude (app o Claude Code) | Claude Opus | Claude | Pro | Mismo modelo, límites más bajos: solo tareas S/M |
| `SENIOR-2` | Antigravity | Gemini 3.1 Pro (High) | Gemini | Propia | Seleccionar el modelo antes de activar |
| `RAPIDO` | Antigravity | Gemini 3.8 Flash (Medium) | Gemini | Propia | Misma instalación que SENIOR-2, con otro modelo |
| `SENIOR-3` | Subagente del LIDER en Claude Code local (por defecto) o una sesión aparte de Claude Code | Claude Opus | Claude | Team (compartida con el LIDER) | Skill `charter-desarrollador` en `~/.claude/skills/`. Comparte cuota con el LIDER |

## Capacidad del PO

`capacidad_po_horas_dia: 2` — horas por día hábil que el PO dedica a CHARTER. El cotizador descuenta lo comprometido en proyectos y cotizaciones aprobadas para calcular la duración.

## Reglas del roster

- **Familia de modelo:** quien prueba o critica el trabajo de otro debería ser de otra familia (`ANCLAJE.md` §4).
- **Lo que se controla es el modelo, no la herramienta.** Un rol de Claude puede correr en Claude Code local, de escritorio o web, siempre con el modelo de su fila; cada instancia confirma su modelo antes de trabajar y lo pone en `herramienta_modelo`. Una misma sesión ocupa un solo rol a la vez.
- Un rol puede quedar vacío. Sus tareas pasan al siguiente rol de la cadena de respaldo.
- **Cadena de respaldo:** `RAPIDO → SENIOR-2 → SENIOR-1 → LIDER`.
- Si una instancia se queda sin cuota, el PO avisa al LIDER con `CHARTER: <proyecto> sin cuota <ID>`. El LIDER reasigna sus tareas pendientes según la cadena.
- Si se agrega una instancia nueva (otro IDE, otro modelo u **otra sesión de la misma herramienta**), se añade una fila con un ID nuevo (ej. `SENIOR-3`, `RAPIDO-2`) y se le instala la skill del desarrollador. Un ID por sesión activa.

_Última actualización: 2026-09-24_
