# Arranque: proyecto nuevo

Disparador al LIDER: `CHARTER: nuevo proyecto <nombre>. <descripción de la idea>`

## Fase 0 — Preparación del repo (PO) · puerta obligatoria
El PO crea el repo, cada instancia lo clona una vez y el PO completa [PREPARACION-REPO.md](PREPARACION-REPO.md), incluida la prueba de humo. **Sin esta confirmación no se sigue.**

## Fase 0b — Levantamiento (LIDER + PO)
1. Crear la **rama huérfana `charter`** en el repo (ver `RAMA-CHARTER.md`) con el contenido de `proyectos/_PLANTILLA/` y la carpeta `kit/` (ROSTER, metodología, plantillas, `estandares/seguridad.md` y los estándares del stack con sus configs). Registrar el proyecto en `proyectos/INDICE.md` de CHARTER-DEV.
2. Hacer al PO solo las preguntas que cambian el diseño: usuarios, problema, alcance del MVP, restricciones (stack, hosting, presupuesto, plazos), integraciones y datos sensibles.
3. Buscar en `soluciones/` conocimiento previo del stack o dominio.

## Fase 1 — Especificación: el QUÉ (LIDER → PO aprueba)
1. **`PRINCIPIOS.md`**: las reglas del proyecto que no se negocian (seguridad, tests, dependencias, simplicidad).
2. **`SPEC.md`**, sin hablar de tecnología:
   - Historias de usuario priorizadas (P1, P2, P3). Cada una se puede probar y entregar sola; la P1 por sí misma debe ser un MVP viable.
   - Escenarios *Dado / Cuando / Entonces* por historia.
   - Requisitos numerados (`RF-001…`) y criterios de éxito medibles (`CE-001…`).
   - Todo lo incierto marcado como `[POR ACLARAR: …]`.
3. **Aclaración**: máximo 5 preguntas por ronda al PO, solo sobre los `[POR ACLARAR]` que cambian el diseño. Las respuestas se escriben en la spec.

**Puerta:** la spec no tiene `[POR ACLARAR]` pendientes que afecten a P1, y el PO la aprueba.

## Fase 2 — Diseño: el CÓMO (LIDER → PO aprueba)
1. **`ARQUITECTURA.md`**: stack, módulos, modelo de datos, **contratos entre módulos**, **modelo de amenazas ligero** de los flujos sensibles y verificación contra principios (incluyendo cualquier excepción justificada).
2. **`CONVENCIONES.md`**: indicar qué estándares hereda (`estandares/<stack>.md` + `estandares/seguridad.md`) y anotar solo las diferencias.
3. **`DECISIONES.md`**.

**Puerta:** el PO aprueba la arquitectura.

## Fase 3 — Esqueleto (T-000, siempre del LIDER)
- Repo con estructura, `.env.example`, `.gitignore` y README con cómo correrlo.
- **Calidad automatizada:** las configuraciones de `estandares/configs/<stack>/` (linter, formateador, tipos, tests) y hooks de pre-commit activos.
- **Seguridad automatizada:** gitleaks, auditoría de dependencias y SAST (`estandares/configs/seguridad/`), en pre-commit y CI.
- **Headers de seguridad y configuración segura por defecto** del framework, con un test que los verifica.
- **Módulo de referencia** completo, según la sección del estándar del stack. Es el patrón que citarán las tareas.
- Se llenan los *Comandos de verificación* en `PROYECTO.md` (calidad + seguridad + tests).

**Puerta:** el PO hace merge de T-000.

## Fase 4 — Backlog por oleadas (LIDER)
1. Dividir las historias en tareas S/M con rol, tipo de valor y trazabilidad (`historia: US1`, `requisitos: RF-001`).
2. Agruparlas en oleadas sin archivos compartidos. Orden: desbloqueantes → P1 → P2 …
3. **Análisis de consistencia** antes de liberar la oleada:
   - Cada requisito tiene al menos una tarea, y cada tarea apunta a un requisito o es desbloqueante.
   - No hay contradicciones entre spec, arquitectura y tareas.
   - Tareas que comparten archivos tienen orden de dependencia.
   - Cada criterio verificable por comando tiene su "falla cuando".
   - Cada tarea irreversible tiene punto de restauración.
4. Crear `tareas/T-XXX.md` solo para la próxima oleada. Actualizar `TABLERO.md` y entregar al PO los prompts de activación.

## Fase 5 — Ejecución
Según [CICLO-DE-TAREA.md](CICLO-DE-TAREA.md). Al cerrar cada oleada: actualizar `PLAN.md` y `BITACORA.md`, documentar en `soluciones/` lo aprendido y detallar la siguiente oleada.
