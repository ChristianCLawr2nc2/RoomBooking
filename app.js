const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
require('dotenv').config();

const db = require('./config/database');
const salasRoutes = require('./routes/salas');
const registroRoutes = require('./routes/registro');
const loginRoutes = require('./routes/login');
const novaReservaRoutes = require('./routes/novaReserva');
const reservasRoutes = require('./routes/reservas');
const authController = require('./controllers/authController');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().none());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use('/login', loginRoutes);
app.use('/registro', registroRoutes);
app.use('/', salasRoutes);
app.use('/nova_reserva', novaReservaRoutes);
app.use('/reservas', reservasRoutes);

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/salas');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', authController.logout);

async function startServer() {
  try {
    await db.query('SELECT NOW()');
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use((req, res, next) => {
      res.status(404).render('404', { title: 'Página não encontrada' });
    });

    app.use((err, req, res, next) => {
      console.error(`Error occurred at ${req.method} ${req.url}:`, err.stack);
      res.status(500).render('error', { title: 'Erro', error: 'Erro no servidor' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(startServer, 5000);
  }
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();