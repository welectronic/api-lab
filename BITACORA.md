# Bitácora

Registro breve para retomar sin perder contexto. Lo más reciente va arriba.

## 2026-09-24 (7)
- **Estado:** E1 integrada; E2 comprometida sin alcance.
- **Pasó:** `kit/` sincronizado con el kit maestro por indicación del PO (`kit/VERSION` = 2026-09-24 (c)). `SPEC.md` con tabla de épicas: E1 (retroactiva, US1–US2) y E2 "Endurecimiento y observabilidad", comprometida para 2026-10-01. Tareas con `tipo`, `epica`, `liberada`, `integrada`. Tablero con observaciones y propuestas al kit.
- **Retro oleada 1:** funcionó: tareas con contrato y "falla cuando", cero conflictos, nadie hizo PR ni push a `main`. No funcionó: bypass de admin, modelo equivocado en SENIOR-2, reporte dañado por PowerShell. Propuesta al kit: ya aplicada por el PO (CHANGELOG 2026-09-24).
- **Sigue:** el PO define el alcance de E2 (`requerimiento:`).

## 2026-09-24 (6)
- **Estado:** prueba cerrada; kit ajustado con lo aprendido.
- **Pasó:** a pedido del PO, el LIDER actualizó CHARTER-DEV: `PREPARACION-REPO.md` (bypass solo para PR si los agentes usan la cuenta del PO; "Bypassed" no es rechazo; confirmar en el remoto), `desarrollador.md` + skill + zip (verificar el modelo contra el ROSTER, worktree propio si el clon es compartido, reportes con la herramienta de edición en UTF-8 sin BOM), `configuracion-plataformas.md` y `guias/PRUEBA-API-LAB.md`. Copiado `PREPARACION-REPO.md` a `kit/`; `kit/VERSION` = 2026-09-24 (b).
- **Sigue:** el PO reinstala la skill de desarrollador en Claude (Pro) y Antigravity.

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
