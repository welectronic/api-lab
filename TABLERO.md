# Tablero

_Actualizado: 2026-09-25 por LIDER_

| Tarea | Título | Asignado | Pre-revisor | Oleada | Tipo valor | Estado | Ronda | Rama |
|---|---|---|---|---|---|---|---|---|
| T-001 | GET /api/health + test | SENIOR-1 | RAPIDO | 1 | desbloqueante | integrada | 1 | `chr/T-001-health` |
| T-002 | Documentar /api/health en README | SENIOR-2 | ninguno | 1 | pulido | integrada | 1 | `chr/T-002-readme-health` |
| T-003 | Endurecer HTTP (headers, límite, 400/413/404) | SENIOR-3 | RAPIDO | 2 | robustez | integrada | 2 | `chr/T-003-http-hardening` |
| T-004 | GET /api/health/uptime + test | SENIOR-1 | SENIOR-3 | 2 | nucleo | integrada | 1 | `chr/T-004-uptime` |
| T-005 | README (US3, US4) + `.env.example` | SENIOR-2 | RAPIDO | 2 | pulido | integrada (cierre LIDER) | 2 | `chr/T-005-docs-env` |
| T-006 | CI de CHARTER (C-006) + casos de abuso | SENIOR-3 (subagente) | probador SENIOR-2 | 3 | robustez | aprobada (PR #7) | 1 | `chr/T-006-ci` |

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
| 2026-09-25 | Consejo C-001: 3 de 4 lentes marcaron bloqueante; todos se levantaron con cambios de contrato. El CI del kit tiene 4 huecos: `.md` de la raíz de `charter`, archivos y comentarios de supresión, `workflow_dispatch` sin base y 0 tests en verde | C-001 |
| 2026-09-25 | Desvío previsto del objetivo (c): el panel "Activar ahora" no conoce la **entrega 2** del probador (las ramas de abuso sobre el SHA del autor). Cuando exista `reportes/T-006-r1.md` mostrará "Revisar" en vez de SENIOR-2. Vale la línea *Siguiente:* del LIDER | T-006 |
| 2026-09-25 | El tablero lee la **primera** fecha de `kit/VERSION` (2026-09-24), no la última, y avisa que el kit está desactualizado aunque se sincronizó hoy | Calidad de datos |

## Propuestas al kit (pendientes del PO)
| Fecha | Propuesta | Propuesta por | Estado |
|---|---|---|---|
| 2026-09-24 | `git worktree add --no-track -b <rama> ../<repo>.T-XXX origin/<base>` + `git push -u origin <rama>`: sin `--no-track` la rama queda siguiendo `origin/main` y un `git push` sin argumentos apunta a `main` (con D-5 GitHub no lo impide) | SENIOR-1 (T-004) | aplicada (CHANGELOG 2026-09-25) |
| 2026-09-24 | Activación con rol y tarea: `CHARTER: <proyecto> <ROL> T-XXX`, para que la instancia no deduzca el rol | SENIOR-1 (T-004) | aplicada (CHANGELOG 2026-09-25) |
| 2026-09-24 | ROSTER: SENIOR-3 = "Claude Code (local o web)", o una fila aparte para web | SENIOR-3 (T-003) | aplicada (CHANGELOG 2026-09-25) |
| 2026-09-25 | `configs/ci/charter-ci.yml`: aplicar el endurecimiento de C-006 (D-8) con el mismo texto: guardia en script, raíz de `charter` y archivos de supresión, sin `workflow_dispatch` (o fallar sin `BASE_SHA`), `persist-credentials: false`, `--ignore-gitleaks-allow`, `--disable-nosem`, mínimo 1 test, y fallar si no se detecta ningún stack. Documentar L-1 en GUARDAS | Consejo C-001 | pendiente |
| 2026-09-25 | Tablero: modelar una segunda entrega del probador (`reportes/T-XXX-pruebas.md` con "Entrega 2" pendiente) en "Activar ahora"; leer la **última** fecha de `kit/VERSION` | LIDER (prueba 3) | pendiente |
| 2026-09-25 | `configs/ci/charter-ci.yml`: `continue-on-error` en el **paso** de `npm audit` (o `::warning::`), no en el job. Hoy el check informativo queda en `failure` y el PR limpio muestra una ❌ | LIDER (T-006-r1, hallazgo 1) | pendiente |
| 2026-09-25 | Guías: advertir que gitleaks y Semgrep en Docker no leen un worktree de Windows (falso verde); usar `-no-color` en actionlint; `${RANGE:+"$RANGE"}` en el job de gitleaks (SC2086) | SENIOR-3 (T-006) | pendiente |
| 2026-09-25 | `configs/ci/charter-ci.yml`: fijar las imágenes por versión exacta (hoy `gitleaks:latest` y `semgrep/semgrep` sin etiqueta) y las acciones por SHA con la etiqueta en un comentario, para evitar un cambio silencioso en la cadena de suministro. Aplicado en api-lab con T-006 | PO (prueba 3) | pendiente |

## Para el PO ahora
- **Activar:** nadie
- **Merge pendiente:** PR #7 (`chr/T-006-ci`), después de marcar los 4 checks obligatorios; cerrar #8–#15 y borrar sus ramas
- **Decisiones pendientes:** propuestas al kit del 2026-09-25 (5)
- **Riesgo aceptado:** D-5 — GitHub no bloquea push directo a `main` con la cuenta del PO
