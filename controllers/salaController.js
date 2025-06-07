const db = require('../config/database');

const mostrarSalas = async (req, res, next) => {
  try {
    const result = await db.query('SELECT sala_id, numero, andar, disponivel FROM sala WHERE disponivel = true ORDER BY numero');
    res.render('salas', { title: 'Salas Disponíveis', salas: result.rows || [], error: null });
  } catch (err) {
    console.error('Error fetching salas:', err);
    next(err); // Pass to error handler
  }
};

// API endpoints (kept for potential future use)
const getAllSala = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM sala');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalaById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM sala WHERE id = $1', [req.params.sala_id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSala = async (req, res) => {
  try {
    const { numero, andar } = req.body;
    if (!numero || !andar) {
      return res.status(400).json({ error: 'Número e andar são obrigatórios' });
    }
    const result = await db.query(
      'INSERT INTO sala (numero, andar) VALUES ($1, $2) RETURNING *',
      [numero, andar]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSala = async (req, res) => {
  try {
    const { numero, andar } = req.body;
    if (!numero || !andar) {
      return res.status(400).json({ error: 'Número e andar são obrigatórios' });
    }
    const result = await db.query(
      'UPDATE sala SET numero = $1, andar = $2 WHERE id = $3 RETURNING *',
      [numero, andar, req.params.sala_id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSala = async (req, res) => {
  try {
    const result = await db.query('DELETE FROM sala WHERE id = $1 RETURNING *', [req.params.sala_id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSala,
  getSalaById,
  createSala,
  updateSala,
  deleteSala,
  mostrarSalas,
};