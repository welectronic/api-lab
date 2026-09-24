# Arranque: repo existente

Disparador al LIDER: `CHARTER: repo existente <nombre> <ruta local del repo>. Objetivo: <qué se quiere>`

Todas las instancias ya tienen su propio clon del repo. No se vuelve a clonar: el LIDER lee su clon local, y cada tarea indica a los desarrolladores la rama base y la rama que deben crear.

## Fase 0 — Preparación del repo (PO) · puerta obligatoria
El PO completa [PREPARACION-REPO.md](PREPARACION-REPO.md) sobre el repo existente (protecciones, accesos, token del LIDER). En repos existentes es frecuente que la rama base **no** esté protegida: se verifica siempre. **Sin esta confirmación no se sigue.**

## Fase 0b — Levantamiento (LIDER + PO)
1. Crear la **rama huérfana `charter`** en el repo (ver `RAMA-CHARTER.md`) con el contenido de `proyectos/_PLANTILLA/` y la carpeta `kit/`, y llenar `PROYECTO.md`. Registrar el proyecto en `proyectos/INDICE.md` de CHARTER-DEV.
2. Aclarar el objetivo: qué mejorar o agregar, qué **no** se puede romper, restricciones y plazos.
3. Buscar en `soluciones/` conocimiento previo del stack.

## Fase 1 — Diagnóstico (T-001, normalmente SENIOR-2)
Leer un repo completo consume mucho contexto, por eso se delega. T-001 **no modifica código** y llena `DIAGNOSTICO.md` solo con lo que **no es obvio** leyendo el repo:
- Cómo se instala, corre y testea: **comandos probados de verdad**, con su salida.
- Estado real de los tests: cuántos hay, cuántos pasan, qué zonas no tienen cobertura.
- Convenciones observadas que un agente nuevo rompería sin darse cuenta.
- Zonas sensibles: auth, pagos, migraciones, integraciones, código frágil.
- **Seguridad:** resultado real de gitleaks, auditoría de dependencias y SAST sobre el repo, más las vulnerabilidades observadas (autorización faltante, SQL concatenado, secretos, headers). Son hallazgos que no se deben replicar y que pasan al backlog con prioridad.
- Deuda técnica y riesgos, priorizados.
- Dónde encaja el objetivo pedido: puntos de entrada concretos.

No debe incluir árboles de carpetas, listas de dependencias ni resúmenes del código; eso se lee del repo cuando haga falta.

## Fase 2 — Especificación y diseño (LIDER → PO aprueba)
1. Validar el diagnóstico con muestras puntuales del repo.
2. `PRINCIPIOS.md` (los del repo más los nuevos) y `SPEC.md` de lo que se va a agregar o cambiar, con historias, escenarios, requisitos y `[POR ACLARAR]`. Máximo 5 preguntas de aclaración por ronda.
3. `ARQUITECTURA.md` (solo lo que cambia, los contratos nuevos y el modelo de amenazas de los flujos que se tocan), `CONVENCIONES.md` (las del repo, que ganan sobre el estándar; el estándar cubre lo que el repo no define) y `DECISIONES.md`.
4. Si el repo no tiene linter, formateador ni escaneos de seguridad, la primera oleada los agrega sin reformatear todo el código de golpe (solo sobre archivos tocados, o en una tarea aislada aprobada por el PO).
5. Las vulnerabilidades altas o críticas del diagnóstico se presentan al PO como prioridad antes de nuevas funcionalidades.
6. Si no hay tests confiables en las zonas a tocar, la primera oleada crea una **red de seguridad**: tests de caracterización que fijan el comportamiento actual.

**Puerta:** el PO aprueba la spec y el plan de cambios.

## Fase 3 y siguientes
Igual que en proyecto nuevo: backlog por oleadas con análisis de consistencia, y ejecución según [CICLO-DE-TAREA.md](CICLO-DE-TAREA.md). Regla adicional: cada tarea sobre código existente lista los **comportamientos que deben seguir funcionando**.
