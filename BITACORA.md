# Bitácora

Registro breve para retomar sin perder contexto. Lo más reciente va arriba.

## 2026-09-25 (7)
- **Pasó:**
  - SENIOR-2, entrega 2 (02:41): 8 ramas de abuso sobre `1460273`.
  - El PO abrió los PR #7–#15 en borrador y confirmó el rechazo de `charter` → `main` (S-001 verificado).
  - **T-006 APROBADA** (`revisiones/T-006-r1.md`): los 9 casos quedaron en el check correcto y el PR limpio pasó los 4 obligatorios. La causa de gitleaks y Semgrep se reprodujo en local con la misma imagen y el mismo digest.
- **Nuevo:** tropiezo #5 (Docker con worktrees de Windows) y 2 propuestas al kit (check informativo en rojo; guías de SENIOR-3).
- **Sigue:** el PO marca los 4 checks obligatorios en `proteger-main`, integra #7, cierra #8–#15, borra las ramas → `integré T-006 (<min>)` → retro de la prueba 3.

## 2026-09-25 (6)
- **Pasó:**
  - SENIOR-2, entrega 1: 02:14–02:19.
  - Despacho de SENIOR-3 como subagente: 02:20–02:26, en 1 sesión y dentro de su presupuesto de 30 min. `chr/T-006-ci` @ `1460273` con los criterios 1 a 9 en verde en local.
  - `reportes/T-006-r1.md` se guardó como lo devolvió el subagente. Solo se decodificaron las entidades `&gt;`, `&lt;` y `&amp;`, que añadió el transporte de la notificación.
- **Corregido en la tarjeta:** criterio 7, `-color=never` → `-no-color` (error del LIDER); SHA para la entrega 2; aviso de Docker con worktrees de Windows.

## 2026-09-25 (5) — Prueba 3
- **Arranca la prueba 3** con T-006 (CI de CHARTER, E3). Autor: SENIOR-3 como subagente del LIDER. Probador: SENIOR-2. Decisiones del PO: versiones fijas (gitleaks v8.28.0, Semgrep vigente, acciones por SHA) y ramas de abuso preparadas por el probador; el PO abre los PR en borrador y los cierra.
- **Objetivos de la prueba 3 (se miden en la retro):**
  - a) Despacho a subagente: SENIOR-3 trabaja sin que el PO abra otra sesión y su reporte llega sin editar.
  - b) Probador primero: el autor no empieza hasta que exista `reportes/T-006-pruebas.md`.
  - c) Relevo: cada respuesta termina con "Siguiente:" y coincide con el panel "Activar ahora" del tablero.
  - d) Presupuesto declarado y respetado.
  - e) CI: los 4 casos de abuso fallan en el check correcto y el PR limpio pasa.
  - f) Calidad de datos del tablero en cero errores al cerrar.
  - g) Tiempo del PO registrado al integrar.
- **Consejo C-001 cerrado:**
  - Las 4 lentes corrieron como subagentes, con contrapunto anónimo y un contrafactual.
  - Hubo 3 bloqueantes y todos se levantaron con el contrato C-006. Decisión D-8; disenso de SIMPLICIDAD (llevarlo primero al kit) → propuesta al kit.
  - Los casos de abuso pasan de 4 a 9 (A1–A9) y los PR en borrador, de 3 a 8.
- **Liberada T-006** (oleada 3). US5 y RF-010 en SPEC; `DECISIONES.md` migrado al formato del kit (Consejo, Revertir si, Revisar el).
- **Verificado por el LIDER:** SHAs y digests de C-006; en Node 22, `node --test` con 0 tests sale con 0; `--disable-nosem` existe en Semgrep 1.178.0; `safe.directory` viene en la imagen de gitleaks.
- **Sigue:** SENIOR-2, entrega 1 → el LIDER despacha a SENIOR-3 → SENIOR-2, entrega 2 → el PO abre los PR en borrador → `revisar`.

## 2026-09-25 (4)
- **Pasó:** `kit/` sincronizado con el kit maestro por indicación del PO, a la entrada del CHANGELOG fechada 2026-09-26 (consolidación). Nuevos: `metodologia/GUIA-DESARROLLADOR.md` y `configs/ci/charter-ci.yml`. Actualizados: GUARDAS, PREPARACION-REPO, PROTOCOLO, ROLES, `roles/SENIOR.md`, `roles/RAPIDO.md`, `estandares/seguridad.md`. Sin comercial/, configs/guardas/ ni estándares de otros stacks.
- **Pendiente de la Fase 0 (nuevo ítem):** `.github/workflows/charter-ci.yml` no existe en `main` [HECHO: `ls .github/workflows` en el clon]; se instala en la próxima tarea de código y el PO marca sus checks como obligatorios en `proteger-main`.

## 2026-09-25 (3)
- **Pasó:** Fase 0 §4b completa: guardas en Antigravity (11 comandos). El PO actualizó las skills a mano en todas las instancias. Comprobado en este PC: skill de desarrollador igual al kit en `~/.claude/skills` y en las dos carpetas de Antigravity; `~/.claude/skills/charter-lider` todavía es la versión anterior.

## 2026-09-25 (2)
- **Pasó:** `kit/` sincronizado con el kit maestro por indicación del PO, incluida `kit/roles/` (tarjetas LIDER, SENIOR, RAPIDO, PROBADOR, DEPURADOR, PRE-REVISOR y 4 lentes). Nuevos: ANCLAJE.md, CONSEJO-DE-DISENO.md, GUARDAS.md, plantillas/CONSEJO.md. Se agregan `consejos/` y la sección *Supuestos y desconocidos* en ARQUITECTURA.md.
- **Aplica desde la próxima tarea:** etiquetas de evidencia, *Entendimiento* en el reporte, 2 objeciones en quien revisa, probador en M o `sensible`, `presupuesto` por tarea, línea *Siguiente:* en cada respuesta. E3 tiene tareas `sensible`: convocar el consejo de diseño antes de contratar.

## 2026-09-25
- **Pasó:** guardas instaladas en el clon del PO (hook pre-push y permisos de Claude Code) y probadas: 3 bloqueos y 1 permitido, como se esperaba. Falta la lista de Antigravity (PO).
- **Nota:** `kit/` de esta rama todavía no tiene GUARDAS.md ni los cambios del CHANGELOG del 2026-09-25 (anclaje, guardas, subagentes); se sincroniza cuando el PO lo pida.

## 2026-09-24 (14)
- **Pasó:** el PO registró su tiempo: 20 min (0.33 h) en cada tarea de T-001 a T-005, 1 h 40 min en total (E1: 40 min, E2: 60 min).

## 2026-09-24 (13)
- **Pasó:** el cliente aceptó E2: `Aceptada` = 2026-09-24. E2 cerrada: comprometida 2026-10-01, entregada y aceptada 2026-09-24.
- **Sigue:** E3 o cerrar la prueba.

## 2026-09-24 (12)
- **Pasó:** el PO dio E2 por entregada: `Entregada` = 2026-09-24, 7 días antes de lo comprometido (2026-10-01). `main` @ `b291042`. Desde hoy, los ajustes y bugs de E2 cuentan como retrabajo del cliente (garantía).
- **Sigue:** `el cliente aceptó E2`; E3 o cerrar la prueba.

## 2026-09-24 (11)
- **Pasó:** `kit/` sincronizado con el kit maestro por indicación del PO (`kit/VERSION` (d)). Las 3 propuestas al kit del tablero (`--no-track` + `push -u`, activación `<ROL> T-XXX`, ROSTER por modelo) quedan `aplicada` según el CHANGELOG.
- **Nota para próximas tareas:** la pre-revisión ahora es obligatoria en M o `sensible` y la activa el LIDER; activación `CHARTER: api-lab <ROL> T-XXX`.

## 2026-09-24 (10)
- **Estado:** oleada 2 integrada. T-003, T-004 y T-005 `integrada`. E2 completa en código; `Entregada` queda vacía hasta que el PO diga `entregué E2`. CE-003 (E2 en `main` antes del 2026-10-01) cumplido.
- **Pasó:** el PO integró por PR #4 (T-003), #5 (T-004) y #6 (T-005), en orden. `main` = `b291042`; `266818b`, `0516bdc` y `d2054ca` son ancestros; sin archivos de coordinación en `main`.
- **Retro oleada 2:**
  1. Bien: contratos exactos (C-003 a C-005) permitieron 3 tareas en paralelo sin conflictos, y T-005 documentó sin esperar el código.
  2. Mal: C-003 no enumeró todos los errores de la librería (hallazgo alto que costó una ronda) y ninguna pre-revisión se hizo.
  3. Cambiar: el LIDER enumera todos los tipos de error al contratar manejadores; los desarrolladores hacen `pull` de `charter` antes de cada ronda (Tropiezo #4); el PO activa a RAPIDO apenas llega un reporte.
- **Sigue:** decisión del PO: `entregué E2`, E3 (backlog en `PLAN.md`) o cerrar la prueba.
- **Última verificación en verde:** `origin/main` @ `b291042` (worktree aislado, descartado): `npm ci && npm test` → `tests 15, pass 15, fail 0`, exit 0, Node 24.13.1. `npm audit`: 22 = línea base.

## 2026-09-24 (9)
- **Estado:** oleada 2 aprobada completa (T-003 r2, T-004 r1, T-005 r2). Pendiente de merge del PO.
- **Pasó:** T-003 r2 corrige el hallazgo 1 (A7–A9, fallan antes y pasan después). T-005 r2 se hizo con la tarjeta bloqueada, antes de publicarse D-7; quitó `err.type`, pero faltó el 415. Ronda 3 no permitida: la terminó el LIDER (`d2054ca`, solo `README.md`). Tropiezo #4. Ninguna pre-revisión en toda la oleada.
- **Sigue:** el PO integra T-003 → T-004 → T-005 y avisa con `integré`; al integrar se cierra E2 con retro.
- **Última verificación en verde:** `main` @ `99531f4` + `266818b` + `0516bdc` + `d2054ca` (worktree temporal, descartado): `npm ci && npm test` → `tests 15, pass 15, fail 0`, exit 0, Node 24.13.1. 400/413/415 en JSON con headers y sin stack. `origin/main` = `99531f4`.

## 2026-09-24 (8)
- **Estado:** E2 especificada (US3 sensible, US4 normal; RF-004 a RF-009). E3 "Seguridad continua" en el backlog, sin fecha.
- **Sigue:** el PO dicta las tareas de E2 con `CHARTER: api-lab tareas: 3`.

## 2026-09-24 (8)
- **Estado:** ronda 2 liberada para T-003 y T-005 (`cambios_solicitados`). T-004 aprobada, pendiente de merge.
- **Decidido:** D-7 (PO eligió A): C-003 ampliado a todo error 4xx de body-parser, con 415 `Tipo de contenido no soportado` y 4xx genérico `Petición inválida`. US3 escenario 8 y RF-005 actualizados. C-005: el README no copia notas de implementación.
- **Sigue:** SENIOR-3 (T-003 r2, casos A7–A9) y SENIOR-2 (T-005 r2) en paralelo; RAPIDO pre-revisa las dos; luego `revisar`. Es la última ronda permitida para ambas.

## 2026-09-24 (7)
- **Estado:** E1 integrada; E2 comprometida sin alcance.
- **Pasó:** `kit/` sincronizado con el kit maestro por indicación del PO (`kit/VERSION` = 2026-09-24 (c)). `SPEC.md` con tabla de épicas: E1 (retroactiva, US1–US2) y E2 "Endurecimiento y observabilidad", comprometida para 2026-10-01. Tareas con `tipo`, `epica`, `liberada`, `integrada`. Tablero con observaciones y propuestas al kit.
- **Retro oleada 1:** funcionó: tareas con contrato y "falla cuando", cero conflictos, nadie hizo PR ni push a `main`. No funcionó: bypass de admin, modelo equivocado en SENIOR-2, reporte dañado por PowerShell. Propuesta al kit: ya aplicada por el PO (CHANGELOG 2026-09-24).
- **Sigue:** el PO define el alcance de E2 (`requerimiento:`).

## 2026-09-24 (7)
- **Estado:** revisión r1 de la oleada 2. T-004 APROBADA; T-003 y T-005 CAMBIOS_SOLICITADOS, bloqueadas hasta la decisión del PO.
- **Pasó:** 3 reportes, 0 pre-revisiones. Integración simulada de las 3 ramas sin conflictos. Hallazgo alto en T-003: los errores de body-parser que C-003 no enumeraba (413 por parámetros, 415 por encoding o charset) responden HTML con stack y rutas absolutas fuera de `production`. Es previo a la tarea y el hueco era del contrato del LIDER. T-005: el README copió las anotaciones `err.type` de C-003 (baja).
- **Aprendizaje (LIDER):** al contratar un manejador de errores, enumerar todos los tipos que emite la librería, no solo los del requisito. Separar en el contrato lo que se documenta de las notas de implementación.
- **Sigue:** el PO decide A (ronda 2 de T-003 y T-005, ampliando C-003) o B (diferir, D-7). El PO puede integrar T-004 ya.
- **Última verificación en verde:** `main` @ `99531f4` + merge de `e93c7b7`, `0516bdc` y `88d01de` (worktree temporal, descartado): `npm ci && npm test` → `tests 12, pass 12, fail 0`, exit 0, Node 24.13.1. `origin/main` = `99531f4`.

## 2026-09-24 (6)
- **Estado:** prueba cerrada; kit ajustado con lo aprendido.
- **Pasó:** a pedido del PO, el LIDER actualizó CHARTER-DEV: `PREPARACION-REPO.md` (bypass solo para PR si los agentes usan la cuenta del PO; "Bypassed" no es rechazo; confirmar en el remoto), `desarrollador.md` + skill + zip (verificar el modelo contra el ROSTER, worktree propio si el clon es compartido, reportes con la herramienta de edición en UTF-8 sin BOM), `configuracion-plataformas.md` y `guias/PRUEBA-API-LAB.md`. Copiado `PREPARACION-REPO.md` a `kit/`; `kit/VERSION` = 2026-09-24 (b).
- **Sigue:** el PO reinstala la skill de desarrollador en Claude (Pro) y Antigravity.

## 2026-09-24 (6)
- **Estado:** oleada 2 (E2) liberada. T-003, T-004 y T-005 en `en_progreso`, en paralelo desde `main` @ `99531f4`.
- **Pasó:** el PO dictó 3 tareas (`tareas: 3`). Aclaraciones en `SPEC.md`: límite de 100 kb en JSON y urlencoded; JSON malformado → 400 en US3 (D-6); uptime = `Math.floor(process.uptime())`. Contratos C-003, C-004 y C-005 en `ARQUITECTURA.md`, con modelo de amenazas. Tropiezo #3 (worktree propio). Modelo de T-002 registrado como no confirmado, sin bloqueo (PO).
- **Decidido:** D-6. T-005 en paralelo contra los contratos; las diferencias con lo integrado se piden a T-005 (PO). RAPIDO pre-revisa T-003 y T-005.
- **Sigue:** SENIOR-3, SENIOR-1 y SENIOR-2 desarrollan; luego pre-revisiones y `CHARTER: api-lab revisar`. En cada revisión: `origin/main` = `99531f4` salvo merges del PO.
- **Última verificación en verde:** sobre `main` @ `99531f4`, Express 5.1.0: 404 y 400 responden HTML con `X-Powered-By: Express`; JSON de 150 kb, urlencoded de 150 kb y gzip de 191 bytes que descomprime a 150 kb → 413 con stack en consola. Es la línea base que T-003 debe cambiar.

## 2026-09-24 (5)
- **Estado:** prueba cerrada. T-001 y T-002 `integrada`.
- **Pasó:** el PO integró por PR #2 (T-001) y #3 (T-002), en orden. `main` = `99531f4`; ambos commits de tarea son ancestros; `main` sin archivos de coordinación.
- **Sigue:** sin oleada 2. Backlog en `PLAN.md` (dependencias vulnerables, T-000 con escaneos, `database.sqlite` versionado, `err.message` expuesto). Corregir el bypass (D-5) antes de cualquier proyecto real.
- **Última verificación en verde:** `npm ci && npm test` → `tests 1, pass 1, fail 0`, exit 0, Node 24.13.1, sobre `main` @ `99531f4` (worktree aislado, LIDER).

## 2026-09-24 (4)
- **Estado:** oleada 1 aprobada, pendiente de merge del PO.
- **Pasó:** revisión r1 de T-001 (`b2fb4fc`) y T-002 (`a218136`): ambas APROBADAS, sin cambios de código. RAPIDO no pre-revisó T-001 (opcional en S). T-002 reporta Gemini 3.8 Flash en lugar de Gemini 3.1 Pro High (decisión del PO). Tropiezos #1 (reporte dañado por escapes de PowerShell) y #2 (modelo del rol). Antigravity trabaja en el clon del PO y lo dejó en la rama `chr/T-002-readme-health`.
- **Sigue:** el PO integra T-001 y luego T-002 y avisa con `integré`.
- **Última verificación en verde:** `npm test` → `pass 1, fail 0` en Node 24.13.1 sobre `main`@`cce6718` + merge de `b2fb4fc` y `a218136` (simulado, descartado). `origin/main` = `cce6718`.

## 2026-09-24 (3)
- **Estado:** ejecución, oleada 1 liberada de nuevo (T-001, T-002 en `en_progreso`).
- **Pasó:** SENIOR-1 se activó con la oleada retenida y correctamente no hizo nada. El PO decidió seguir sin corregir el bypass (D-5).
- **Decidido:** D-5. D-3 se da por aceptada al pedir el PO continuar la prueba (puede objetarla).
- **Sigue:** SENIOR-1 y SENIOR-2 desarrollan; RAPIDO pre-revisa T-001. En cada revisión: comprobar que `origin/main` = `cce6718` salvo merges del PO.

## 2026-09-24 (2)
- **Estado:** oleada 1 RETENIDA; T-001 y T-002 vuelven a `pendiente`.
- **Pasó:** tras el push de `charter`, `git fetch` mostró `origin/main` = `cce6718 "prueba de humo"` (commit vacío, push directo de `welectronic` a las 07:24Z). La protección no bloqueó ese push: la prueba de humo falló aunque se informó OK.
- **Sigue:** el PO quita el bypass directo de `proteger-main` (o lo deja solo para PR) y repite la prueba; el LIDER verifica que `main` no cambie antes de liberar.

## 2026-09-24
- **Estado:** ejecución, oleada 1 liberada (revertido en la entrada (2)).
- **Pasó:** Fase 0 confirmada por el PO y verificada por API (main protegida, charter sin force push/borrado). Rama `charter` creada con plantilla + kit (copia 2026-09-24). T-001 y T-002 liberadas en paralelo. Diagnóstico y T-000 omitidos (D-4).
- **Decidido:** D-1 repo público, D-2 credencial del PO, D-4. Propuesto D-3 (audit informativo).
- **Sigue:** SENIOR-1 y SENIOR-2 desarrollan; RAPIDO pre-revisa T-001; luego `CHARTER: api-lab revisar`.
- **Última verificación en verde:** `node -e` con `app.listen(0)` → 404 en ruta inexistente y cierre limpio, en `main` @ `9b5b5aa`. `npm audit`: 22 vulnerabilidades (línea base).
