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

| ID | Herramienta | Modelo | Plan / cuota | Notas |
|---|---|---|---|---|
| `LIDER` | Claude (app de escritorio, Cowork) | Claude Opus (el más reciente disponible) | Team | Cuota más valiosa: planear y revisar |
| `SENIOR-1` | Claude (app o Claude Code) | Claude Opus | Pro | Mismo modelo, límites más bajos: solo tareas S/M |
| `SENIOR-2` | Antigravity | Gemini 3.1 Pro (High) | Propia | Seleccionar el modelo antes de activar |
| `RAPIDO` | Antigravity | Gemini 3.8 Flash (Medium) | Propia | Misma instalación que SENIOR-2, con otro modelo |

## Reglas del roster

- Un rol puede quedar vacío. Sus tareas pasan al siguiente rol de la cadena de respaldo.
- **Cadena de respaldo:** `RAPIDO → SENIOR-2 → SENIOR-1 → LIDER`.
- Si una instancia se queda sin cuota, el PO avisa al LIDER con `CHARTER: <proyecto> sin cuota <ID>`. El LIDER reasigna sus tareas pendientes según la cadena.
- Si se agrega una instancia nueva (otro IDE, otro modelo), se añade una fila con un ID nuevo (ej. `SENIOR-3`) y se le entrega `agentes/desarrollador.md`.

_Última actualización: 2026-09-24_
