const db = require('../config/database');

module.exports = {
  async createSala(numero, andar, reserva_id = null) {
    const query = 'INSERT INTO salas (numero, andar, reserva_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [numero, andar, reserva_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getAllSala() {
    const query = `
      SELECT salas.sala_id, salas.numero, salas.andar, reservas.reserva_id
      FROM salas
      LEFT JOIN reservas ON salas.reserva_id = reservas.reserva_id
      ORDER BY salas.sala_id ASC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  async getSalaByReserva(reserva_id) {
    const query = 'SELECT sala_id, numero, andar FROM salas WHERE reserva_id = $1 ORDER BY sala_id ASC';
    const result = await db.query(query, [reserva_id]);
    return result.rows;
  },

  async updateSala(sala_id, numero, andar) {
    const query = 'UPDATE salas SET numero = $1, andar = $2 WHERE sala_id = $3 RETURNING *';
    const values = [numero, andar, sala_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteSala(sala_id) {
    const query = 'DELETE FROM salas WHERE sala_id = $1 RETURNING *';
    const result = await db.query(query, [sala_id]);
    return result.rows[0];
  }
};
