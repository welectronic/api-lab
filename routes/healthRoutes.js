const express = require('express');
const router = express.Router();

// 🟢 Comprobar que la API está viva (sin consultar las bases de datos)
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ⏱️ Segundos que lleva el proceso en marcha (vuelve a 0 tras un reinicio)
router.get('/health/uptime', (req, res) => {
  res.json({ uptimeSeconds: Math.floor(process.uptime()) });
});

module.exports = router;
