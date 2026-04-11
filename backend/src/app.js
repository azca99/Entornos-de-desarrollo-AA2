// Librerías
const express = require('express');
const cors = require('cors');

const teams = require('./route/teams.js');

// Aplicación
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/', teams);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});