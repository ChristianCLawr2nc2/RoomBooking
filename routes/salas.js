const express = require('express');
const router = express.Router();
const controller = require('../controllers/salaController');

router.get('/', controller.getAllSala);
router.get('/:sala_id', controller.getSalaById);
router.post('/', controller.createSala);
router.put('/:sala_id', controller.updateSala);
router.delete('/:sala_id', controller.deleteSala);

module.exports = router;