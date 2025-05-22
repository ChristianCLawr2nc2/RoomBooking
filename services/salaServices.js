// services/userService.js

const db = require('../config/database');

// Função para obter todas as salas
const getAllSala = async () => {
  try {
    const result = await db.query('SELECT * FROM sala ORDER BY sala_id ASC');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter as salas: ' + error.message);
  }
};

// Função para obter um usuário por ID
const getSalaById = async (sala_id) => {
  try {
    const result = await db.query('SELECT * FROM sala WHERE sala_id = $1', [sala_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter salas: ' + error.message);
  }
};

// Função para criar um novo usuário
const createSala = async (numero, andar) => {
  try {
    const result = await db.query(
      'INSERT INTO sala (numero, andar) VALUES ($1, $2) RETURNING *',
      [numero, andar]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar salas: ' + error.message);
  }
};

// Função para atualizar uma sala por ID
const updateSala = async (sala_id, numero, andar) => {
  try {
    const result = await db.query(
      'UPDATE sala SET numero = $1, andar = $2 WHERE sala_id = $3 RETURNING *',
      [sala_id, numero, andar]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteSala = async (sala_id) => {
  try {
    const result = await db.query('DELETE FROM sala WHERE sala_id = $1 RETURNING *', [sala_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar salas: ' + error.message);
  }
};

module.exports = {
  getAllSala,
  getSalaById,
  createSala,
  updateSala,
  deleteSala
};
