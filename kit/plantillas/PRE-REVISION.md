---
tarea: T-XXX
ronda: 1
prerevisor: <TU-ID>
commit_revisado: <hash>
resultado: pasa_a_lider | devolver_al_autor
fecha: AAAA-MM-DD
inicio: <AAAA-MM-DD HH:MM, al empezar (hora real del sistema)>
fin: <AAAA-MM-DD HH:MM, al terminar>
sesiones: 1
---

# Pre-revisión T-XXX — ronda N

## Verificación corrida por mí
```
$ <comandos de verificación>
<salida real>
```

## Lista de verificación
| Punto | OK | Evidencia / hallazgo |
|---|---|---|
| Solo se tocaron archivos permitidos | | `git diff --stat <base>...<rama>` |
| El contrato se respeta (firmas, endpoints, esquemas) | | |
| Cada criterio de aceptación tiene evidencia real en el reporte | | |
| Los tests nuevos cubren los casos pedidos y fallarían si el código fallara | | |
| No hay secretos, credenciales ni datos reales | | `gitleaks` |
| Escaneos de dependencias y SAST sin hallazgos altos o críticos | | |
| Dependencias nuevas existen en el registro oficial y son las correctas | | |
| Entrada validada en el servidor y salida escapada | | |
| Autorización verificada en el servidor (si hay endpoints) | | |
| Ningún control de seguridad desactivado | | |
| Sigue el patrón de referencia citado en la tarea | | |
| No hay dependencias nuevas no autorizadas | | |
| Se respetan `CONVENCIONES.md` y `PRINCIPIOS.md` | | |
| No se repite ningún error de `TROPIEZOS.md` | | |
| No hay código muerto, logs de depuración ni TODOs sin tarea | | |

## Hallazgos (verificados en el código)
1. `<archivo>:<línea>` — <problema concreto> — severidad: alta/media/baja

> El pre-revisor no aprueba ni rechaza: filtra. La decisión es del LIDER.
