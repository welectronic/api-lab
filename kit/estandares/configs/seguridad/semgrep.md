# Semgrep — conjuntos de reglas por stack

Comando base en CI: `semgrep scan --error --config <conjuntos>`

| Stack | Conjuntos |
|---|---|
| Python / Django | `p/python p/django p/owasp-top-ten p/secrets` |
| Java / Spring | `p/java p/owasp-top-ten p/secrets` |
| TypeScript / React | `p/typescript p/react p/owasp-top-ten p/secrets` |
| Web / Shopify | `p/javascript p/owasp-top-ten p/secrets` |

`--error` hace fallar el pipeline si hay hallazgos. Para excluir un falso positivo, se usa `# nosemgrep: <regla>` con un comentario que explique el motivo; esto se revisa en la revisión de seguridad.
