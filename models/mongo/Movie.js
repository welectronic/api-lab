const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  genres: [String],
  cast: [String],
  directors: [String],
  plot: String,
  fullplot: String,
  languages: [String],
  released: Date,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number
  },
  poster: String
}, {
  collection: 'movies', // Muy importante para que apunte a la colección correcta de sample_mflix
  timestamps: false
});

module.exports = mongoose.model('Movie', MovieSchema);
