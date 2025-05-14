const express = require('express');
const router = express.Router();
const Note = require('../models/sqlite/Note');

// 🟢 Obtener todas las notas
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 Obtener una nota por ID
router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/notes/movie/:movieId', async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { movieId: req.params.movieId }
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟡 Crear una nueva nota
router.post('/notes', async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟠 Actualizar una nota por ID
router.put('/notes/:id', async (req, res) => {
  try {
    const [updated] = await Note.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Nota no encontrada' });
    const updatedNote = await Note.findByPk(req.params.id);
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔴 Eliminar una nota por ID
router.delete('/notes/:id', async (req, res) => {
  try {
    const deleted = await Note.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json({ message: 'Nota eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
