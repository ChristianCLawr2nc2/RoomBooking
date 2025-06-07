const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

router.get('/salas', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  salaController.mostrarSalas(req, res, next);
});

module.exports = router;