const { findAllTeams, findTeamById } = require('../service/teams.js');

// Operación que devuelve todos los equipos de la base de datos
const getTeams = async (req, res) => {
    const data = await findAllTeams();

    res.status(200).json(data);
};

// Operación que devuelve un equipo por su id
const getTeamById = async (req, res) => {
    const data = await findTeamById(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.status(200).json(data);
};

module.exports = {
    getTeams,
    getTeamById
};