// Librerías
const express = require('express');
const cors = require('cors');
const path = require('path');

// Aplicación
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GET equipos
app.get('/equipos', (req, res) => {
  const sql = 'SELECT * FROM equipos';

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({
        message: 'Error al obtener los equipos',
        error: error.message});
    }

    res.status(200).json(rows);
  });
});

// GET equipos por id
app.get('/equipos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM equipos WHERE id = ?';

  db.get(sql, [id], (error, row) => {
    if (error) {
      return res.status(500).json({message: 'Error al obtener el equipo'});
    }
    if (!row) {
      return res.status(404).json({message: 'Equipo no encontrado'});
    }

    res.status(200).json(row);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});