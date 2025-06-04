import pg from 'pg';
import {dbConfig} from './config.js';

export const pool = new pg.Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,    
    port: dbConfig.port,
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos');
}
);
pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos', err);
});
pool.on('remove', () => {
    console.log('Cliente de la base de datos cerrado');
});