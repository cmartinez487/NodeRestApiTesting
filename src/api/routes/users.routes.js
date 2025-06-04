import {Router} from 'express';
import { pool } from '../../config/db.config.js';
const router = Router();

router.get('/users', async(res) => {

    try {
        await pool.query('BEGIN');
        const result = await pool.query('SELECT * FROM users')
        await pool.query('COMMIT');

        res.status(200).json(result.rows);
    } catch (e) {
        console.error('Transacción fallida:', e);
        res.status(500).json({ message: 'Error en la transacción.' });
    } 
});

router.get('/users/:userId', async(req, res) => {
    
    try {
        const {userId} = req.params; 
        await pool.query('BEGIN');
        const result = await pool.query(`SELECT * FROM users where id = ${userId}`);
        await pool.query('COMMIT');

         if (result.rows.length === 0) 
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        
        res.status(200).json(result.rows);
    } catch (e) {
        console.error('Transacción fallida:', e);
        res.status(500).json({ message: 'Error en la transacción.' });
    } 
});

router.post('/users', async(req, res) => {
        try {
        const data = req.body; 
        await pool.query('BEGIN');
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [data.name, data.email]
        );
        await pool.query('COMMIT');
        res.status(200).json(result.rows);
    } catch (e) {
        await pool.query('ROLLBACK');
        console.error('Transacción fallida:', e);
        res.status(500).json({ message: 'Error en la transacción.' });
    } 
});

router.delete('/users/:userId', async(req, res) => {
    try {
        const {userId} = req.params; 
        await pool.query('BEGIN');
        const {rowCount} = await pool.query(`DELETE FROM users where id = ${userId}`);
        await pool.query('COMMIT');

         if (rowCount === 0) 
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        
        res.status(200).json('Usuario eliminado correctamente');
    } catch (e) {
        console.error('Transacción fallida:', e);
        res.status(500).json({ message: 'Error en la transacción.' });
    } 
});

router.put('/users/:userId', async(req, res) => {
        try {
            const {userId} = req.params; 
            const data = req.body; 
            await pool.query('BEGIN');
            const result = await pool.query(
                'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
                [data.name, data.email, userId]
            );
            await pool.query('COMMIT');
            res.status(200).json(result.rows);
        } 
        catch (e) 
        {
            await pool.query('ROLLBACK');
            console.error('Transacción fallida:', e);
            res.status(500).json({ message: 'Error en la transacción.' });
    } 
});

export default router;