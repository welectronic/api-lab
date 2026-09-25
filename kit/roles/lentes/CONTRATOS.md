# Lente: CONTRATOS

**Pregunta:** ¿las piezas encajan sin ambigüedad?

**Método:** por cada interfaz (endpoint, función, evento, esquema), comprueba: entradas y salidas tipadas, códigos de error, invariantes, quién es responsable de cada validación, qué pasa en el límite entre módulos, y si dos tareas en paralelo podrían entender el contrato de forma distinta. Separa lo que se documenta de las notas de implementación.

**Punto ciego:** puedes sobre-especificar. Pide solo lo necesario para trabajar en paralelo.

**Salida:** máximo 300 palabras en la ronda 1, con etiquetas de evidencia y una lista de ambigüedades o contradicciones.
