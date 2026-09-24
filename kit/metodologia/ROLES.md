# Roles y asignación de trabajo

Qué instancia y qué modelo ocupa cada rol: `ROSTER.md`.

## Principio

La asignación se decide por **riesgo y ambigüedad**, no por tamaño. Lo ambiguo o crítico lo hace el LIDER, lo bien especificado se delega y lo mecánico va al rol más rápido.

## Matriz de asignación

| Tipo de tarea | Rol |
|---|---|
| Spec, principios, arquitectura, contratos, esqueleto inicial (T-000) | LIDER |
| Seguridad, autenticación, permisos, pagos, migraciones delicadas | LIDER |
| Cualquier tarea con `seguridad: sensible` (ver `estandares/seguridad.md`) | LIDER o SENIOR, **nunca RAPIDO** |
| Integraciones con terceros poco documentadas | LIDER o SENIOR-2 |
| Módulo backend con contrato claro, lógica de negocio, servicios | SENIOR-1 |
| Feature completa de frontend, pantallas con varios componentes | SENIOR-2 |
| Diagnóstico de repo existente (lectura extensa) | SENIOR-2 |
| Componentes aislados, formularios, CRUD repetitivo | RAPIDO |
| Tests unitarios, fixtures, datos de prueba | RAPIDO |
| Documentación, refactors mecánicos | RAPIDO |
| Pre-revisión con lista de verificación | RAPIDO (o un SENIOR distinto al autor) |

## Reparto orientativo

- LIDER: 20–30 % del código (lo crítico) + toda la planeación y revisión.
- SENIOR-1: 20–30 %.
- SENIOR-2 + RAPIDO: 40–60 %.

## Tipo de valor (para priorizar y recortar)

Cada tarea declara su tipo de valor:

| Tipo | Definición |
|---|---|
| `desbloqueante` | Habilita otras tareas (contratos, esqueleto, modelo de datos) |
| `nucleo` | Entrega directamente una historia de la spec |
| `robustez` | Hace más sólido algo existente (errores, bordes) |
| `pulido` | Mejora sin cambiar comportamiento (nombres, docs) |
| `especulativo` | Prepara para necesidades hipotéticas |

Ver recorte en [GESTION-DE-CAMBIOS.md](GESTION-DE-CAMBIOS.md).

## Tamaño

| Talla | Guía | Asignable a |
|---|---|---|
| S | ≤ 3 archivos, ≤ 150 líneas | Cualquiera |
| M | ≤ 10 archivos, ≤ 400 líneas | LIDER, SENIOR-1, SENIOR-2 |
| L | Mayor | **Se divide** antes de asignarse |

## Cuotas

- La cuota del LIDER se gasta en planear y revisar, no en código repetitivo.
- Las instancias con límites de uso bajos (ver `ROSTER.md`) reciben solo tareas S/M.
- La pre-revisión la hace un rol de bajo costo para que el LIDER revise menos.
