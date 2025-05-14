const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conexión a MongoDB exitosa 🎉');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
