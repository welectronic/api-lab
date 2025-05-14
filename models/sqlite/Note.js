const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sqlite');

const Note = sequelize.define('Note', {
  movieId: {
    type: DataTypes.STRING, // Mongo IDs son strings hexadecimales
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'notes',
  timestamps: true
});

module.exports = Note;
