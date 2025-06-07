const database = require('../database');
const bcrypt = require('bcrypt');

const userService = {
  async getAllUsers() {
    try {
      const { rows } = await database.query('SELECT id, nome, email FROM usuarios ORDER BY id');
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  async getUserById(id) {
    try {
      const { rows } = await database.query('SELECT id, nome, email FROM usuarios WHERE id = $1', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch user with id ${id}: ${error.message}`);
    }
  },

  async createUser({ nome, email, password }) {
    try {
      // Validate inputs
      if (!nome || !email) {
        throw new Error('Name and email are required');
      }
      // Hash password if provided
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
      const { rows } = await database.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
        [nome, email, hashedPassword]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  async updateUser(id, { nome, email, password }) {
    try {
      // Check if user exists
      const user = await this.getUserById(id);
      if (!user) {
        return null;
      }
      // Prepare update fields
      const updates = [];
      const values = [];
      let paramIndex = 1;

      if (nome) {
        updates.push(`nome = $${paramIndex++}`);
        values.push(nome);
      }
      if (email) {
        updates.push(`email = $${paramIndex++}`);
        values.push(email);
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.push(`senha = $${paramIndex++}`);
        values.push(hashedPassword);
      }

      if (updates.length === 0) {
        throw new Error('No fields provided for update');
      }

      values.push(id);
      const query = `UPDATE usuarios SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, nome, email`;
      const { rows } = await database.query(query, values);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to update user with id ${id}: ${error.message}`);
    }
  },

  async deleteUser(id) {
    try {
      const { rows } = await database.query(
        'DELETE FROM usuarios WHERE id = $1 RETURNING id, nome, email',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to delete user with id ${id}: ${error.message}`);
    }
  },
};

module.exports = userService;