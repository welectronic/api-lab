# Cotizador en horas

> Lo ejecuta el LIDER; lo aprueba el PO. Convierte la necesidad de un cliente en una cotización **en horas, sin dinero y sin fechas**, y al aprobarse siembra el proyecto sin volver a capturar nada. Lectura bajo demanda: solo con los disparadores `cotizar`, `capturar contexto`, `cotización … respuestas|aprobada|rechazada` y `recotizar`.

## 1. Modos

| Modo | Parte de | Salida al aprobar |
|---|---|---|
| **Nuevo** | Brief del cliente | Proyecto nuevo (`nuevo proyecto`) sembrado con la cotización |
| **Ampliación** | `CONTEXTO-PROYECTO.md` + el delta del módulo | Épicas agregadas al `SPEC.md` existente, con numeración continua |

## 2. Disparadores

| Orden | Qué haces |
|---|---|
| `CHARTER: cotizar <nombre>` | Abre `cotizaciones/COT-NNN-<nombre>/` desde `plantillas/cotizacion/` y pide o recibe el brief |
| `CHARTER: cotizar <proyecto> módulo <nombre>` | Ampliación. Si `cotizaciones/<proyecto>/CONTEXTO-PROYECTO.md` no existe o tiene más de 60 días, primero lo capturas |
| `CHARTER: <proyecto> capturar contexto` | Genera `CONTEXTO-PROYECTO.md` en solo lectura con el prompt de `agentes/prompts-disparadores.md` |
| `CHARTER: cotización COT-NNN respuestas: …` | Incorporas las respuestas del cliente y recalculas |
| `CHARTER: recotizar COT-NNN` | Nueva versión (la anterior va a `versiones/vN/`) por cambio de alcance o desviación sobre el umbral |
| `CHARTER: cotización COT-NNN aprobada <escenario>` | Siembra (§9) |
| `CHARTER: cotización COT-NNN rechazada <motivo>` | Cierras `ESTADO.md` con el motivo |

Numeración COT-NNN global y continua (revisa las carpetas existentes).

## 3. Archivos

```
CHARTER-DEV/cotizaciones/
  COT-NNN-<nombre>/            proyecto nuevo
  <proyecto>/
    CONTEXTO-PROYECTO.md       captura del proyecto base (se reutiliza)
    COT-NNN-<modulo>/          ampliación
      ESTADO.md  BRIEF.md  REQUISITOS.md
      cotizacion.json          entrada del cálculo (la escribes tú)
      calculo.json             salida del script (no se edita)
      COTIZACION-INTERNA.md    documento técnico para el PO
      GUIA-COMERCIAL.md        guía para el equipo comercial
      anexos/  consejos/  versiones/
```

`cotizaciones/` nunca se copia a `kit/` ni a la rama `charter`: tiene información confidencial del cliente previa a un contrato. No contiene precios.

## 4. Etapas

| # | Etapa | Qué haces | Sale |
|---|---|---|---|
| 0 | Captura | Recibes el brief tal como llegó; en ampliación, el contexto | `BRIEF.md` |
| 1 | Reformulación | Reescribes la necesidad de dos maneras, clasificas la madurez y marcas lo bloqueante | Entendimiento |
| 2 | Preguntas | Máximo 5 cerradas por ronda, máximo 2 rondas. Lo no respondido pasa a supuesto con su impacto | Preguntas |
| 3 | Requisitos | RF con criterio de aceptación y MoSCoW; RNF medibles (ISO/IEC 25010); contexto y restricciones | `REQUISITOS.md` |
| 4 | Descomposición | Requisitos → capacidades del catálogo → tareas → épicas | `cotizacion.json` |
| 5 | Arquitectura y brechas | Decisiones con alternativa descartada; **brechas de la especificación**; consejo si aplica | Secciones 3 y 4 |
| 6 | Estimación | `python3 cotizador/cotizar.py <carpeta>` | `calculo.json` y tablas |
| 7 | Cronograma y riesgos | Oleadas, esperas, precondiciones, acciones del PO, contingencia | Secciones 7, 8, 12 |
| 8 | Revisión | 2 objeciones propias; verificas que las tablas vienen del script | Interna y guía |

**Parámetros bloqueantes** (sin ellos no hay estimación, solo orden de magnitud): objetivo y tipos de usuario, RF «Debe», nivel de escala, grado de cada integración (el grado D exige diagnóstico aparte) y modelo de infraestructura.

**Brechas críticas abiertas:** la cotización no pasa a `enviada`.

## 5. Entradas (BRIEF)

Diez bloques; cada insumo de E, G y H lleva responsable, espera, épica que bloquea y plan B:
A. Necesidad y negocio · B. RF · C. RNF y nivel de escala (1 Piloto / 2 Crecimiento / 3 Escala) · D. Integraciones (grado A/B/C/D) · E. Accesos y credenciales · F. Infraestructura (del cliente / nube del cliente / provista por la agencia / por definir) · G. TI del cliente y RACI · H. Contenido e identidad (marca, ADN, multimedia con derechos, textos, catálogo, legal, dominio, SEO) · I. Transición (migración, operación en paralelo, capacitación) · J. Restricciones.

**Madurez:** *idea* (menos del 50 % de los RF «Debe» con criterio), *definido* (todos con criterio y escala clara), *especificado* (además RNF medibles e integraciones documentadas). En *idea*, la salida es orden de magnitud y recomiendas un descubrimiento cotizado aparte.

## 6. Estimación

- Solo con el script y `cotizador/factores.json`. Nadie suma ni copia cifras a mano.
- Horas base por capacidad y tamaño: `cotizador/CATALOGO-CAPACIDADES.md`. Factores y rangos: `cotizador/FACTORES.md`.
- **Tres tipos de horas en rango:** IA, PO (incluye aceptación y operación manual) y duración en días hábiles (horas PO sobre su capacidad libre + esperas de las épicas críticas).
- **Oleadas comprometidas e indicativas:** las oleadas hasta `oleada_comprometida` (normalmente la primera entrega) llevan el rango de la madurez; las siguientes, un nivel más ancho, y se recotizan con los datos reales.
- **Capacidad del PO:** usa las horas diarias de `ROSTER.md` menos las comprometidas en proyectos y cotizaciones aprobadas.
- Cada supuesto lleva su impacto en horas o días (por unidad cuando la tarea se repite N veces).
- **Calibración:** en ampliación, primero el factor del propio proyecto; si no, el de la agencia. Dices qué usaste y con cuántos datos.

## 7. Salida (COTIZACION-INTERNA, 15 secciones fijas)

1 Resumen · 2 Entendimiento · 3 Brechas de la especificación · 4 Arquitectura y stack · 5 Épicas (críticas y bloqueantes) · 6 Escenarios (cortados primero por riesgo: el primero, si se puede, no modifica sistemas existentes) · 7 Cronograma · 8 Puntos de recalibración · 9 Decisiones de gestión · 10 Precondiciones del cliente y acciones del PO · 11 Supuestos y exclusiones · 12 Riesgos y contingencia · 13 Costos recurrentes de terceros (sin precio) · 14 Preguntas abiertas (máx. 5) · 15 Validez y siguiente paso. Al final, *Solo interna*: calibración, confianza, objeciones y capacidad.

Etiquetas de evidencia (`ANCLAJE.md`) en todo dato de la interna.

## 8. Guía comercial

`GUIA-COMERCIAL.md` es para el **equipo comercial**; no se envía al cliente. Lenguaje de negocio, **nada técnico ni precio**: necesidad, alcance por entregas, escenarios con sus beneficios, oleadas y duración (comprometida o indicativa), lo que necesitamos del cliente, supuestos, exclusiones, riesgos de negocio, costos de terceros, preguntas en términos de negocio y vigencia. Sus tablas las genera el script. El precio lo define el equipo comercial.

## 9. Aprobación y siembra

Con `cotización COT-NNN aprobada <escenario>`:

| Destino | Recibe |
|---|---|
| `SPEC.md` | Épicas del escenario con `Cotizado (h)` (horas IA, punto medio) y `COT`; `Comprometida` vacía hasta que el PO la fije |
| `ARQUITECTURA.md` | Stack, componentes y *Supuestos y desconocidos* |
| `DECISIONES.md` | Decisiones de arquitectura y gestión como D-x, estado aceptada |
| `TABLERO.md` | T-000 y las precondiciones y acciones del PO como tareas de espera |
| `consejos/` | Consejos de la cotización |

Proyecto nuevo: después de la Fase 0 y `nuevo proyecto`. Ampliación: en el proyecto existente, sin proyecto nuevo. `ESTADO.md` pasa a `aprobada` con el escenario.

## 10. Recalibración

- En la cotización declaras los **puntos de recalibración** (épicas donde se compara cotizado contra real).
- Al cerrar cada uno, comparas horas reales (tablero) contra `Cotizado (h)`. Si la desviación supera `umbral_recalibracion` (25 %), propones `recotizar` para las oleadas indicativas; decide el PO.
- Con cada cotización e implementación cerrada propones en «Propuestas al kit» el ajuste del catálogo con el histórico de todos los proyectos del tablero, hasta que se estabilice. El PO aprueba cada ajuste.

## 11. Anclaje, consejo y gobernanza

- Mínimo 2 objeciones a tu propia estimación antes de entregarla.
- [DESCONOCIDO] en una épica crítica → pregunta; en las demás → supuesto con impacto.
- **Consejo obligatorio** con nivel de escala 3, integración C o D, más de 8 épicas o datos sensibles (financieros, salud o regulados). Datos personales básicos → subagente con la lente AMENAZAS.
- Sin consejo, un subagente revisa la descomposición con la lente COMPLETITUD.
- Sin precios en `cotizaciones/`; sin datos personales reales en ejemplos; nada se copia a `charter` salvo lo sembrado.
- El catálogo, los factores y las plantillas solo cambian con aprobación del PO.
