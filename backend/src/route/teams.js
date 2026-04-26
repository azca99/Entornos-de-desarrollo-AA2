const express = require('express');
const router = express.Router();

const { getTeams, getTeamById, postTeam, putTeam, deleteTeam, putTeamImage, deleteTeamImage } = require('../controller/teams.js');

const {handleValidation } = require('../middleware/validation.js');
const { teamValidation, teamIdValidation, teamImageValidation } = require('../validation/teams.js');

router.get('/teams', getTeams);

router.get('/teams/:id', teamIdValidation, handleValidation, getTeamById);
router.post('/teams', teamValidation, handleValidation, postTeam);
router.put('/teams/:id', teamIdValidation, teamValidation, handleValidation, putTeam);
router.delete('/teams/:id', teamIdValidation, handleValidation, deleteTeam);

// Rutas para la gestión de imágenes de los equipos
router.put('/teams/:id/image', teamIdValidation, teamImageValidation, handleValidation, putTeamImage);
router.delete('/teams/:id/image', teamIdValidation, handleValidation, deleteTeamImage);

module.exports = router;