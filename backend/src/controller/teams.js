const { findAllTeams, findTeamById, registerTeam, modifyTeam, removeTeam } = require('../service/teams.js');

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

// Operación que registra un nuevo equipo en la base de datos
const postTeam = async (req, res) => {
    const { name, city, sport } = req.body;

    if (!name || !city || !sport) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    await registerTeam(name, city, sport);

    res.status(201).json({ message: 'Equipo registrado correctamente' });
};

// Operación que modifica un equipo en la base de datos
const putTeam = async (req, res) => {
    const { name, city, sport } = req.body;
    const id = req.params.id;

    if (!name || !city || !sport) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const updated = await modifyTeam(id, name, city, sport);

    if (!updated) {
        return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.status(200).json({ message: 'Equipo modificado correctamente' });
};

// Operación que elimina un equipo de la base de datos
const deleteTeam = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await removeTeam(id);

        if (deleted === 0) {
            return res.status(404).json({
                message: 'Equipo no encontrado'
            });
        }

        return res.status(200).json({
            message: 'Equipo eliminado correctamente'
        });
    } catch (error) {
        if (error.message === 'No se puede eliminar el equipo porque tiene jugadores asociados') {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error('Error al eliminar el equipo:', error.message);

        return res.status(500).json({
            message: 'Error al eliminar el equipo'
        });
    }
};


module.exports = {
    getTeams,
    getTeamById,
    postTeam,
    putTeam,
    deleteTeam
};