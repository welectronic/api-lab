# Verificación — ninguna afirmación sin evidencia fresca

**Regla de hierro:** no se afirma que algo está hecho, funciona o pasa los tests sin evidencia **fresca**: producida por un comando que corriste **después del último cambio**, en esta sesión, y cuya salida leíste completa.

## Procedimiento antes de cada afirmación

1. **Identifica la afirmación** exacta que vas a hacer ("la suite completa pasa").
2. **Nombra la prueba**: qué comando la demuestra y cómo se vería si fallara.
3. **Córrela** ahora, sobre el código que vas a entregar.
4. **Lee toda la salida**: código de salida, totales, omitidos, advertencias. Un resumen verde encima de una sección roja es una falla.
5. **Afirma citando la evidencia**: el comando y las líneas de salida que lo prueban. Si no lo prueba, di qué muestra y detente.

Si no puedes completar un paso, **no afirmas**: reportas la brecha ("no verificado: no hay comando que reproduzca el error").

## Qué cuenta y qué no

| Afirmación | Requiere | No basta |
|---|---|---|
| Los tests pasan | Suite completa después del último cambio, con código de salida y totales | Correr solo los tests nuevos; una corrida anterior al último cambio |
| Error corregido | El test que reproduce el error falla sin el arreglo y pasa con él | Que el síntoma no aparezca una vez |
| Funcionalidad lista | Probarla de punta a punta por su entrada real (endpoint, pantalla) y citar la salida | Solo tests unitarios; leer el código |
| Migración aplicada | Consultar el esquema o los datos después, y probar el rollback en una copia | Que el archivo exista; que el comando termine sin error |
| Refactor sin cambios de comportamiento | Tests previos intactos y en verde; el diff muestra solo lo intencionado | "La lógica es equivalente" |
| Lint limpio | Linter sobre los archivos tocados, cero hallazgos citados | "El editor no marca nada" |
| Documentación correcta | Cada comando documentado ejecutado tal cual; cada nombre buscado en el código | Releer el texto |

## Tareas sin tests (docs, análisis, configuración)

Usa la prueba más fuerte disponible: ejecutar lo documentado, cargar la configuración con su parser real, buscar en el código cada nombre o ruta que el documento afirma, o seguir los pasos en un clon limpio.

## Señales de alerta

Detente y aplica el procedimiento si vas a escribir: "debería funcionar", "debería pasar", "se ve correcto", "no hubo errores" (sin la salida), o si vas a copiar el resultado de otra instancia sin correrlo tú.
