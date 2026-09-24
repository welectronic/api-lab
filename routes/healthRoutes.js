const express = require('express');
const router = express.Router();

// 🟢 Comprobar que la API está viva (sin consultar las bases de datos)
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
