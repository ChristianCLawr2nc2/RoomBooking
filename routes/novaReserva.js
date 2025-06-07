const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        // Fetch available rooms for the dropdown
        const salasResult = await db.query('SELECT sala_id, numero, andar FROM sala WHERE disponivel = true ORDER BY numero');
        res.render('nova_reserva', {
            title: 'Nova Reserva',
            error: null,
            salas: salasResult.rows || []
        });
    } catch (err) {
        console.error('Error fetching salas:', err);
        res.render('nova_reserva', {
            title: 'Nova Reserva',
            error: 'Erro ao carregar salas disponíveis',
            salas: []
        });
    }
});

router.post('/', async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { sala_id, duracao, horario } = req.body;

    if (!sala_id || !duracao || !horario) {
        try {
            const salasResult = await db.query('SELECT sala_id, numero, andar FROM sala WHERE disponivel = true ORDER BY numero');
            return res.render('nova_reserva', {
                title: 'Nova Reserva',
                error: 'Todos os campos são obrigatórios',
                salas: salasResult.rows || []
            });
        } catch (err) {
            return res.render('nova_reserva', {
                title: 'Nova Reserva',
                error: 'Todos os campos são obrigatórios',
                salas: []
            });
        }
    }

    try {
        // Validate that end time is after start time
        const startDate = new Date(horario);
        const endDate = new Date(startDate.getTime() + (duracao * 60000));

        if (endDate <= startDate) {
            const salasResult = await db.query('SELECT sala_id, numero, andar FROM sala WHERE disponivel = true ORDER BY numero');
            return res.render('nova_reserva', {
                title: 'Nova Reserva',
                error: 'O horário não está disponível',
                salas: salasResult.rows || []
            });
        }

        // Check for conflicts
        const conflictCheck = await db.query(`
            SELECT COUNT(*) as count FROM reserva 
            WHERE sala_id = $1 AND (
                (duracao <= $3 AND horario > $3) OR
                (duracao < $3 AND horario >= $3) OR
                (duracao >= $3 AND horario <= $2) OR
                (duracao >= $3 AND horario <= $2)
            )
        `, [sala_id, horario, duracao]);

        if (conflictCheck.rows[0].count > 0) {
            const salasResult = await db.query('SELECT sala_id, numero, andar FROM sala WHERE disponivel = true ORDER BY numero');
            return res.render('nova_reserva', {
                title: 'Nova Reserva',
                error: 'Esta sala já está reservada para o horário selecionado',
                salas: salasResult.rows || []
            });
        }

        // Calculate end time
        const horarioCalculado = new Date(startDate.getTime() + (duracao * 60000)).toISOString();

        // Insert reservation
        await db.query(`
            INSERT INTO reserva (sala_id, usuario_id, dia, duracao, horario) 
            VALUES ($1, $2, $3, $4, $5)
        `, [sala_id, req.session.user.id, startDate.toISOString().split('T')[0], duracao, horarioCalculado]);

        res.redirect('/minhas_reservas');

    } catch (err) {
        console.error('Error creating reservation:', err);
        try {
            const salasResult = await db.query('SELECT sala_id, numero, andar FROM sala WHERE disponivel = true ORDER BY numero');
            res.render('nova_reserva', {
                title: 'Nova Reserva',
                error: 'Erro ao criar reserva. Tente novamente.',
                salas: salasResult.rows || []
            });
        } catch (fetchErr) {
            res.render('nova_reserva', {
                title: 'Nova Reserva',
                error: 'Erro ao criar reserva. Tente novamente.',
                salas: []
            });
        }
    }
});

module.exports = router;