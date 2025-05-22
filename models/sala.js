const db = require('../config/database');

module.exports = {
  async create(data) {
    const query = 'INSERT INTO sala (numero, andar, reserva_id) VALUES ($1, $2, $3)';
    const values = [data.numero, data.andar, data.reserva_id || null];
    return db.query(query, values);
  },

  async findAllComRserva() {
    const query = `
      SELECT sala.id, sala.numero, sala.andar, usuario.nome AS reserva
      FROM sala
      LEFT JOIN reserva ON sala.disponivel = disponivel
      ORDER BY sala.id ASC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  async findByReserva(reserva_id) {
    const query = 'SELECT sala.id, sala.numero, sala.andar FROM sala WHERE reserva_id = $1 ORDER BY reserva_id ASC';
    const result = await db.query(query, [reserva_id]);
    return result.rows;
  },

  async update(reserva_id, data) {
    const query = 'UPDATE sala SET numero = $1, andar = $2 WHERE sala_id = $3';
    const values = [data.numero, data.andar, reserva_id];
    return db.query(query, values);
  },

  async delete(sala_id) {
    const query = 'DELETE FROM sala WHERE sala_id = $1';
    return db.query(query, [sala_id]);
  }
};