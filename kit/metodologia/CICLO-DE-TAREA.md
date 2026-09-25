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

## Relevo: quién sigue

Cada instancia termina su respuesta al PO con **Siguiente:** y el comando exacto. El PO solo lo copia. El tablero muestra lo mismo en el panel *Activar ahora*.

| Termina | Siguiente |
|---|---|
| El LIDER libera una tarea con probador | El probador: `CHARTER: <proyecto> <PROBADOR> T-XXX` |
| El LIDER libera un bug con depurador | El depurador: `CHARTER: <proyecto> <DEPURADOR> T-XXX` |
| El LIDER libera una tarea sin probador ni depurador | El autor: `CHARTER: <proyecto> <AUTOR> T-XXX` |
| El probador o el depurador entrega | El autor: `CHARTER: <proyecto> <AUTOR> T-XXX` |
| El autor entrega y la tarea tiene pre-revisor | El pre-revisor: `CHARTER: <proyecto> <PRE-REVISOR> T-XXX` |
| El autor entrega sin pre-revisor, o el pre-revisor entrega | El LIDER: `CHARTER: <proyecto> revisar` |
| El LIDER aprueba | El PO: PR y merge, luego `CHARTER: <proyecto> integré T-XXX (<min>)` |
| El LIDER pide cambios | El autor: `CHARTER: <proyecto> <AUTOR> T-XXX` |

Si el autor es un subagente del LIDER (`agentes/subagente-desarrollador.md`), el LIDER hace ese relevo solo y no hace falta activar a nadie.

## Presupuesto

Cada tarea declara `presupuesto:` (sesiones y minutos de IA). Si el desarrollador ve que lo va a superar, se detiene y reporta `bloqueada`. El tablero marca las tareas que se pasaron. Un presupuesto superado es una señal de que la tarea estaba mal dimensionada o mal especificada, no una falta del desarrollador.

## Pruebas primero (probador, en tareas M o sensibles)

1. La tarea indica `probador: <ROL>`, de otra familia de modelo que el autor (`ROSTER.md`); en tareas `sensible`, un SENIOR. Reemplaza al pre-revisor, así que no suma activaciones: solo cambia el orden (primero el probador, después el autor).
2. El PO activa primero al probador. Escribe las pruebas de aceptación y de abuso sin ver código, confirma que fallan, las sube a la rama de la tarea y entrega `reportes/T-XXX-pruebas.md`.
3. El autor no empieza hasta que exista ese reporte. Hace pasar las pruebas sin modificarlas; si una le parece incorrecta, lo reporta.
4. Con probador, la pre-revisión no hace falta.
5. **Segunda entrega:** si las pruebas necesitan el código del autor (por ejemplo, ramas de abuso sobre su commit), el LIDER pone `pruebas_entregas: 2`. Cuando el autor entrega, el probador agrega `## Entrega 2` al mismo `reportes/T-XXX-pruebas.md` y solo entonces sigue la revisión del LIDER. El tablero lo muestra en *Activar ahora*.

## Depuración (en bugs)

En `tipo: correctivo`, si la tarea indica `depurador: <ROL>`, esa instancia reproduce el fallo y escribe el test de regresión que falla (`reportes/T-XXX-depuracion.md`). Luego el autor arregla.

## Pre-revisión (cuando no hay probador)

Su objetivo es ahorrar cuota del LIDER filtrando los errores evidentes.

1. **La pre-revisión es obligatoria en tareas M o `sensible`** y no se usa en tareas S `normal` (`prerevisor: ninguno`). La tarea indica `prerevisor: <ID>`, distinto del autor. Cuando llega un reporte `listo_para_revision`, el LIDER pone en *Para el PO ahora* el comando para activar al pre-revisor, y el PO lo activa de inmediato. El LIDER **no revisa** una tarea que requiere pre-revisión sin ella, salvo que el PO escriba `revisar sin pre-revisión`.
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

Máximo **2 rondas** de cambios. Si hace falta una tercera:
- **Cierre por el LIDER**, solo si lo que falta es trivial (documentación o una línea sin lógica ni seguridad): el LIDER lo hace, marca `cierre_lider: si` en la tarea y registra su esfuerzo en la revisión. Cuenta como retrabajo.
- En cualquier otro caso, el LIDER la **redefine** o la **reasigna** al siguiente rol de la cadena de respaldo.

## Integración (PO)

El PO revisa las tareas `aprobada`, hace merge o PR y avisa: `CHARTER: <proyecto> integré T-XXX`. El LIDER marca `integrada` y avisa a las tareas dependientes que actualicen desde la base.

## Paralelismo: oleadas

Las tareas se agrupan en oleadas. Las de una misma oleada no comparten archivos y pueden correr en paralelo. La siguiente oleada empieza cuando la anterior está integrada o sus contratos están estables.

## Escalar a N desarrolladores en paralelo

No hay un límite fijo: cada desarrollador es un ID en `ROSTER.md` (`SENIOR-3`, `RAPIDO-2`, …). Varias sesiones de la misma herramienta cuentan como desarrolladores distintos si cada una tiene su propio ID. Ejemplo: una sesión de Claude Code con la skill del desarrollador puede ser `SENIOR-3`, aunque use la misma cuenta que el LIDER.

Condiciones para que funcione:
1. **Un ID por sesión activa.** Dos sesiones nunca comparten ID, porque el ID define qué tareas toma cada una.
2. **Una carpeta por tarea** (worktree `../<repo>.T-XXX`). Así varias instancias en el mismo equipo no se pisan.
3. **Tareas de una oleada sin archivos compartidos.** Si dos tareas necesitan tocar el mismo archivo, se ordenan con `depende_de` o una sola tarea asume ese archivo.
4. **Contratos definidos antes de liberar la oleada.** Una tarea que documenta o consume lo que produce otra trabaja contra el contrato, no contra el código.
5. **La rama `charter` aguanta la concurrencia** porque cada archivo tiene un solo dueño y todos hacen `pull --rebase` antes del push.

Límites prácticos:
- **Revisión:** el LIDER revisa todo, y cada desarrollador extra es más diffs que revisar. Conviene usar pre-revisores para filtrar.
- **Activación:** el PO activa cada sesión a mano. Una oleada de 3 a 5 tareas es manejable.
- **Integración:** el PO integra en el orden que indique el LIDER, y las ramas que queden atrás se actualizan desde la base antes del merge.
- **Cuota:** varias sesiones de la misma cuenta comparten su límite de uso.
