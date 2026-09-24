# Tablero

_Actualizado: 2026-09-24 por LIDER_

| Tarea | Título | Asignado | Pre-revisor | Oleada | Tipo valor | Estado | Ronda | Rama |
|---|---|---|---|---|---|---|---|---|
| T-001 | GET /api/health + test | SENIOR-1 | RAPIDO | 1 | desbloqueante | integrada | 1 | `chr/T-001-health` |
| T-002 | Documentar /api/health en README | SENIOR-2 | ninguno | 1 | pulido | integrada | 1 | `chr/T-002-readme-health` |

## Observaciones del proceso
| Fecha | Observación | Origen |
|---|---|---|
| 2026-09-24 | La prueba de humo pasó por el bypass de admin; se siguió con la excepción D-5 | Fase 0 |
| 2026-09-24 | RAPIDO no pre-revisó T-001 (se pidió la revisión antes) | T-001 |
| 2026-09-24 | T-002 se hizo con Gemini Flash en lugar de Gemini 3.1 Pro (High) | T-002 |
| 2026-09-24 | El reporte de T-002 llegó con escapes de PowerShell y BOM | T-002 |
| 2026-09-24 | Antigravity cambió de rama el clon del PO | T-002 |
| 2026-09-24 | E2 comprometida para 2026-10-01 sin historias; resuelto el mismo día (US3, US4) | SPEC |

## Propuestas al kit (pendientes del PO)
| Fecha | Propuesta | Propuesta por | Estado |
|---|---|---|---|

## Para el PO ahora
- **Activar:** nadie
- **Merge pendiente:** ninguno
- **Decisiones pendientes:** JSON malformado en US3 o en E3 (`SPEC.md` → Casos borde); modelo usado en T-002
- **Riesgo aceptado:** D-5 — GitHub no bloquea push directo a `main` con la cuenta del PO
