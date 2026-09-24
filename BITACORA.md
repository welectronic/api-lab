# Bitácora

Registro breve para retomar sin perder contexto. Lo más reciente va arriba.

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
