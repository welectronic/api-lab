# Plan

## Objetivo de esta iteración
Prueba mínima del flujo CHARTER con `GET /api/health` + su test + su documentación.

## Oleadas
- **Oleada 1:** T-001 (endpoint + test, SENIOR-1, pre-revisa RAPIDO) y T-002 (README, SENIOR-2), en paralelo desde `main`.

### Análisis de consistencia (oleada 1)
- **Archivos:** T-001 = `routes/healthRoutes.js`, `app.js`, `tests/health.test.js`, `package.json`; T-002 = `README.md`. Sin solapamiento → sin conflictos de merge.
- **Contrato:** ambas citan C-001 de `ARQUITECTURA.md`; T-002 documenta exactamente `{"status":"ok"}`.
- **Trazabilidad:** RF-001, RF-002 → T-001; RF-003 → T-002.
- **Dependencias:** ninguna entre ellas. Orden de merge sugerido: T-001, luego T-002.
- **Seguridad:** ambas `normal` (sin entrada de usuario, sin datos, sin auth).

## Riesgos
- Claude Code web puede nombrar la rama `claude/…` en vez de `chr/T-001-health`: la revisión lo detecta.
- `npm audit` falla en la base (D-3): no confundirlo con una falla de la tarea.

- **Oleada 2 (E2, comprometida 2026-10-01):** US3 y US4. El PO dictará las tareas con `tareas: 3`.

## Backlog (recortado o diferido)
| Ítem | Épica | Tipo de valor | Motivo | Origen |
|---|---|---|---|---|
| Actualizar dependencias vulnerables (`mongoose`, `sequelize`, `sqlite3` → 6.x mayor; transitivas `tar`, `path-to-regexp`, `lodash`…) | E3 | robustez | 1 critical + 14 high en `npm audit` | LIDER, 2026-09-24 |
| T-000: gitleaks, Semgrep, ESLint/Prettier y CI | E3 | robustez | Omitido en la prueba (D-4) | LIDER |
| Los endpoints existentes devuelven `err.message` al cliente (expone detalles internos) | E3 | robustez | `seguridad.md` §3 HTTP | LIDER, 2026-09-24 |
| Logs de peticiones (método, ruta, status, duración; sin datos personales ni cuerpos) | E3 | robustez | Observabilidad | LIDER, 2026-09-24 |
| `database.sqlite` está versionado en `main`: confirmar que no tiene datos reales y sacarlo del repo (`.gitignore`) | E3 | robustez | Repo público (D-1) | LIDER, 2026-09-24 |
| Revisar `Content-Security-Policy` y `Strict-Transport-Security` para el despliegue | E3 | robustez | Fuera de alcance de US3 | LIDER, 2026-09-24 |
