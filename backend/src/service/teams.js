const db = require('../configuration/database.js').db;

// Operación que devuelve todos los equipos de la base de datos
const findAllTeams = async () => {
    const result = await db('teams').select('*');
    return result;
};

// Operación que devuelve un equipo por su id
const findTeamById = async (id) => {
    const result = await db('teams').select('*').where({ id: id }).first();
    return result;
};

module.exports = {
    findAllTeams,
    findTeamById
};