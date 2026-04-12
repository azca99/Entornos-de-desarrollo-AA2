const { findAllPlayers, findPlayerByName, findPlayerById, registerPlayer, modifyPlayer, removePlayer, findTeamById } = require('../service/players.js');

//  Operación que devuelve todos los jugadores de la base de datos
const getPlayers = async (req, res) => {
    const data = await findAllPlayers();

    res.status(200).json(data);
};

// Operación que devuelve un jugador por su nombre
const getPlayerByName = async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ message: 'Falta el parámetro de búsqueda' });
    };

    const data = await findPlayerByName(req.query.name);
    res.status(200).json(data);
};

// Operación que devuelve un jugador por su id
const getPlayerById = async (req, res) => {
    const data = await findPlayerById(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Jugador no encontrado' });
    };

    res.status(200).json(data);
};

// Operación que registra un nuevo jugador en la base de datos
const postPlayer = async (req, res) => {
    const { name, birth_date, position, id_team } = req.body;
    
    if (!name || !birth_date || !position || !id_team) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    };

    const team = await findTeamById(id_team);

    if (!team) {
        return res.status(400).json({ message: 'El equipo especificado no existe' });
    };
    
    const data = await registerPlayer(name, birth_date, position, id_team);
    res.status(201).json({ message: 'Jugador registrado correctamente', id: data[0] });
};

// Operación que modifica un jugador en la base de datos
const putPlayer = async (req, res) => {
    const { name, birth_date, position, id_team } = req.body;

    if (!name || !birth_date || !position || !id_team) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    };

    const team = await findTeamById(id_team);
    if (!team) {
        return res.status(400).json({ message: 'El equipo especificado no existe' });
    };
    
    const player = await findPlayerById(req.params.id);
    if (!player) {
        return res.status(404).json({ message: 'Jugador no encontrado' });
    };

    const data = await modifyPlayer(req.params.id, name, birth_date, position, id_team);
    res.status(200).json({ message: 'Jugador modificado correctamente', id: data[0] });
};

// Operación que elimina un jugador de la base de datos
const deletePlayer = async (req, res) => {
    const data = await removePlayer(req.params.id);
    if (!data) {
        return res.status(404).json({ message: 'Jugador no encontrado' });
    };

    res.status(200).json({ message: 'Jugador eliminado correctamente', id: data[0] });
};

module.exports = {
    getPlayers,
    getPlayerByName,
    getPlayerById,
    postPlayer,
    putPlayer,
    deletePlayer
};