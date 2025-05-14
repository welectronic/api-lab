const dotenv = require('dotenv');
dotenv.config();

const connectMongo = require('./config/mongo');
const { connectSQLite } = require('./config/sqlite');
const app = require('./app'); // Este ya tiene express y rutas

// Conectar bases de datos
connectMongo();
connectSQLite();

const Note = require('./models/sqlite/Note');
Note.sync(); // Crea la tabla si no existe


// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
