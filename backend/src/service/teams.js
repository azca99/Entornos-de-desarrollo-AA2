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

// Operación que registra un nuevo equipo en la base de datos
const registerTeam = async (name, city, sport) => {
    const result = await db('teams').insert({
        name: name,
        city: city,
        sport: sport
    });

    return result;
};

// Operación que modifica un equipo en la base de datos
const modifyTeam = async (id, name, city, sport) => {
    const result = await db('teams')
        .where({ id: id })
        .update({
            name: name,
            city: city,
            sport: sport
        });

    return result;
};

// Operación que elimina un equipo de la base de datos
const removeTeam = async (id) => {
    
    // Comprobar que no hay jugadores asociados al equipo antes de eliminarlo
    const players = await db('players')
        .select('*')
        .where({ id_team: id });

    if (players.length > 0) {
        throw new Error('No se puede eliminar el equipo porque tiene jugadores asociados');
    }

    const result = await db('teams')
        .where({ id: id })
        .del();
    
    return result;
};

module.exports = {
    findAllTeams,
    findTeamById,
    registerTeam,
    modifyTeam,
    removeTeam
};