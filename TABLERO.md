# Tablero

_Actualizado: 2026-09-24 por LIDER (oleada 2 liberada)_

| Tarea | Título | Asignado | Pre-revisor | Oleada | Tipo valor | Estado | Ronda | Rama |
|---|---|---|---|---|---|---|---|---|
| T-001 | GET /api/health + test | SENIOR-1 | RAPIDO | 1 | desbloqueante | integrada | 1 | `chr/T-001-health` |
| T-002 | Documentar /api/health en README | SENIOR-2 | ninguno | 1 | pulido | integrada | 1 | `chr/T-002-readme-health` |
| T-003 | Endurecer HTTP (headers, límite, 400/413/404) | SENIOR-3 | RAPIDO | 2 | robustez | en_progreso | 1 | `chr/T-003-http-hardening` |
| T-004 | GET /api/health/uptime + test | SENIOR-1 | SENIOR-3 | 2 | nucleo | en_progreso | 1 | `chr/T-004-uptime` |
| T-005 | README (US3, US4) + `.env.example` | SENIOR-2 | RAPIDO | 2 | pulido | en_progreso | 1 | `chr/T-005-docs-env` |

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

## Propuestas al kit (pendientes del PO)
| Fecha | Propuesta | Propuesta por | Estado |
|---|---|---|---|

## Para el PO ahora
- **Activar:** SENIOR-3 (`CHARTER: api-lab T-003`), SENIOR-1 (`CHARTER: api-lab T-004`), SENIOR-2 (`CHARTER: api-lab T-005`). Pre-revisiones cuando haya reporte: RAPIDO (T-003, T-005), SENIOR-3 (T-004)
- **Merge pendiente:** ninguno
- **Decisiones pendientes:** ninguna
- **Riesgo aceptado:** D-5 — GitHub no bloquea push directo a `main` con la cuenta del PO
