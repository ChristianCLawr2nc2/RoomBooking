const express = require('express');
const router = express.Router();
const home = require('../controllers/homeController');
const reserva = require('../controllers/reservaController');
const salas = require('../controllers/salaController');


// Rota principal
router.get('/', home.index);

// Rota da página "reserva"
router.get('/reserva', reserva.index);

// Rota para criar sala
router.get('/salas', salas.index);

module.exports = router;