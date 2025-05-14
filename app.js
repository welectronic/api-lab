const express = require('express');
const app = express();
const mongoRoutes = require('./routes/mongoRoutes');
const sqliteRoutes = require('./routes/sqliteRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', mongoRoutes);
app.use('/api', sqliteRoutes);

module.exports = app;
