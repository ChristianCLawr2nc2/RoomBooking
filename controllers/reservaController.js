const reserva = require('../models/reserva');

exports.create = async (req, res) => {
  const { nome } = req.body;
  await reserva.create(nome);
  res.redirect('/reservas');
};

exports.update = async (req, res) => {
  const { reserva_id } = req.params;
  const { nome } = req.body;
  await reserva.update(reserva_id, nome);
  res.redirect('/reservas');
};

exports.delete = async (req, res) => {
  const { reserva_id } = req.params;
  await reserva.delete(reserva_id);
  res.redirect('/reservas');
};
