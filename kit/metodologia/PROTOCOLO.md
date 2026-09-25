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
| `reportes/T-XXX-pruebas.md` / `reportes/T-XXX-depuracion.md` | El probador / el depurador asignado |
| `revisiones/T-XXX-rN-pre.md` | El pre-revisor asignado |
| `consejos/C-00N-<slug>.md` | LIDER |
| `consejos/C-00N-<ROL>.md` | La instancia que ocupa el asiento externo |
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

- **Cada tarea en su propia carpeta (worktree):** `git worktree add --no-track -b <rama> ../<repo>.T-XXX origin/<rama_origen>` y el primer push con `git push -u origin <rama>`. Nunca cambies de rama en el clon principal: otras instancias pueden estar usándolo en el mismo equipo. En entornos web con sandbox propio, la sesión ya es tu carpeta aislada.
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

## 10. Formato de respuesta al PO (obligatorio)

El detalle vive en los archivos (revisiones, reportes, tablero). En el chat va solo lo que el PO necesita para decidir y actuar.

**LIDER** (máximo ~12 líneas):
```
Resultado:
- T-001 ✅ aprobada
- T-002 ❌ cambios: <motivo en ≤10 palabras>
Decisión requerida: <solo si existe; pregunta cerrada + tu recomendación>
Para el PO ahora:
1. <acción>
2. <acción>
<comandos, si hay, en un solo bloque>
```

**Desarrollador** (máximo 3 líneas): tarea, estado y commit.

**No va en la respuesta:**
- La narración del proceso ("leo los reportes", "corro la verificación…").
- La evidencia: va en la revisión o el reporte.
- Salidas esperadas de comandos.
- El estado de la Fase 0, salvo que haya cambiado.
- Lo que ya se dijo antes.
- Las observaciones del proceso: van al tablero. En la respuesta solo se indica "N observaciones nuevas en el tablero".

## 11. Gobierno del kit

- **Nadie** (ni el LIDER ni los desarrolladores) modifica por iniciativa propia las skills, las instrucciones de los agentes, la carpeta `kit/` de la rama ni el kit maestro.
- **Propuestas:** cada desarrollador las escribe en su reporte, en la sección *Propuestas al kit*. El LIDER las consolida en `TABLERO.md`, en la sección *Propuestas al kit (pendientes del PO)*, sin desarrollarlas ni gastar tiempo en ellas.
- **El PO decide** y las aplica en una sesión de mantenimiento del kit, aparte del proyecto.
- **Única excepción:** el LIDER actualiza `kit/` en la rama para sincronizarla con el kit maestro, cuando el PO lo indique.

## 12. Kanban: flujo, WIP y "hecho"

El tablero (`CHARTER-DEV/tablero/tablero.html`) se construye solo a partir de los archivos de la rama `charter`. Para que funcione, los campos deben estar al día.

**Columnas y de dónde salen:**
| Columna | Se calcula así |
|---|---|
| Backlog | Historias de `SPEC.md` sin ninguna tarea |
| Lista | Tarea con `estado: pendiente` |
| En progreso | `en_progreso` o `cambios_solicitados` |
| En revisión | Último reporte `listo_para_revision` sin revisión de esa ronda |
| Aprobada | Última revisión `APROBADA`, todavía sin integrar |
| Integrada | `estado: integrada` |

Una tarea `bloqueada` se muestra con una alerta en su columna.

**Definición de hecho:** una tarea está **hecha** solo cuando está `integrada` en la rama base. Aprobada no es hecha.

**Límites de trabajo en curso (WIP):**
- Una tarea en progreso por desarrollador. El LIDER libera la siguiente tarea de un desarrollador solo cuando la anterior pasa a revisión.
- Máximo 5 tareas en revisión. Si se llega al límite, el LIDER revisa antes de liberar más.

**Campos que mantiene el LIDER:**
- `epica` e `historia` en cada tarea.
- `liberada` (fecha en que pasa a `en_progreso`).
- `integrada` (fecha en que el PO confirma el merge).
- Encabezados de historias en `SPEC.md` con el formato `### USn — título (Pn) [En]`.

**Carril urgente:** una tarea con `urgente: si` (bug de severidad crítica) se libera de inmediato, va primero en su columna y no cuenta para el límite de WIP. Solo puede haber una urgente a la vez por proyecto. El PO la integra apenas quede aprobada.

**Bugs y ajustes** (`SOLICITUDES.md` C y D): se trabajan como tareas con `tipo: correctivo` o `tipo: ajuste`. El tablero muestra los bugs abiertos por severidad, los días hasta resolver (de `creada` a `integrada`) y los **escapes**: bugs con `causado_por` que apuntan a tareas ya integradas, agrupados por el desarrollador que hizo esa tarea.

**Retro:** al cerrar cada oleada, 3 líneas en `BITACORA.md` (funcionó / no funcionó / propuesta al kit).

## 13. Medición del negocio (agencia)

El valor para la agencia es **entregar lo comprometido, a tiempo, sin retrabajo y con un margen conocido**. El tablero lo calcula con estos datos:

| Qué se mide | De dónde sale | Quién lo registra |
|---|---|---|
| **Esfuerzo de IA** | `inicio`, `fin` y `sesiones` de cada reporte, pre-revisión y revisión | Cada desarrollador y el LIDER, con la hora real del sistema **y su zona horaria** |
| **Esfuerzo del PO** | `esfuerzo_po_horas` de la tarea | El LIDER, cuando el PO lo dice (`integré T-004 (30 min)`). Si el PO no lo dice, el LIDER lo pregunta en una línea en *Para el PO ahora*: es el costo más alto y el cuello de botella real |
| **Precisión de estimación** | Horas reales por talla contra la referencia: S ≈ 15 min, M ≈ 1 h de IA (calibrado con la prueba api-lab; se ajusta con los datos reales) | Automático |
| **Compromisos** | Columnas `Comprometida` y `Entregada` de la tabla de épicas en `SPEC.md` | El LIDER: comprometida al planear; entregada cuando el PO dice `entregué E1` |
| **Pronóstico** | Ritmo real (tareas integradas por semana en las últimas 4) y lo que falta de cada épica | Automático |
| **Antigüedad** | Días en progreso (desde `liberada`) o en revisión (desde el último reporte) | Automático; alerta a los 3 y 2 días |
| **Aceptación del cliente** | Columna `Aceptada` de la épica, cuando el PO dice `el cliente aceptó E1` | El LIDER |
| **Retrabajo del cliente** | Ajustes y bugs creados después de la fecha `Entregada` de su épica (garantía) | Automático |
| **Capacidad** | Ritmo por desarrollador, carga pendiente y líneas `AAAA-MM-DD sin cuota <ID>` en `BITACORA.md` | El LIDER anota cada `sin cuota` |
| **Costo y margen** | Horas × costo de referencia, contra precio y presupuesto de `CHARTER-DEV/comercial/` | El PO; nunca en la rama `charter` |

**Informe al cliente:** la pestaña *Informe* del tablero arma el resumen del periodo (entregado, aceptado, bugs resueltos, ajustes y próximos compromisos) sin costos, nombres de instancias ni datos internos, listo para imprimir o guardar como PDF. No consume tokens.

**Mide lo que decide:** si un dato no cambia una decisión (cotizar, reasignar, renegociar una fecha), no se agrega.

## 14. Anclaje, roles y consejo de diseño

- **Anclaje** (`ANCLAJE.md`): etiquetas de evidencia en contratos, decisiones, hallazgos y reportes; reformular antes de actuar; al menos 2 objeciones en quien revisa; familias de modelo opuestas entre autor y crítico.
- **Tarjetas de rol** (`roles/`, en la rama `kit/roles/`): cada instancia lee la de su rol y la de la función que le asigne la tarea (probador, depurador, pre-revisor o lente). Lo que la tarjeta prohíbe no se hace.
- **Consejo de diseño** (`CONSEJO-DE-DISENO.md`): lentes independientes antes de congelar contratos en épicas M, sensibles o irreversibles, en elecciones de stack o con supuestos abiertos. Sin consenso, decide el PO.
- **Supuestos y desconocidos** en `ARQUITECTURA.md`: ninguna tarea se libera si su contrato depende de uno abierto.
- **Decisiones** con evidencia, criterio de reversión y fecha de revisión. En cada retro, el LIDER actualiza el estado de las que vencieron.

## 15. Guardas, subagentes y relevo

- **Guardas** (`GUARDAS.md`): hook `pre-push`, permisos de Claude Code y lista de comandos de Antigravity hacen que las acciones prohibidas fallen, no solo que estén prohibidas.
- **Subagentes** (`agentes/subagente-desarrollador.md`): el LIDER ejecuta las tareas de SENIOR-3 y las lentes del consejo desde su sesión, sin activaciones del PO.
- **Relevo** (`CICLO-DE-TAREA.md`): cada respuesta termina con el comando exacto para quien sigue; el tablero lo muestra en *Activar ahora*.
- **Presupuesto** por tarea: quien lo va a superar se detiene y reporta.
