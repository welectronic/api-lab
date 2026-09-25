---
id: C-00N
tema: <decisión que se diseña, en una línea>
epica: <E1>
disparador: sensible | irreversible | stack | supuestos | pedido_po
estado: abierto | cerrado | escalado_po
ronda: 0 | 1 | 2 | 3 | sintesis
lentes: [COMPLETITUD, CONTRATOS, SIMPLICIDAD, AMENAZAS]
asiento_externo: <ROL que ocupa una lente, o ninguno>
consenso: pendiente | si | no
decision: <D-00N cuando se registre>
fecha: AAAA-MM-DD
inicio: <AAAA-MM-DD HH:MM ±HHMM>
fin: <AAAA-MM-DD HH:MM ±HHMM>
sesiones: 1
---

# C-00N — <tema>

## 0. Planteamiento (LIDER)
- **Problema:** <qué se decide y por qué ahora>
- **Material:** <secciones de SPEC/ARQUITECTURA, archivos del repo, versiones de librerías>
- **Opciones:** <A, B… o "abierto">
- **Supuestos conocidos:** <S-00N de ARQUITECTURA>

## Reformulaciones
| Lente | Reformulación 1 | Reformulación 2 | ¿Mismo problema? |
|---|---|---|---|
| COMPLETITUD | | | sí |

## 1. Análisis a ciegas
### COMPLETITUD
<máx. 300 palabras, con [HECHO: fuente] / [INFERENCIA] / [SUPUESTO] / [DESCONOCIDO]>
### CONTRATOS
### SIMPLICIDAD
### AMENAZAS

## 2. Contrapunto (anónimo: Lente A, B, C…)
### COMPLETITUD
- Objeción 1 a Lente <X>: <falla concreta>
- Objeción 2: …
- Cambio de postura: <no | sí, por la falla …>

## 3. Posturas finales
| Lente | Postura | Confianza | Bloqueante |
|---|---|---|---|
| COMPLETITUD | <una línea> | alta / media / baja | sí / no |

## 4. Síntesis (LIDER)
- **Decisión:** <qué se hace> → `DECISIONES.md` D-00N
- **Compromisos aceptados:** <qué se sacrifica, uno por línea>
- **Revertir si:** <condición observable y medible, con plazo>
- **Preguntas abiertas:** <lo que el consejo no pudo resolver>
- **Disenso:** <postura minoritaria y su mejor argumento, o "ninguno">
- **Supuestos nuevos:** <S-00N agregados a ARQUITECTURA>

## Controles aplicados
<acuerdo >70 % (contrafactual), lente devuelta por repetir, o ninguno>
