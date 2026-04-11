const knex = require('knex');
const path = require('path');

// Configuración de la base de datos: tipo, ubicación y otros parámetros
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '..', '..', 'sports.db')
    },
    useNullAsDefault: true
});

exports.db = db;