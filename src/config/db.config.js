import pg from 'pg';

export const pool = new pg.Pool({
    user: process.env.DB_USER || 'admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'ac040487',    
    port: process.env.DB_PORT || 5432,
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