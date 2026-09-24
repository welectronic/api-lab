# Tropiezos

Errores que alguna instancia ya cometió en este proyecto. Una línea por regla. Todas las instancias leen esto antes de trabajar.

| # | Regla | Origen (tarea) |
|---|---|---|
| 1 | En Windows/PowerShell, escribe el reporte con la herramienta de edición de archivos, no con `Set-Content`/`echo` y un string entre comillas dobles: las comillas invertidas de Markdown se interpretan como escapes y la evidencia llega dañada. Guarda en UTF-8 sin BOM | T-002 |
| 2 | Antes de trabajar, confirma que el modelo seleccionado es el del rol en `kit/ROSTER.md` y ponlo tal cual en `herramienta_modelo` | T-002 |
| 3 | Trabaja en tu propio worktree `../api-lab.T-XXX` (`git worktree add ../api-lab.T-XXX -b chr/T-XXX-<slug> origin/main`). Nunca cambies de rama el clon del PO | T-002 |
