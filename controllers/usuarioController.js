const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/users', usuarioController.getAllUsers);
router.get('/users/:id', usuarioController.getUserById);
router.post('/users', usuarioController.createUser);
router.put('/users/:id', usuarioController.updateUser);
router.delete('/users/:id', usuarioController.deleteUser);

module.exports = router;