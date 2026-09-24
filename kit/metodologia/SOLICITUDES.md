# Cómo el PO pide trabajo al LIDER

El PO nunca instruye a los desarrolladores. Pide el trabajo al LIDER, y el LIDER lo convierte en tarjetas de tarea. El desarrollador solo recibe `CHARTER: <proyecto> <ROL> T-XXX` y lee su tarjeta.

Hay cuatro formas de pedir: A y B para trabajo nuevo, C y D para lo que reportan los usuarios.

## A. Requerimiento (el LIDER define las tareas)

```
CHARTER: <proyecto> requerimiento: <qué necesitas y por qué, en lenguaje de negocio>
```

1. **Especificar:** el LIDER actualiza `SPEC.md` con historias, criterios y lo que queda fuera de alcance, y hace **máximo 5 preguntas**, solo las que cambian el diseño.
2. **Aprobar:** el PO responde y aprueba.
3. **Diseñar y dividir:** contratos en `ARQUITECTURA.md` y tareas S/M sin archivos compartidos, asignadas según `ROLES.md`, con la seguridad clasificada.
4. **Entregar:** tarjetas en `tareas/`, `TABLERO.md` actualizado y los comandos de activación.

## B. Tareas dictadas (el PO define las tareas)

```
CHARTER: <proyecto> tareas: <N>
```

1. El LIDER responde en una línea: "Listo para la tarea 1 de N".
2. **El PO dicta cada tarea en un mensaje:** qué debe hacer y, si quiere, a quién asignarla y qué archivos tocar.
3. **Por cada tarea, el LIDER confirma que la entendió**, en máximo 4 líneas:
   - Lo que entendió, en una frase.
   - Archivos que tocaría.
   - Seguridad `normal` o `sensible`.
   - Hasta 3 preguntas, solo si algo es ambiguo.

   Todavía no crea tarjetas. Si hay preguntas, espera la respuesta. Si no, pide la siguiente: "Listo para la tarea 2 de N".
4. **Cuando tiene las N tareas**, el LIDER valida el conjunto:
   - Que no compartan archivos. Si chocan, propone repartirlos o encadenar las tareas con `depende_de`.
   - Que los contratos entre tareas estén definidos.
   - Que cada una tenga un rol asignado (el que pidió el PO, o uno según `ROLES.md`) y un pre-revisor si es M o `sensible`.
   - Que las tareas sensibles tengan casos de abuso.
5. **Entrega en una sola respuesta:**
   - Una tabla corta: tarea, título, rol, seguridad y dependencias.
   - Las alertas, si las hay; por ejemplo, un choque de archivos que resolvió.
   - *Para el PO ahora*: los comandos de activación de cada desarrollador y el orden de integración.
6. El LIDER crea las tarjetas en `tareas/`, actualiza el tablero, hace push a `charter` y libera la oleada.

El PO puede escribir `listo` antes de completar las N para cerrar con las que ya dictó, o `cancelar` para descartar todo.

## C. Bug reportado por un usuario

Los usuarios le cuentan al PO, y el PO se lo pasa al LIDER tal como lo oyó:

```
CHARTER: <proyecto> bug: <qué pasa, dónde, a quién o a qué área le pasa>
```

1. **Confirmar**, en máximo 4 líneas:
   - Lo que entendió, en una frase.
   - Severidad propuesta (tabla abajo) y archivos probables.
   - Seguridad `normal` o `sensible`.
   - Solo si faltan, las preguntas para reproducirlo: dónde (pantalla, URL o endpoint), qué hizo el usuario, qué esperaba y qué vio, desde cuándo.
2. **Reproducir antes de liberar:** el LIDER busca la causa en el código (o delega el diagnóstico). Si no logra reproducirlo, lo dice y pide más datos; no crea una tarea a ciegas.
3. **Crear la tarjeta** con `tipo: correctivo`, `severidad`, `reportado_por` (rol o área, sin datos personales) y, si la identifica, `causado_por: T-XXX` (la tarea integrada que introdujo el fallo). Rama `chr/T-XXX-fix-<slug>`.
   - **Criterio 1 obligatorio:** un test de regresión que reproduce el bug. Falla antes del arreglo y pasa después; el reporte trae ambas salidas.
4. **Encolar según la severidad:**

| Severidad | Cuándo | Cola |
|---|---|---|
| crítica | Sistema caído, pérdida o exposición de datos, vulnerabilidad | `urgente: si`: carril urgente (PROTOCOLO §12). Si es de seguridad: `sensible`, nunca RAPIDO, y revisión de seguridad del LIDER |
| alta | Una función principal falla y no hay alternativa | Primera de la columna Lista |
| media | Falla con alternativa o afecta a pocos | Lista, en el orden que decida el PO |
| baja | Cosmético o raro | Lista, al final |

5. Responde con la tabla corta, el lugar en la cola y el comando de activación si es urgente.

Varios bugs en un mensaje: una línea `bug:` por cada uno; el LIDER confirma todos juntos.

## D. Ajuste pedido por un usuario

```
CHARTER: <proyecto> ajuste: <qué pide el usuario y para qué>
```

Un ajuste cambia lo que el sistema debe hacer, así que pasa primero por la spec:

1. **Clasificar**, en máximo 4 líneas:
   - Qué historia afecta, o si es una historia nueva.
   - Qué cambia en sus criterios de aceptación.
   - Talla estimada y seguridad.
   - Hasta 3 preguntas.
2. **Aprobar:** el PO responde `sí` o corrige. Si el ajuste es grande (más de 2 tareas M) o cambia contratos, el LIDER propone tratarlo como un **requerimiento** (flujo A).
3. **Aplicar:** actualiza `SPEC.md` (historia existente o nueva `### USn`) y registra el cambio según `GESTION-DE-CAMBIOS.md`.
4. **Crear la tarjeta** con `tipo: ajuste` y `reportado_por`, y la encola en Lista según la prioridad que diga el PO.

## Cierre con el usuario

Cuando el PO escribe `integré …`, el LIDER agrega en *Para el PO ahora* a quién avisar: el `reportado_por` de cada tarea `correctivo` o `ajuste` integrada. Avisar al usuario lo hace el PO; ninguna IA le escribe.
