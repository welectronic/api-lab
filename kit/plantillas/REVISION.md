---
tarea: T-XXX
ronda: 1
revisor: LIDER
commit_revisado: <hash>
veredicto: APROBADA | CAMBIOS_SOLICITADOS | REASIGNADA
fecha: AAAA-MM-DD
---

# Revisión T-XXX — ronda N

## Veredicto: <APROBADA / CAMBIOS SOLICITADOS / REASIGNADA>

## Verificación
- Tests (corridos por el LIDER): <resultado>
- Archivos fuera de lo permitido: <ninguno / lista>
- Contrato y principios respetados: <sí / no: detalle>
- Pre-revisión: <resultado / no aplica>

## Seguridad (obligatorio si la tarea es sensible)
- [ ] Casos de abuso con test, y fallan como se espera
- [ ] Autorización en servidor, por objeto
- [ ] Entrada validada y salida escapada
- [ ] Sin secretos, datos reales ni logs con datos sensibles
- [ ] Escaneos (secretos, dependencias, SAST) sin hallazgos altos o críticos
- [ ] Dependencias nuevas verificadas en el registro oficial
- [ ] Ningún control de seguridad desactivado
- [ ] Coherente con el modelo de amenazas

> Una vulnerabilidad verificada es siempre severidad alta con destino corregir.

## Hallazgos tras triage
| # | Ubicación | Hallazgo | Severidad | Destino |
|---|---|---|---|---|
| 1 | `<archivo>:<línea>` | <problema verificado> | alta/media/baja | corregir / decision_PO / diferir |

### Cambios obligatorios (destino: corregir)
1. <qué cambiar y por qué>

### Decisiones para el PO (destino: decision_PO)
- <pregunta + opciones>

### Diferidos al backlog
- <hallazgo> → <anotado en PLAN.md backlog>

### Descartados
- <hallazgo de la pre-revisión que resultó falso + por qué>

## Aprendizajes
- Nuevo tropiezo: <sí: agregado a TROPIEZOS.md / no>
- Solución documentable: <sí: soluciones/<archivo>.md / no>

## Para el PO (solo si APROBADA)
- Rama `chr/T-XXX-<slug>` → merge a `<rama base>`
- Notas de integración: <orden de merge, migraciones, conflictos esperados>
