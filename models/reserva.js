const db = require('../config/database');

module.exports = {
  async findAll() {
    const result = await db.query('SELECT * FROM reserva ORDER BY reserva_id ASC');
    return result.rows;
  },

  async create(numero, andar) {
    const result = await db.query(
      'INSERT INTO reserva (numero, andar) VALUES ($1, $2) RETURNING *',
      [numero, andar]
    );
    return result.rows[0];
  },

  async update(reserva_id, numero, andar) {
    const result = await db.query(
      'UPDATE reserva SET numero = $1, andar = $2 WHERE reseva_id = $3 RETURNING *',
      [numero, andar, reserva_id]
    );
    return result.rows[0];
  },

  async delete(reserva_id) {
    await db.query('DELETE FROM reserva WHERE reserva_id = $1', [reserva_id]);
  }
};