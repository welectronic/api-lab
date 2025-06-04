const dotenv = require('dotenv');
dotenv.config();

const connectMongo = require('./config/mongo');
const { connectSQLite } = require('./config/sqlite');
const app = require('./app'); // Este ya tiene express y rutas

const Note = require('./models/sqlite/Note');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectMongo();
    await connectSQLite();
    await Note.sync(); // Crea la tabla si no existe

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err.message);
    process.exit(1);
  }
}

start();
