const express = require('express');
const router = express.Router();
const Movie = require('../models/mongo/Movie');

// 🟢 Obtener todas las películas
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().limit(50); // Limita para evitar respuestas gigantes
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 Obtener una sola película por ID
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟡 Crear una nueva película
router.post('/movies', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟠 Actualizar una película por ID
router.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔴 Eliminar una película por ID
router.delete('/movies/:id', async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Película no encontrada' });
    res.json({ message: 'Película eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const Note = require('../models/sqlite/Note'); // ¡Asegurate de importar esto!

// 🔀 Obtener una película por ID + sus notas
router.get('/movies/:id/with-notes', async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    const notes = await Note.findAll({ where: { movieId } });

    res.json({
      movie,
      notes
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
