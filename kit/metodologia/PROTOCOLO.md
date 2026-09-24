# Protocolo CHARTER — reglas obligatorias

Todas las instancias de IA (LIDER y desarrolladores) cumplen estas reglas en todos los proyectos. Los roles están en `ROSTER.md`.

## 1. Dónde vive cada cosa

- **Código** → ramas normales del repo del proyecto (base + `chr/T-XXX-<slug>`).
- **Coordinación del proyecto** (spec, plan, tareas, reportes, revisiones y copia del kit) → **rama huérfana `charter`** del mismo repo, abierta como worktree en `../<repo>.charter`. Ver [RAMA-CHARTER.md](RAMA-CHARTER.md).
- **Kit maestro y conocimiento entre proyectos** → CHARTER-DEV (solo el LIDER lo necesita).
- Nunca se hace merge entre `charter` y las ramas de código. Nunca hay archivos de coordinación en las ramas de código. Los clones van fuera de carpetas sincronizadas.

## 2. Un archivo, un escritor

Varias instancias escriben en la rama `charter`. Para que `pull --rebase` nunca tenga conflictos, cada archivo tiene un único dueño:

| Archivo | Lo escribe |
|---|---|
| `PROYECTO`, `PRINCIPIOS`, `SPEC`, `PLAN`, `ARQUITECTURA`, `CONVENCIONES`, `DECISIONES`, `TABLERO`, `BITACORA`, `TROPIEZOS` | LIDER (con aprobación del PO donde se indica) |
| `tareas/T-XXX.md` | LIDER |
| `reportes/T-XXX-rN.md` | El desarrollador asignado |
| `revisiones/T-XXX-rN-pre.md` | El pre-revisor asignado |
| `revisiones/T-XXX-rN.md` | LIDER |
| `DIAGNOSTICO.md` | Quien tenga asignada la tarea de diagnóstico |
| `kit/` (copia del kit) | LIDER |
| `soluciones/*.md` (en CHARTER-DEV) | LIDER |

Si necesitas cambiar algo que no es tuyo, escríbelo como propuesta en tu reporte.

## 3. Contexto mínimo

- Lee **solo** lo que cita tu tarea. No explores el repo completo si la tarea no lo exige.
- El código es la fuente de verdad sobre *cómo* funciona el sistema. Los documentos guardan lo que el código no dice: **intención, porqué, lo descartado a propósito, contratos futuros**.
- No escribas en ningún documento lo que se deduce leyendo el repo (estructura de carpetas, lista de dependencias, resumen del código). Se desactualiza y cuesta tokens en cada lectura.

## 3b. Estándares y seguridad

- Sigue el estándar del stack (`estandares/<stack>.md`) y **siempre** `estandares/seguridad.md`. Si hay conflicto, manda el orden de `estandares/README.md`.
- Copia el **patrón de referencia** que cita la tarea en vez de inventar una estructura nueva.
- Código funcional pero inseguro **no está terminado**. Nunca desactives un control de seguridad (CSRF, CORS, verificación TLS, validación) para que algo funcione o un test pase.
- Antes de proponer una dependencia, verifica que exista en el registro oficial con ese nombre exacto y que esté mantenida.
- Nunca pongas secretos ni datos reales en el código, los fixtures, los prompts ni los archivos de CHARTER-DEV.

## 4. Antes de empezar una sesión

1. Actualiza la coordinación: `git -C ../<repo>.charter pull --rebase`. Lee `kit/ROSTER.md`, `PROYECTO.md`, `PRINCIPIOS.md` y `TABLERO.md`.
2. Lee `TROPIEZOS.md`: son errores que otras instancias ya cometieron. No los repitas.
3. Busca tus tareas: `asignado: <TU-ID>` con estado `en_progreso` o `cambios_solicitados` (las `pendiente` aún no están liberadas), y tus pre-revisiones: `prerevisor: <TU-ID>` con el último reporte en `listo_para_revision` y sin pre-revisión de esa ronda.
4. Si hay cambios solicitados, lee primero la última revisión.

## 5. Mientras desarrollas

- Trabaja solo en la rama de la tarea (`chr/T-XXX-<slug>`).
- Toca solo los archivos permitidos. Si necesitas otro, detente y repórtalo como bloqueo.
- Respeta los contratos al pie de la letra. Si un contrato está mal, no lo cambies: repórtalo.
- Commits pequeños: `T-XXX: <descripción>`.
- Nada de secretos en el repo. No agregues dependencias sin autorización en la tarea.
- Si la tarea está marcada `irreversible: si`, confirma que existe el punto de restauración indicado antes de ejecutar la acción irreversible.

## 6. Antes de entregar

Aplica [VERIFICACION.md](VERIFICACION.md): **ninguna afirmación sin evidencia fresca**. Corre los comandos de verificación de `PROYECTO.md` después de tu último cambio y pega la salida real en el reporte. No entregues con fallas; si fallan por causas ajenas, repórtalo con la salida exacta.

## 7. Cómo entregar

1. `git push` de tu rama. **Nunca** merge, PR, push a la rama base ni `push --force` en ramas compartidas.
2. Crea `reportes/T-XXX-rN.md` en la rama `charter` con `kit/plantillas/REPORTE.md` (N = ronda) y pon `estado: listo_para_revision` o `estado: bloqueada`.
3. Commit `CHR: <ID> reporte T-XXX rN`, `git pull --rebase` y `git push origin charter`. Si el push falla, repite el pull y el push. Nunca `--force`.
4. Responde al PO en máximo 3 líneas: tarea, estado y commit.

## 8. Ambigüedad

Si algo es ambiguo, contradictorio o requiere una decisión: **no supongas**. Márcalo como `[POR ACLARAR: …]` en tu reporte, entrega con `estado: bloqueada`, propone opciones y avanza en lo que no dependa de la duda.

## 9. Lo que ninguna IA hace

- Merge, PR, push a la rama base, borrar ramas ajenas o reescribir la historia compartida.
- Cambiar alcance, spec, principios, arquitectura o contratos sin aprobación.
- Editar archivos de otro dueño.
- Hacer merge entre `charter` y cualquier rama de código, o escribir secretos en `charter`.
