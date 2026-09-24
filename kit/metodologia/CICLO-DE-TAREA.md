# Ciclo de una tarea

Todos los archivos de este ciclo (tareas, reportes, pre-revisiones, revisiones, tablero) viven en la rama `charter`. El código vive en las ramas `chr/T-XXX-<slug>`.

```
pendiente ─► en_progreso ─► (pre-revisión) ─► en_revision ─► aprobada ─► integrada
                ▲                  │                │
                └──────────────────┴── cambios_solicitados
   (cualquier estado) ─► bloqueada ─► pendiente
```

| Estado | Quién lo pone | Dónde |
|---|---|---|
| `pendiente` | LIDER, al crearla | tarea |
| `en_progreso` | LIDER, al liberarla | tarea + tablero |
| `listo_para_revision` / `bloqueada` | Desarrollador | su reporte |
| (pre-revisión) | El pre-revisor la toma solo cuando el reporte está `listo_para_revision` | su pre-revisión |
| `en_revision` → `aprobada` / `cambios_solicitados` | LIDER | revisión, tarea, tablero |
| `integrada` | LIDER, cuando el PO confirma el merge | tarea + tablero |

## Ramas

- Rama base: la de `PROYECTO.md` (ej. `develop` o `main`).
- Rama de tarea: `chr/T-XXX-<slug>`, creada desde la rama base actualizada.
- Si depende de una tarea aún no integrada, la tarea lo indica y se ramifica desde esa rama.

## Pre-revisión (opcional, recomendada en tallas M)

Su objetivo es ahorrar cuota del LIDER filtrando los errores evidentes.

1. La tarea indica `prerevisor: <ID>`, que debe ser distinto del autor. Cuando el autor entrega su reporte con `listo_para_revision`, el PO activa al pre-revisor, que la toma sin esperar al LIDER.
2. El pre-revisor lee el diff de la rama contra la base, corre la verificación y llena `revisiones/T-XXX-rN-pre.md` con `plantillas/PRE-REVISION.md`.
3. **No decide**: su resultado es `pasa_a_lider` o `devolver_al_autor`, con evidencia. Si devuelve, el LIDER confirma leyendo solo la pre-revisión y marca `cambios_solicitados`.

## Revisión (LIDER)

1. Lee el diff de la rama contra la base, no el repo completo, y la pre-revisión si existe.
2. Corre los comandos de verificación sobre el commit reportado.
3. Revisa: criterios de aceptación (incluido "falla cuando"), archivos permitidos, contratos, `PRINCIPIOS.md`, `CONVENCIONES.md`, el estándar del stack, el patrón de referencia, secretos y dependencias (que existan y sean las correctas).
4. **Revisión de seguridad** (obligatoria si `seguridad: sensible`): checklist de `estandares/seguridad.md` §5. Una vulnerabilidad verificada es siempre `alta` + `corregir`; solo se difiere con aprobación del PO registrada en `DECISIONES.md`.
5. **Triage de hallazgos.** Cada hallazgo se verifica en el código antes de reportarlo:
   - Si al verificar resulta falso, se descarta (anotando por qué).
   - Si es real, se le asigna severidad (`alta`, `media`, `baja`) y un destino:
     - **corregir**: arreglo inequívoco, va como cambio obligatorio.
     - **decision_PO**: hay una ambigüedad que solo el PO puede resolver.
     - **diferir**: problema previo o no accionable ahora, pasa al backlog.
   - Los `baja` con arreglo costoso y poco probables en uso real se descartan.
6. Escribe `revisiones/T-XXX-rN.md` con el veredicto: `APROBADA` o `CAMBIOS_SOLICITADOS`.
7. Si un agente cometió un error que ya aparece en `TROPIEZOS.md` o que se repite, lo agrega a `TROPIEZOS.md`.
8. Actualiza la tarea, el `TABLERO.md` y la `BITACORA.md`.

## Límite de rondas

Máximo **2 rondas** de cambios. En la tercera, el LIDER la termina, la redefine o la reasigna al siguiente rol de la cadena de respaldo.

## Integración (PO)

El PO revisa las tareas `aprobada`, hace merge o PR y avisa: `CHARTER: <proyecto> integré T-XXX`. El LIDER marca `integrada` y avisa a las tareas dependientes que actualicen desde la base.

## Paralelismo: oleadas

Las tareas se agrupan en oleadas. Las de una misma oleada no comparten archivos y pueden correr en paralelo. La siguiente oleada empieza cuando la anterior está integrada o sus contratos están estables.
