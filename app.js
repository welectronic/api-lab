const express = require('express');
const app = express();
const mongoRoutes = require('./routes/mongoRoutes');
const sqliteRoutes = require('./routes/sqliteRoutes');
const healthRoutes = require('./routes/healthRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', mongoRoutes);
app.use('/api', sqliteRoutes);
app.use('/api', healthRoutes);

module.exports = app;
