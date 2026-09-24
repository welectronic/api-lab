# Estándares base por stack

Decisiones reutilizables entre proyectos. **No** son un curso de buenas prácticas: los modelos ya saben escribir buen código. Aquí van solo las elecciones donde existen varias opciones válidas y queremos que todas las instancias elijan lo mismo.

## Cómo se usan

1. En la Fase 2 (diseño), el LIDER indica en `CONVENCIONES.md` del proyecto qué estándar hereda: `Hereda: estandares/<stack>.md`.
2. `CONVENCIONES.md` solo anota las **diferencias** con el estándar (y, en repos existentes, las convenciones propias del repo, que siempre ganan).
3. En T-000, el LIDER copia al repo las configuraciones de `configs/<stack>/`, activa los hooks de pre-commit y escribe el **módulo de referencia** que describe cada estándar.
4. Las tareas citan ese módulo: "sigue el patrón de `<ruta>`".

## Jerarquía (si hay conflicto, gana la de arriba)

1. `PRINCIPIOS.md` del proyecto
2. Convenciones ya existentes en el repo (solo repos existentes)
3. `CONVENCIONES.md` del proyecto
4. Este estándar
5. Criterio del modelo

## Estándares disponibles

| Stack | Archivo | Configuraciones |
|---|---|---|
| Python / Django | [python-django.md](python-django.md) | `configs/python-django/` |
| Java / Spring Boot | [java-spring-boot.md](java-spring-boot.md) | `configs/java-spring-boot/` |
| TypeScript / React | [typescript-react.md](typescript-react.md) | `configs/typescript-react/` |
| Web: HTML semántico, CSS, JS sin framework | [web-html-css.md](web-html-css.md) | `configs/web-html-css/` |
| Shopify (temas y apps) | [shopify.md](shopify.md) | `configs/shopify/` |
| n8n (automatizaciones) | [n8n.md](n8n.md) | `configs/n8n/` (verificador sin dependencias) |
| **Seguridad (transversal, obligatorio)** | [seguridad.md](seguridad.md) | `configs/seguridad/` |

Un proyecto puede heredar varios (ej. Django + TypeScript/React, o Shopify + Web).

## Mantenimiento

- Si una decisión se repite en 2 proyectos, sube de `CONVENCIONES.md` al estándar.
- Versiones: se usa la LTS o estable vigente al crear el proyecto y se fija en `PROYECTO.md`. Los estándares no fijan versiones.
