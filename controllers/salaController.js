// controllers/salaController.js

const salaService = require('../services/salaServices');

const getAllSala = async (req, res) => {
  try {
    const salas = await salaService.getAllSala();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalaById = async (req, res) => {
  try {
    const sala = await salaService.getSalaById(req.params.sala_id);
    if (sala) {
      res.status(200).json(sala);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSala = async (req, res) => {
  try {
    const { numero, andar } = req.body;
    const newSala = await salaService.createSala(numero, andar);
    res.status(201).json(newSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSala = async (req, res) => {
  try {
    const { numero, andar } = req.body;
    const updatedSala = await salaService.updateSala(req.params.sala_id, numero, andar);
    if (updatedSala) {
      res.status(200).json(updatedSala);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSala = async (req, res) => {
  try {
    const deletedSala = await salaService.deleteSala(req.params.sala_id);
    if (deletedSala) {
      res.status(200).json(deletedSala);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// controllers/salasController.js
const listaSalas = async (req, res) => {
  try {
    const salas = await salaService.getAllSala();
    res.status(200).json(salas);
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
    listaSalas,
};