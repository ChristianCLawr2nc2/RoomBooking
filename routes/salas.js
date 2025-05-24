const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

// Página web com EJS
router.get('/salas', salaController.mostrarSalas);

// API REST
router.get('/api/salas', salaController.getAllSala);
router.get('/api/salas/:sala_id', salaController.getSalaById);
router.post('/api/salas', salaController.createSala);
router.put('/api/salas/:sala_id', salaController.updateSala);
router.delete('/api/salas/:sala_id', salaController.deleteSala);

module.exports = router;
