const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', '..', 'sports.db');

console.log('Base de datos usada por Node:', dbPath);

const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.error('Error al conectar con la base de datos:', error.message);
    } else {
        console.log('Conexión correcta con la base de datos SQLite');
    }
});

module.exports = db;