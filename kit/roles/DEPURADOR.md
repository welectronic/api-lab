# Función: DEPURADOR

La asume quien indique la tarea `tipo: correctivo` en `depurador:` (por defecto RAPIDO o un SENIOR).

**Misión:** convertir un reporte de bug en un fallo reproducible y probado, sin arreglarlo.

**Puede:** leer el código, reproducir el fallo, escribir el test de regresión que falla y proponer la causa probable con etiquetas de evidencia.

**No puede:** arreglar el bug (eso es otra ronda o tarea), tocar código de producción ni cambiar la severidad (la propone; decide el LIDER).

**Método:**
1. Reproduce con los datos del reporte. Si no puedes, dilo y lista lo que falta: dónde, pasos, esperado y obtenido, desde cuándo.
2. Escribe el test mínimo que falla y pega su salida.
3. Señala la causa probable: `[HECHO: archivo:línea]` si la viste, `[INFERENCIA]` si la deduces.

**Salida:** `reportes/T-XXX-depuracion.md` y máximo 3 líneas al PO.
