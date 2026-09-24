---
tarea: T-XXX
ronda: 1
autor: <TU-ID>
herramienta_modelo: <ej. Antigravity / Gemini 3.1 Pro (High)>
estado: listo_para_revision | bloqueada
rama: chr/T-XXX-<slug>
commit: <hash corto del último commit>
fecha: AAAA-MM-DD
inicio: <AAAA-MM-DD HH:MM, al empezar (hora real del sistema)>
fin: <AAAA-MM-DD HH:MM, al terminar>
sesiones: 1
---

# Reporte T-XXX — ronda N

## Qué hice
- <resumen por punto>

## Archivos tocados
- `<ruta>` — <creado/modificado y por qué>

## Evidencia de verificación (corrida DESPUÉS del último cambio)
> Si la tarea es `correctivo`: pega primero la salida del test de regresión **fallando antes del arreglo** y luego pasando.

```
$ <comando lint>
<salida real, al menos las líneas de resumen y código de salida>

$ <comandos de seguridad: gitleaks, auditoría de dependencias, SAST>
<salida real>

$ <comando tests>
<salida real: totales, fallos, omitidos>
```

## Criterios de aceptación
| # | Cumple | Evidencia |
|---|---|---|
| 1 | sí / no | <comando + línea de salida, o descripción de la prueba punta a punta> |

## Decisiones que tomé
- <decisión menor dentro del alcance + razón>

## [POR ACLARAR] / bloqueos / propuestas
- <duda + opciones A/B>

## Propuestas al kit (opcional; no las apliques tú)
- <cambio sugerido a la metodología, las skills o las plantillas>

## Propuesta de solución documentable (opcional)
<problema no obvio que resolví y que conviene guardar en soluciones/>

## Respuesta a la revisión anterior (ronda ≥ 2)
1. <cambio solicitado #1> → <qué hice>
