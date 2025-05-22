const express = require('express');
const app = express();
const path = require('path');
const salasRoutes = require('./routes/salas');

const bodyParser = require('body-parser');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use('/index', salasRoutes);

app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Página Inicial',
    mensagem: 'Bem-vindo ao sistema de reservas!'
  });

});


app.get('/salas', (req, res) => {
  res.render('salas', {
    titulo: 'Salas Existentes',
    mensagem: 'Esta é a página de visualização das Salas!'
  });
});

app.get('/reservas', (req, res) => {
  res.render('reservas', {
    titulo: 'Suas Reservas',
    mensagem: 'Esta é a página de visualização das Reservas!'
  });
});