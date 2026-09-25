# Consejo de diseño

Varias miradas independientes sobre una decisión de diseño **antes** de congelar contratos o liberar tareas. Adaptado del patrón "council" (análisis a ciegas, contrapunto anónimo, disenso obligatorio y veredicto sin consenso forzado).

## Cuándo se convoca

Es obligatorio si se cumple alguna de estas condiciones:
- Una épica con tareas M o `sensible`, o con alguna tarea `irreversible: si`.
- La elección de stack, del modelo de datos o de un servicio externo.
- La arquitectura tiene 2 o más `[SUPUESTO]` o `[DESCONOCIDO]` abiertos.
- El PO lo pide: `CHARTER: <proyecto> consejo: <tema>`.

No se usa en tareas S `normal` ni para decisiones reversibles y baratas.

## Quiénes participan

Participan **lentes**, no personajes. Cada lente es una tarjeta en `roles/lentes/`:

| Lente | Pregunta que hace | Obligatoria |
|---|---|---|
| `COMPLETITUD` | ¿Qué casos, errores, estados o entradas faltan? | Siempre |
| `CONTRATOS` | ¿Las interfaces, invariantes y responsabilidades están definidas y no se contradicen? | Siempre |
| `SIMPLICIDAD` | ¿Hay complejidad sin justificar? ¿Cómo falla esto y qué tan caro es deshacerlo? | Siempre |
| `AMENAZAS` | ¿Cómo lo abusaría alguien? ¿Qué se filtra? | Si hay algo `sensible` |

**Cómo corren:**
- **Subagentes del LIDER (por defecto):** el LIDER lanza una lente por subagente desde su propia sesión, sin activaciones del PO. Son la misma familia de modelo.
- **Asiento externo (sensible o irreversible):** una lente la ocupa una instancia de **otra familia** (por ejemplo SENIOR-2 con Gemini Pro). El PO la activa con `CHARTER: <proyecto> <ROL> consejo C-00N`.

## Protocolo

El LIDER coordina y registra todo en `consejos/C-00N-<slug>.md` (`plantillas/CONSEJO.md`).

0. **Planteamiento.** El LIDER escribe el problema, el material (secciones de `SPEC.md` y `ARQUITECTURA.md`, archivos del repo) y las opciones, si las hay. Cada lente reformula el problema de dos maneras. Si alguna reformulación revela que se está resolviendo otro problema, el consejo se detiene y se corrige el planteamiento.
1. **Análisis a ciegas.** Cada lente ve solo el planteamiento, no a las demás. Máximo 300 palabras, con etiquetas de evidencia (`ANCLAJE.md`).
2. **Contrapunto anónimo.** Cada lente lee las demás como *Lente A, B, C* y debe objetar al menos 2 puntos concretos o declarar qué verificó. Cambia de postura solo si le señalan una falla específica. Máximo 200 palabras.
3. **Postura final.** Una línea por lente: `POSTURA | CONFIANZA alta/media/baja | BLOQUEANTE sí/no`.
4. **Síntesis (LIDER).** Decisión, compromisos aceptados, criterios de reversión, preguntas abiertas y disenso (la postura minoritaria con su mejor argumento). La decisión se registra en `DECISIONES.md` con el número del consejo.

**Controles del LIDER entre rondas:**
- Si más del 70 % coincide en la ronda 1, pide a una lente que argumente la mejor alternativa, suponiendo que el consenso está equivocado.
- Si una lente repite su ronda 1 sin responder a las demás, la devuelve una vez.
- Todo `[SUPUESTO]` que aparezca pasa a *Supuestos y desconocidos* de `ARQUITECTURA.md`.

## Resultado

| Situación | Qué pasa |
|---|---|
| Ninguna lente marca `BLOQUEANTE sí` y hay consenso | El LIDER decide, registra y sigue |
| Alguna lente marca `BLOQUEANTE sí`, o no hay consenso | El consejo queda `escalado_po`: el LIDER presenta al PO las posturas con sus argumentos, sin elegir. El PO decide |
| Hay supuestos abiertos que afectan contratos | No se liberan las tareas afectadas hasta verificarlos |

## Costo

Tres subagentes con un límite de palabras cuestan poco frente a una ronda de retrabajo. El asiento externo cuesta una activación del PO: úsalo solo donde el error sería caro.
