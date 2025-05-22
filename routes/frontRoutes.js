const express = require('express');
const router = express.Router();
const path = require('path');

// Roteamento para páginas dinâmicas
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/salas')
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/reservas')
  });
});

// Adicione outras rotas conforme necessário

module.exports = router;
