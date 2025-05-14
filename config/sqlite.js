const { Sequelize } = require('sequelize');
const path = require('path');

// Ruta al archivo de base de datos SQLite (se guarda en la raíz del proyecto)
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Crear instancia de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false // Cambia a true si querés ver los logs de SQL en consola
});

const connectSQLite = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a SQLite exitosa 🗃️');
  } catch (error) {
    console.error('❌ Error al conectar con SQLite:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectSQLite };
