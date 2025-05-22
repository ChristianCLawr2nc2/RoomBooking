const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservaController');

router.post('/', controller.create);
router.post('/edit/:reserva_id', controller.update);
router.post('/delete/:reserva_id', controller.delete);

module.exports = router;