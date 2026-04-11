const express = require('express');
const router = express.Router();

const { getTeams, getTeamById, postTeam, putTeam, deleteTeam } = require('../controller/teams.js');

router.get('/teams', getTeams);
router.get('/teams/:id', getTeamById);
router.post('/teams', postTeam);
router.put('/teams/:id', putTeam);
router.delete('/teams/:id', deleteTeam);

module.exports = router;