const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const result = await db.query(`
      SELECT
        r.reserva_id,
        r.usuario_id,
        r.sala_id,
        r.dia,
        r.duracao,
        r.horario,
        s.numero,
        s.andar
      FROM reserva r
      JOIN sala s ON r.sala_id = s.sala_id
      WHERE r.usuario_id = $1
      ORDER BY r.dia DESC, r.horario DESC
    `, [req.session.user.id]);

    res.render('reservas', {
      title: 'Reservas',
      reservas: result.rows || [],
      error: null
    });
  } catch (err) {
    console.error('Error fetching reservations:', err);
    next(err);
  }
});

// Route to handle reservation deletion
router.delete('/:id', async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = req.params;
    const result = await db.query(
      'DELETE FROM reserva WHERE reserva_id = $1 AND usuario_id = $2 RETURNING *',
      [id, req.session.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    res.json({ success: true, message: 'Reserva cancelada com sucesso' });
  } catch (err) {
    console.error('Error deleting reservation:', err);
    res.status(500).json({ error: 'Erro ao cancelar reserva' });
  }
});

module.exports = router;