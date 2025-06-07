const db = require('../config/database');

module.exports = {
  async findAll() {
    const result = await db.query('SELECT * FROM usuario ORDER BY nome ASC');
    return result.rows;
  },

  async create(nome) {
    const query = 'INSERT INTO usuario (nome) VALUES ($1) RETURNING *';
    const result = await db.query(query, [nome]);
    return result.rows[0];
  },

  async update(id, nome) {
    const query = 'UPDATE usuario SET nome = $1 WHERE id = $2 RETURNING *';
    const result = await db.query(query, [nome, id]);
    return result.rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM usuario WHERE id = $1', [id]);
  }
};
