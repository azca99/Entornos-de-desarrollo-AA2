const express = require('express');
const router = express.Router();

const { getTeams, getTeamById, postTeam, putTeam, deleteTeam } = require('../controller/teams.js');

const {handleValidation } = require('../middleware/validation.js');
const { teamValidation, teamIdValidation } = require('../validation/teams.js');

router.get('/teams', getTeams);

router.get('/teams/:id', teamIdValidation, handleValidation, getTeamById);
router.post('/teams', teamValidation, handleValidation, postTeam);
router.put('/teams/:id', teamIdValidation, teamValidation, handleValidation, putTeam);
router.delete('/teams/:id', teamIdValidation, handleValidation, deleteTeam);

module.exports = router;