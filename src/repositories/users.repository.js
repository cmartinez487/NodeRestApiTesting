import { pool } from '../config/db.config.js';

export const UserRepository = {
    // Obtener todos los usuarios
    async findAll() {
        const result = await pool.query('SELECT id, name, email FROM users'); // Seleccionando solo las columnas necesarias
        return result.rows;
    },

    // Obtener usuario por ID
    async findById(userId) {
        const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
        return result.rows[0]; // Devuelve el primer resultado o undefined
    },

    // Crear un nuevo usuario
    async create(name, email, password) { // Recibe datos puros, sin req/res
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, password]
        );
        return result.rows[0];
    },

    // Actualizar un usuario
    async update(userId, name, email) { // Recibe datos puros
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
            [name, email, userId]
        );
        return result.rows[0];
    },

    // Eliminar un usuario
    async delete(userId) { // Recibe el ID
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
        return result.rowCount > 0; // Devuelve true si se eliminó una fila, false si no
    }
};