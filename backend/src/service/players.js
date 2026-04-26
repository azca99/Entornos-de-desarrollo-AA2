const db = require('../configuration/database.js').db;

// Operación que devuelve todos los jugadores de la base de datos
const findAllPlayers = async () => {
    const result = await db('players').select('*');
    return result;
};

// Operación que devuelve un jugador por su nombre
const findPlayerByName = async (name) => {
    const result = await db('players').select('*').where('name', 'like', `%${name}%`);
    return result;
};

// Operación que devuelve un jugador por su id
const findPlayerById = async (id) => {
    const result = await db('players')
        .select('*')
        .where({ id: id })
        .first();

    return result;
};

// Operación que registra un nuevo jugador en la base de datos
const registerPlayer = async (name, birth_date, position, id_team) => {
    const result = await db('players').insert({
        name: name,
        birth_date: birth_date,
        position: position,
        id_team: id_team
    });

    return result;
};

// Operación que modifica un jugador en la base de datos
const modifyPlayer = async (id, name, birth_date, position, id_team) => {
    const result = await db('players')
        .where({ id: id })
        .update({
            name: name,
            birth_date: birth_date,
            position: position,
            id_team: id_team
        });

    return result;
};

// Operación que elimina un jugador de la base de datos
const removePlayer = async (id) => {
    const result = await db('players')
        .where({ id: id })
        .del();

    return result;
};

// Operación que comprueba si existe un equipo con el id especificado
const findTeamById = async (id) => {
    const result = await db('teams').select('*').where({ id: id }).first();
    
    return result;
};

module.exports = {
    findAllPlayers,
    findPlayerByName,
    findPlayerById,
    registerPlayer,
    modifyPlayer,
    removePlayer,
    findTeamById
};