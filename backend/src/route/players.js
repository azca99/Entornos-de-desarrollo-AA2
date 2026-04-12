const express = require('express');
const router = express.Router();

const { getPlayers, getPlayerByName, getPlayerById, postPlayer, putPlayer, deletePlayer } = require('../controller/players.js');

// Rutas para jugadores
router.get('/players', getPlayers);
router.get('/players/search', getPlayerByName);
router.get('/players/:id', getPlayerById);
router.post('/players', postPlayer);
router.put('/players/:id', putPlayer);
router.delete('/players/:id', deletePlayer);

module.exports = router;