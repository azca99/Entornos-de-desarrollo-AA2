const { findAllTeams, findTeamById, registerTeam, modifyTeam, removeTeam, updateTeamImage, removeTeamImage } = require('../service/teams.js');

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
    const { name, city, sport, image_url } = req.body;

    await registerTeam(name, city, sport, image_url);

    res.status(201).json({ message: 'Equipo registrado correctamente' });
};

// Operación que modifica un equipo en la base de datos
const putTeam = async (req, res) => {
    const { name, city, sport, image_url } = req.body;
    const id = req.params.id;

    const updated = await modifyTeam(id, name, city, sport, image_url);

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

// Operación que actualiza la imagen de un equipo en la base de datos
const putTeamImage = async (req, res) => {
    const id = req.params.id;
    const { image_url } = req.body;

    const updated = await updateTeamImage(id, image_url);

    if (!updated) {
        return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.status(200).json({ message: 'Imagen del equipo actualizada correctamente' });
};

// Operación que elimina la imagen de un equipo de la base de datos
const deleteTeamImage = async (req, res) => {
    const id = req.params.id;

    const deleted = await removeTeamImage(id);

    if (!deleted) {
        return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.status(200).json({ message: 'Imagen del equipo eliminada correctamente' });
};

module.exports = {
    getTeams,
    getTeamById,
    postTeam,
    putTeam,
    deleteTeam,
    putTeamImage,
    deleteTeamImage
};