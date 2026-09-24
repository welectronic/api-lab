---
id: T-XXX
titulo: <verbo + objeto>
asignado: LIDER | SENIOR-1 | SENIOR-2 | RAPIDO
prerevisor: <ID distinto al autor, o ninguno>
talla: S | M
tipo_valor: desbloqueante | nucleo | robustez | pulido | especulativo
tipo: evolutivo | correctivo | ajuste
severidad: <solo correctivo: critica | alta | media | baja>
urgente: no | si
reportado_por: <solo correctivo/ajuste: rol o área, sin datos personales>
causado_por: <solo correctivo, si se sabe: T-XXX que introdujo el fallo>
epica: <E1>
historia: <US1>
requisitos: [RF-001]
oleada: 1
estado: pendiente
rama: chr/T-XXX-<slug>
rama_origen: <rama base o rama de la dependencia>
depende_de: []
irreversible: no | si
seguridad: normal | sensible
creada: AAAA-MM-DD
liberada: <AAAA-MM-DD, cuando pasa a en_progreso>
integrada: <AAAA-MM-DD, cuando el PO confirma el merge>
esfuerzo_po_horas: <horas del PO en esta tarea (revisar, probar, integrar); lo anota el LIDER>
---

# T-XXX — <título>

## Objetivo
<Una o dos frases: qué debe existir o funcionar al terminar.>

## Contexto (leer solo esto)
- `SPEC.md` → <historia / requisitos>
- `ARQUITECTURA.md` → §<sección>
- `CONVENCIONES.md`
- Estándar: `estandares/<stack>.md` (+ `estandares/seguridad.md` si es sensible)
- **Patrón de referencia a seguir:** `<ruta del módulo de referencia en el repo>`
- Soluciones previas: <resumen copiado por el LIDER desde CHARTER-DEV/soluciones, si aplica>
- Archivos del repo de referencia (solo lectura): `<ruta>`

## Archivos permitidos
- Crear/modificar: `<ruta o carpeta>`
- **No tocar:** `<rutas sensibles>`

## Contrato a respetar
```
<firma / endpoint + request/response / esquema>
```

## Criterios de aceptación
| # | Criterio | Cómo se verifica | Falla cuando |
|---|---|---|---|
| 1 | <verificable> (en `correctivo`: test de regresión que reproduce el bug) | `<comando o prueba>` | <resultado observable que indica falla> |
| 2 | Tests nuevos para <casos> | `<comando>` | <…> |
| 3 | Siguen funcionando: <comportamientos existentes> | `<comando>` | <…> |

## Casos de abuso (obligatorio si seguridad: sensible)
| # | Intento malicioso o no autorizado | Resultado esperado | Test |
|---|---|---|---|
| A1 | <ej. usuario sin rol admin llama DELETE /x> | <403, sin cambios en BD> | `<test>` |

## Punto de restauración (solo si irreversible: si)
<commit/tag, respaldo, feature flag o snapshot que permite deshacer>

## Fuera de alcance
- <lo que NO se hace aunque parezca relacionado>

## Notas del LIDER
<decisiones ya tomadas, tropiezos conocidos, riesgos>
