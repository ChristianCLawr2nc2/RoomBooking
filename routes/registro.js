const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/salas'); // Redirect if already logged in
  }
  res.render('registro', { title: 'Registro', error: null });
});

router.post('/', authController.register);

module.exports = router;