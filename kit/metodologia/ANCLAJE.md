# Anclaje: evidencia, reformulación y disenso

Reglas para reducir alucinaciones y trabajo fuera del rol. Aplican a todas las instancias.

## 1. Etiquetas de evidencia

Toda afirmación sobre el código existente, una librería, un servicio externo o el negocio lleva una etiqueta:

| Etiqueta | Significa | Ejemplo |
|---|---|---|
| `[HECHO: <fuente>]` | Verificado ahora, con la fuente: archivo y línea, comando y salida, o documentación oficial con versión | `[HECHO: node_modules/body-parser/lib/read.js:62]` |
| `[INFERENCIA]` | Se deduce de hechos, pero no se observó | |
| `[SUPUESTO]` | Se necesita para avanzar y no está verificado | "body-parser solo emite 400 y 413" |
| `[DESCONOCIDO]` | Falta información que podría cambiar la decisión | |

**Dónde es obligatoria:** contratos y modelo de amenazas en `ARQUITECTURA.md`, `DECISIONES.md`, consejos de diseño, hallazgos de revisión y pre-revisión, y la sección *Decisiones que tomé* de los reportes.

**Reglas:**
- Un **contrato no se libera** si depende de un `[SUPUESTO]` o un `[DESCONOCIDO]` sobre el comportamiento de una librería, del código existente o de un servicio. Primero se verifica (pasa a `[HECHO]`) o se registra en *Supuestos y desconocidos* de `ARQUITECTURA.md` con quién lo verifica y qué tareas afecta.
- Sobre el comportamiento de una librería, `[HECHO]` exige leer su código o su documentación **de la versión instalada**. La memoria del modelo no es fuente.
- Si no puedes verificar algo, dilo con la etiqueta. Nunca lo presentes como hecho.

## 2. Reformular antes de actuar

- **LIDER**, ante un requerimiento o una tarea dictada: lo reformula de dos maneras distintas (lo que pide el negocio y lo que debe hacer el sistema). Si las dos no coinciden, pregunta.
- **Desarrollador**, antes de escribir código: llena *Entendimiento* en su reporte con tres líneas: qué va a lograr, qué archivos tocará y qué queda fuera. Si no coincide con la tarjeta (otros archivos, otro alcance), se detiene y reporta `bloqueada`.

## 3. Disenso obligatorio en quien revisa

El pre-revisor, el probador y cada lente del consejo de diseño entregan **al menos 2 objeciones concretas**, o declaran qué verificaron para no encontrarlas. Solo cambian de postura si alguien señala una falla específica en su razonamiento, no por acuerdo mayoritario.

## 4. Familias de modelos opuestas

Quien critica o prueba el trabajo de otro debería usar otra familia de modelo (Claude frente a Gemini), según la columna *Familia* de `ROSTER.md`. Dos instancias del mismo modelo tienden a cometer los mismos errores.

## 5. Límites de rol

Cada instancia lee su tarjeta en `roles/` (en la rama `charter`, `kit/roles/`). Lo que la tarjeta dice que **no** puede hacer no se hace, aunque parezca útil: se escala al LIDER o al PO.
