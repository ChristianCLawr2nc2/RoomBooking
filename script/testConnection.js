// script/testConnection.js
const db = require('../config/database');

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
    process.exit(0); // Exit successfully
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Exit with error
  });