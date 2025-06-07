const db = require('../config/database');
const bcrypt = require('bcrypt');

const authController = {
  register: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).render('registro', {
          title: 'Registro',
          error: 'Nome, email e senha são obrigatórios',
        });
      }
      // Check if email already exists
      const existingUser = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).render('registro', {
          title: 'Registro',
          error: 'Este email já está registrado',
        });
      }
      const hashedSenha = await bcrypt.hash(senha, 10);
      const result = await db.query(
        'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, hashedSenha]
      );
      req.session.user = result.rows[0];
      res.redirect('/');
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).render('error', {
        title: 'Erro',
        error: 'Erro no servidor',
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).render('login', {
          title: 'Login',
          error: 'Email e senha são obrigatórios',
        });
      }
      const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
      if (result.rows.length === 0 || !(await bcrypt.compare(senha, result.rows[0].senha))) {
        return res.status(401).render('login', {
          title: 'Login',
          error: 'Credenciais inválidas',
        });
      }
      req.session.user = result.rows[0];
      res.redirect('/');
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).render('error', {
        title: 'Erro',
        error: 'Erro no servidor',
      });
    }
  },

  logout: async (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new Error('Erro ao fazer logout');
        }
        res.redirect('/');
      });
    } catch (err) {
      console.error('Logout error:', err);
      next(err);
    }
  },
};

module.exports = authController;