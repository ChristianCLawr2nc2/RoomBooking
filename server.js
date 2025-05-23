const express = require('express');
const app = express();
const path = require('path');
const salas = require('./routes/salas');
const db = require('./config/database');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', salas);

app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Página Inicial',
    mensagem: 'Bem-vindo ao sistema de reservas!'
  });
}); 

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes);

    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });