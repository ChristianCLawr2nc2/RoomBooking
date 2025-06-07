const db = require('../config/database');

const create = async (req, res, next) => {
  try {
    const { sala_id, duracao, horario } = req.body;
    if (!sala_id || !duracao || !horario) {
      return res.status(400).render('nova_reserva', {
        title: 'Nova Reserva',
        error: 'Todos os campos são obrigatórios',
      });
    }
    await db.query(
      'INSERT INTO reserva (sala_id, usuario_id, duracao, horario) VALUES ($1, $2, $3, $4)',
      [sala_id, req.session.user.id, duracao, horario]
    );
    res.redirect('/minhas_reservas');
  } catch (error) {
    console.error('Error creating reservation:', error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { reserva_id } = req.params;
    const { sala_id, duracao, horario, dia } = req.body;
    
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      if (!duracao || !horario) {
        return res.status(400).json({
          success: false,
          message: 'Todos os campos são obrigatórios'
        });
      }
      
      const result = await db.query(
        'UPDATE reserva SET duracao = $1, horario = $2 WHERE id = $3 AND usuario_id = $4 RETURNING *',
        [duracao, horario, reserva_id, req.session.user.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Reserva não encontrada'
        });
      }
      
      return res.json({
        success: true,
        message: 'Reserva atualizada com sucesso'
      });
    } else {
      if (!sala_id || !duracao || !horario) {
        return res.status(400).render('edit_reserva', {
          title: 'Editar Reserva',
          error: 'Todos os campos são obrigatórios',
        });
      }
      
      const result = await db.query(
        'UPDATE reserva SET sala_id = $1, duracao = $2, horario = $3 WHERE id = $4 AND usuario_id = $5 RETURNING *',
        [sala_id, duracao, horario, reserva_id, req.session.user.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).render('error', { title: 'Erro', error: 'Reserva não encontrada' });
      }
      
      res.redirect('/minhas_reservas');
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
    next(error);
  }
};

const deleteReserva = async (req, res, next) => {
  try {
    const { reserva_id } = req.params;
    
    if (req.method === 'DELETE') {
      const result = await db.query(
        'DELETE FROM reserva WHERE id = $1 AND usuario_id = $2 RETURNING *',
        [reserva_id, req.session.user.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Reserva não encontrada'
        });
      }
      
      return res.json({
        success: true,
        message: 'Reserva cancelada com sucesso'
      });
    } else {
      const result = await db.query(
        'DELETE FROM reserva WHERE id = $1 AND usuario_id = $2 RETURNING *',
        [reserva_id, req.session.user.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).render('error', { title: 'Erro', error: 'Reserva não encontrada' });
      }
      
      res.redirect('/minhas_reservas');
    }
  } catch (error) {
    console.error('Error deleting reservation:', error);
    if (req.method === 'DELETE') {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
    next(error);
  }
};

module.exports = { create, update, delete: deleteReserva };