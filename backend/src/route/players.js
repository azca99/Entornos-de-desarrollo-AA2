const express = require('express');
const router = express.Router();

const { getPlayers, getPlayerByName, getPlayerById, postPlayer, putPlayer, deletePlayer } = require('../controller/players.js');

const { handleValidation } = require('../middleware/validation.js');
const { playerValidation, playerIdValidation, playerSearchValidation } = require('../validation/players.js');

// Rutas para jugadores
router.get('/players', getPlayers);

router.get('/players/search', playerSearchValidation, handleValidation, getPlayerByName);
router.get('/players/:id', playerIdValidation, handleValidation, getPlayerById);
router.post('/players', playerValidation, handleValidation, postPlayer);
router.put('/players/:id', playerIdValidation, playerValidation, handleValidation, putPlayer);
router.delete('/players/:id', playerIdValidation, handleValidation, deletePlayer);

module.exports = router;