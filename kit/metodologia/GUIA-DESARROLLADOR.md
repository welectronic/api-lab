# Guía del desarrollador (lectura única)

Es lo único de la metodología que lees en cada activación, junto con tu tarjeta de rol (`kit/roles/`) y tu tarea. El resto del kit es del LIDER; lo lees solo si tu tarea lo cita. En la rama `charter`, las rutas del kit están dentro de `kit/`.

## 1. Dónde está todo
- **Código:** tu clon del repo (nunca lo clones de nuevo) y ramas `chr/T-XXX-<slug>`. Cada tarea en su propio worktree `../<repo>.T-XXX`; nunca cambies de rama en el clon principal. En un entorno web con sandbox propio, la sesión es tu carpeta aislada.
- **Coordinación:** rama huérfana `charter`, worktree `../<repo>.charter`. Nunca se hace merge entre `charter` y el código.
- **Tus archivos en `charter`** (solo estos): `reportes/T-XXX-rN.md`, `reportes/T-XXX-pruebas.md`, `reportes/T-XXX-depuracion.md`, `revisiones/T-XXX-rN-pre.md` y, si eres asiento externo, `consejos/C-00N-<ROL>.md`. Si otro archivo está mal, lo propones en tu reporte.

## 2. Antes de trabajar
1. `git -C ../<repo>.charter pull --rebase`. Lee `PROYECTO.md`, `TROPIEZOS.md` y tu tarea. Lee `PRINCIPIOS.md`, `CONVENCIONES.md` y el estándar del stack solo en las secciones que la tarea cita; `estandares/seguridad.md`, si la tarea es `sensible`.
2. Relee tu tarjeta antes de cada ronda: si está `pendiente` o `bloqueada`, no trabajes. Si hay cambios solicitados, lee primero la última revisión. Si la tarea tiene `probador` y no existe `reportes/T-XXX-pruebas.md`, no empieces.
3. Confirma que tu modelo es el de tu rol en `kit/ROSTER.md`. Anota `inicio` con la hora del sistema y su zona (`date "+%Y-%m-%d %H:%M %z"`; en PowerShell `Get-Date -Format "yyyy-MM-dd HH:mm zzz"`).
4. Escribe **Entendimiento** en el reporte: qué lograrás, qué archivos tocarás y qué queda fuera. Si no coincide con la tarjeta, entrega `bloqueada`.

## 3. Mientras trabajas
- Worktree: `git worktree add --no-track -b <rama> ../<repo>.T-XXX origin/<rama_origen>` (si la rama existe: `git worktree add ../<repo>.T-XXX <rama>`). Primer push: `git push -u origin <rama>`.
- Solo los archivos permitidos. Contratos al pie de la letra: si uno está mal, repórtalo, no lo cambies. Sin dependencias nuevas sin autorización; si propones una, verifica que exista con ese nombre exacto en el registro oficial.
- Copia el patrón de referencia que cita la tarea. Código funcional pero inseguro no está terminado; nunca desactives un control de seguridad.
- **Etiqueta la evidencia** de lo que afirmas sobre librerías o código existente: `[HECHO: archivo:línea / comando / doc con versión]`, `[INFERENCIA]`, `[SUPUESTO]`, `[DESCONOCIDO]`. La memoria del modelo no es fuente.
- `correctivo`: primero el test que reproduce el bug, con su salida fallando; después el arreglo.
- `irreversible: si`: confirma el punto de restauración antes de actuar.
- **Presupuesto:** si vas a superar el de la tarjeta, detente, empuja lo que tengas y entrega `bloqueada` con lo que falta.
- Ambigüedad: no supongas. `[POR ACLARAR: …]`, `bloqueada`, opciones, y avanza en lo que no dependa de la duda.
- Commits pequeños: `T-XXX: <descripción>`. Nada de secretos ni datos reales en código, fixtures, prompts o `charter`.

## 4. Verificar (ninguna afirmación sin evidencia fresca)
Antes de afirmar algo, córrelo **después de tu último cambio** y pega la salida real (código de salida y totales):

| Afirmas | Necesitas |
|---|---|
| Los tests pasan | La suite completa, no solo los tests nuevos |
| Error corregido | El test falla sin el arreglo y pasa con él |
| Funcionalidad lista | Probarla por su entrada real (endpoint, pantalla) |
| Documentación correcta | Ejecutar cada comando documentado y buscar cada nombre en el código |

"Debería funcionar" o "no hubo errores" sin salida no es evidencia. Si no puedes verificar algo, dilo.

## 5. Entregar
1. `git push` de tu rama. **Nunca** merge, PR, push a la rama base, `--force` en ramas compartidas ni `--no-verify`. Si una guarda de CHARTER bloquea tu push, intentaste algo prohibido: repórtalo.
2. Escribe el reporte con `kit/plantillas/REPORTE.md` usando **tu herramienta de edición de archivos** (no `echo`, heredoc ni PowerShell, que dañan el Markdown), en UTF-8 sin BOM. `herramienta_modelo` real, `inicio`, `fin`, `sesiones` y `estado: listo_para_revision` o `bloqueada`.
3. `CHR: <ROL> reporte T-XXX rN`, `git pull --rebase`, `git push origin charter`. Si falla, repite pull y push; nunca `--force`.
4. Respuesta al PO: máximo 3 líneas (tarea, estado, commit) y **Siguiente:** con el comando exacto para quien sigue.

## 6. Relevo: quién sigue
| Terminaste | Siguiente |
|---|---|
| Pruebas (probador) o reproducción (depurador) | El autor: `CHARTER: <proyecto> <AUTOR> T-XXX` |
| Tu tarea, y tiene pre-revisor | `CHARTER: <proyecto> <PRE-REVISOR> T-XXX` |
| Tu tarea sin pre-revisor, o una pre-revisión | Al LIDER: `CHARTER: <proyecto> revisar` |
| Una ronda de asiento externo | Al LIDER: `CHARTER: <proyecto> revisar` |

## 7. Nunca
Modificar skills, instrucciones ni `kit/` (propón en *Propuestas al kit*); editar archivos de otro dueño; cambiar alcance, spec o contratos; "mejorar" código fuera del alcance.
