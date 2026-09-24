const express = require('express');
const app = express();
const mongoRoutes = require('./routes/mongoRoutes');
const sqliteRoutes = require('./routes/sqliteRoutes');
const healthRoutes = require('./routes/healthRoutes');

// No anunciar la tecnología del servidor
app.disable('x-powered-by');

// Headers de protección en toda respuesta (antes de los parsers, para que 400/413 también los lleven)
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
  });
  next();
});

// Middlewares
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Rutas
app.use('/api', mongoRoutes);
app.use('/api', sqliteRoutes);
app.use('/api', healthRoutes);

// Ruta inexistente: 404 genérico, sin reflejar la ruta pedida
app.use((req, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

// Errores de body: cuerpo fijo, sin stack ni err.message. El resto sigue su camino (E3)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON malformado' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Cuerpo demasiado grande' });
  }
  next(err);
});

module.exports = app;
