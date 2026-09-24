# Tablero

_Actualizado: 2026-09-24 por LIDER_

| Tarea | Título | Asignado | Pre-revisor | Oleada | Tipo valor | Estado | Ronda | Rama |
|---|---|---|---|---|---|---|---|---|
| T-001 | GET /api/health + test | SENIOR-1 | RAPIDO | 1 | desbloqueante | integrada | 1 | `chr/T-001-health` |
| T-002 | Documentar /api/health en README | SENIOR-2 | ninguno | 1 | pulido | integrada | 1 | `chr/T-002-readme-health` |
| T-003 | Endurecer HTTP (headers, límite, 400/413/404) | SENIOR-3 | RAPIDO | 2 | robustez | integrada | 2 | `chr/T-003-http-hardening` |
| T-004 | GET /api/health/uptime + test | SENIOR-1 | SENIOR-3 | 2 | nucleo | integrada | 1 | `chr/T-004-uptime` |
| T-005 | README (US3, US4) + `.env.example` | SENIOR-2 | RAPIDO | 2 | pulido | integrada (cierre LIDER) | 2 | `chr/T-005-docs-env` |

## Observaciones del proceso
| Fecha | Observación | Origen |
|---|---|---|
| 2026-09-24 | La prueba de humo pasó por el bypass de admin; se siguió con la excepción D-5 | Fase 0 |
| 2026-09-24 | RAPIDO no pre-revisó T-001 (se pidió la revisión antes) | T-001 |
| 2026-09-24 | T-002: modelo **no confirmado (prueba 1; no coincidía con el ROSTER)**. No bloquea nada (PO) | T-002 |
| 2026-09-24 | El reporte de T-002 llegó con escapes de PowerShell y BOM | T-002 |
| 2026-09-24 | Antigravity cambió de rama el clon del PO | T-002 |
| 2026-09-24 | E2 comprometida para 2026-10-01 sin historias; resuelto el mismo día (US3, US4) | SPEC |
| 2026-09-24 | GitHub (Dependabot) reporta 38 vulnerabilidades en `main`; `npm audit` da 22 (D-3). Son conteos distintos, no un cambio. Referencia para E3 | LIDER |
| 2026-09-24 | Ninguna pre-revisión de la oleada 2 se hizo antes de `revisar` (RAPIDO y SENIOR-3 no se activaron) | oleada 2 |
| 2026-09-24 | T-003 corrió en Claude Code web, no local; hora del reporte en UTC | T-003 |
| 2026-09-24 | C-003 (LIDER) solo cubría 2 tipos de error de body: los demás filtran el stack. Hallazgo 1 de T-003-r1 | T-003 |
| 2026-09-24 | SENIOR-2 hizo la ronda 2 de T-005 con la tarjeta `bloqueada`, 30 s antes de que el LIDER publicara D-7; faltó el 415. El LIDER terminó T-005 (ronda 3 no permitida). Tropiezo #4 | T-005 |
| 2026-09-24 | Tampoco hubo pre-revisiones en la ronda 2: RAPIDO no se activó en toda la oleada | oleada 2 |

## Propuestas al kit (pendientes del PO)
| Fecha | Propuesta | Propuesta por | Estado |
|---|---|---|---|
| 2026-09-24 | `git worktree add --no-track -b <rama> ../<repo>.T-XXX origin/<base>` + `git push -u origin <rama>`: sin `--no-track` la rama queda siguiendo `origin/main` y un `git push` sin argumentos apunta a `main` (con D-5 GitHub no lo impide) | SENIOR-1 (T-004) | aplicada (CHANGELOG 2026-09-25) |
| 2026-09-24 | Activación con rol y tarea: `CHARTER: <proyecto> <ROL> T-XXX`, para que la instancia no deduzca el rol | SENIOR-1 (T-004) | aplicada (CHANGELOG 2026-09-25) |
| 2026-09-24 | ROSTER: SENIOR-3 = "Claude Code (local o web)", o una fila aparte para web | SENIOR-3 (T-003) | aplicada (CHANGELOG 2026-09-25) |

## Para el PO ahora
- **Activar:** nadie
- **Merge pendiente:** ninguno
- **Decisiones pendientes:** `entregué E2` cuando la des por entregada; siguiente paso: E3 o cerrar la prueba
- **Riesgo aceptado:** D-5 — GitHub no bloquea push directo a `main` con la cuenta del PO
