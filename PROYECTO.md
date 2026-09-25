# api-lab

| Campo | Valor |
|---|---|
| Tipo | repo existente |
| Repo | `welectronic/api-lab` (cada instancia usa su clon local ya existente; no se clona de nuevo) |
| Rama base | `main` |
| Coordinación | rama `charter` (worktree en `../api-lab.charter`) |
| Versión del kit | ver `kit/VERSION` |
| Stack | Node.js 24 + Express 5 (CommonJS), Mongoose (MongoDB), Sequelize (SQLite) |
| Contexto | Laboratorio. Esta iteración es una **prueba mínima del flujo CHARTER**, no del código |
| Estado | prueba 2 cerrada — oleada 2 (E2) integrada (main @ `b291042`) |
| Roster | general (`kit/ROSTER.md`) |

## Preparación del repo
- Confirmada por el PO: 2026-09-24
- Prueba de humo (push a la base rechazado): **FALLA** — el PO la informó como OK, pero el commit vacío `cce6718 "prueba de humo"` **entró a `main`** por push directo (actividad de GitHub: `push` de `welectronic`, 2026-09-24T07:24:09Z). Causa probable: Claude Code web empuja con la identidad del PO, que está en la *bypass list* del ruleset. El commit es vacío (sin cambios de archivos); se deja, no se reescribe la historia.
- **Excepción D-5 (PO, 2026-09-24):** se continúa sin corregir el bypass. Todas las instancias usan la cuenta admin del PO, así que GitHub NO impide un push directo a `main`: el único control es el protocolo. El LIDER verifica en cada revisión que `origin/main` no cambie fuera de los merges del PO (referencia: `cce6718`).
- Verificado por el LIDER vía API de GitHub (2026-09-24): `main` `protected: true`, reglas `deletion`, `non_fast_forward`, `pull_request`; `charter` con `deletion` y `non_fast_forward`. Ramas sobrantes borradas del remoto.
- Guardas locales (GUARDAS.md), 2026-09-25, LIDER: hook pre-push de CHARTER en `repos/api-lab/.git/hooks/pre-push` (vale también para los worktrees `api-lab.charter` y `api-lab.T-XXX`); base `main` por defecto. Probado con --dry-run desde un worktree temporal: push a `main` BLOQUEADO, push forzado a `charter` BLOQUEADO, borrar `charter` BLOQUEADO, push a `chr/…` permitido. Permisos de configs/guardas/claude-settings.json agregados a ~/.claude/settings.json (respaldo settings.json.bak-charter-20260925). Antigravity: 11 comandos en *Deny List Terminal Commands*, confirmado por el PO con captura (2026-09-25); ojo: en Antigravity esa lista **pide permiso** antes de ejecutar, no bloquea sola: el PO no debe aprobar esos comandos. No cubre Claude Code web (clon en la nube).
- **Capa 0, CI (GUARDAS.md), 2026-09-25, LIDER:** `.github/workflows/charter-ci.yml` en `main` desde `d53b0e9` (T-006, C-006). `proteger-main` exige `Guardia de ramas`, `Secretos (gitleaks)`, `Análisis estático (Semgrep)` y `Pruebas`, con la fuente GitHub Actions (`integration_id` 15368) [HECHO: API `rules/branches/main`]. Límite L-1 en ARQUITECTURA.
- Token del LIDER vence: no aplica — el LIDER usa la credencial de Git del PO en su PC (D-2).
- Repo **público a propósito** (laboratorio). Esta rama es legible por cualquiera: nada interno ni sensible aquí (D-1).

## Cómo correrlo
```
npm ci
npm test                 # no requiere MongoDB ni SQLite (desde T-001)
npm start                # requiere .env con MONGO_URI (ver README)
```

## Estándares heredados
- `kit/estandares/seguridad.md`. El kit no tiene estándar Node/Express: mandan las convenciones del repo (`CONVENCIONES.md`).

## Comandos de verificación (obligatorios antes de entregar)
```
# Instalación limpia
npm ci
# Tests
npm test
# Alcance: solo archivos permitidos por la tarea
git diff --stat origin/main...HEAD
# Seguridad
npm audit --audit-level=high     # INFORMATIVO en la oleada 1: la base ya tiene hallazgos (D-3).
                                 # Pegar el resumen; la tarea falla solo si el conteo cambia respecto a la base.
```
Secretos: los cubre el *push protection* de GitHub (activo), y además gitleaks v8.28.0 y Semgrep 1.178.0 en el CI de cada PR (C-006, desde T-006). Para correrlos en local, usa un clon completo, no un worktree (Tropiezo #5).

Línea base de `npm audit` en `main` @ `9b5b5aa` (2026-09-24, LIDER): **22 vulnerabilidades (2 low, 5 moderate, 14 high, 1 critical)**.

## Restricciones
- Sin dependencias nuevas en la oleada 1.
- No tocar la conexión a BD (`config/`, `server.js`) ni los endpoints existentes.
