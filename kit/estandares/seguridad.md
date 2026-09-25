# Estándar transversal: Seguridad

**Aplica a todos los proyectos y stacks, siempre.** Un código funcional con una vulnerabilidad no está terminado: se rechaza.

Referencias: OWASP Top 10 (edición vigente) y OWASP ASVS, nivel 2 por defecto (nivel 3 si el proyecto maneja pagos, salud o datos personales sensibles; se decide en `PRINCIPIOS.md`).

## 1. Seguridad por proceso

### Clasificación de cada tarea
Cada tarea declara `seguridad: normal | sensible`. Es **sensible** si toca:
- autenticación, sesiones, permisos o roles;
- datos personales, pagos o secretos;
- entrada de usuario que llega a la BD, al sistema de archivos, a comandos, a HTML o a URLs;
- subida de archivos, webhooks o integraciones externas;
- configuración de infraestructura, CORS, headers o despliegue.

Las tareas **sensibles**:
- las desarrolla el LIDER o un SENIOR, nunca RAPIDO;
- listan en sus criterios de aceptación los **casos de abuso** que deben fallar (ej. "un usuario sin rol admin recibe 403 en `DELETE /x`"), con su test;
- siempre pasan por la revisión de seguridad del LIDER (sección 4), aunque tengan pre-revisión.

### Modelo de amenazas ligero (en `ARQUITECTURA.md`)
Por cada flujo sensible: qué activos protege, quién podría atacarlo, por dónde entra (superficie) y qué control lo mitiga. Una tabla de pocas filas basta; lo que importa es que exista antes del código.

## 2. Seguridad automatizada (T-000, obligatoria)

| Control | Herramienta sugerida | Cuándo corre |
|---|---|---|
| Secretos en el código | **gitleaks** | pre-commit + CI |
| Dependencias vulnerables | `pip-audit` · `npm audit` · **OSV-Scanner** · OWASP Dependency-Check (Java) | CI + antes de cada entrega que agregue dependencias |
| Análisis estático (SAST) | **Semgrep** (reglas OWASP del stack) · Bandit (Python) · SpotBugs + FindSecBugs (Java) | CI |
| Headers y configuración HTTP | test automatizado que verifica los headers (sección 3) | tests |

**CI listo para usar:** `configs/ci/charter-ci.yml` (GitHub Actions) corre en cada PR la guardia de ramas, gitleaks sobre los commits del PR, Semgrep sobre lo que cambia, las pruebas del stack (Node, Python o Java, según lo que detecte) y la auditoría de dependencias como informativa. Se instala en T-000 y el PO lo marca como check obligatorio.

Configuración base: `configs/seguridad/`. Los comandos se agregan a *Comandos de verificación* en `PROYECTO.md`; **un hallazgo alto o crítico bloquea la entrega**.

## 3. Reglas técnicas mínimas

**Entrada y salida**
- Toda entrada externa se valida con una lista de lo permitido (tipo, longitud, formato) en el borde.
- Consultas siempre parametrizadas u ORM. Nunca concatenar SQL, comandos de shell ni rutas de archivo con datos del usuario.
- La salida se escapa según el contexto (HTML, atributo, JS, URL). Los frameworks escapan por defecto: no desactivarlo (`|safe`, `dangerouslySetInnerHTML`, `th:utext`, `| raw`) sin sanitizar.

**Autenticación y autorización**
- Se usan los mecanismos del framework; nunca criptografía ni autenticación caseras.
- Contraseñas con Argon2id o bcrypt. Sesiones con cookies `HttpOnly`, `Secure` y `SameSite`.
- **Autorización en el servidor, en cada endpoint y sobre cada objeto** (el usuario puede ver *ese* registro, no solo el tipo de registro). Denegar por defecto.
- Límite de intentos (rate limiting) en login, recuperación de contraseña y endpoints costosos.

**Secretos y datos**
- Secretos solo por variables de entorno o un gestor de secretos. `.env` en `.gitignore`; en el repo solo `.env.example`.
- Nunca registrar en logs contraseñas, tokens, datos de tarjetas ni datos personales completos.
- Datos personales: solo los necesarios, cifrados en tránsito (TLS) y, si son sensibles, en reposo.
- Fixtures y datos de prueba siempre ficticios. **Nunca datos reales de clientes en el repo ni en los prompts a las IA.**

**HTTP**
- Headers: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` y protección de framing (`frame-ancestors`).
- CORS con una lista explícita de orígenes; nunca `*` con credenciales.
- Protección CSRF activa en formularios con sesión.
- Los errores no exponen trazas, versiones ni rutas internas al usuario.

**Archivos**
- Subidas: validar tipo por contenido (no por extensión), limitar tamaño, renombrar, guardar fuera de la raíz web y servir con `Content-Disposition` adecuado.

**Dependencias**
- Solo paquetes mantenidos, con versión fijada (lockfile en el repo).

- **Manejo de errores completo:** el contrato del manejador enumera todos los errores que emite el framework y sus librerías (parsers de body, validación, autenticación, rutas inexistentes, errores no controlados). Ninguno puede llegar al manejador por defecto del framework, que suele responder con stack trace o rutas internas. Se prueba con un caso de abuso por tipo de error.

## 4. Riesgos específicos de código generado por IA

| Riesgo | Control |
|---|---|
| **Paquetes inventados o suplantados** (la IA sugiere un nombre que no existe o que es malicioso) | Toda dependencia nueva requiere autorización en la tarea. El revisor verifica que el paquete exista en el registro oficial, sea el correcto y esté mantenido |
| Código "que funciona" pero omite la autorización | Casos de abuso obligatorios en las tareas sensibles, con tests |
| Validación solo en el frontend | La revisión exige validación en el servidor |
| Secretos pegados en prompts o en archivos de coordinación | Prohibido. Los documentos de CHARTER-DEV nunca contienen credenciales, ni siquiera de prueba |
| Desactivar controles para "hacer pasar" un test (CSRF off, `verify=False`, CORS `*`) | Rechazo automático en revisión |
| Copiar patrones inseguros del código existente | En repos existentes, el diagnóstico lista las vulnerabilidades encontradas; no se replican |

## 5. Revisión de seguridad (LIDER, en toda tarea sensible)

- [ ] Casos de abuso con test, y fallan como se espera
- [ ] Autorización en servidor, por objeto
- [ ] Entrada validada y salida escapada
- [ ] Sin secretos, datos reales ni logs con datos sensibles
- [ ] Escaneos (secretos, dependencias, SAST) sin hallazgos altos o críticos
- [ ] Dependencias nuevas verificadas en el registro oficial
- [ ] Ningún control de seguridad desactivado
- [ ] Coherente con el modelo de amenazas

Una vulnerabilidad verificada es siempre severidad **alta** con destino **corregir**: nunca se difiere sin aprobación explícita del PO registrada en `DECISIONES.md`.

## 6. Antes de producción

- Revisión del modelo de amenazas completo contra lo construido.
- Escaneo completo de dependencias y SAST sobre la rama base.
- Si el proyecto lo justifica (pagos, datos sensibles, exposición pública amplia), recomendar una prueba de penetración externa. La revisión de una IA no la reemplaza.
