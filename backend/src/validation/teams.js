// body para validar los datos enviados en el cuerpo de la solicitud
// param para validar los parámetros de la URL
const { body, param } = require('express-validator');

// Validación para la creación y actualización de equipos
const teamValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio'),

    body('city')
        .trim()
        .notEmpty()
        .withMessage('La ciudad es obligatoria'),

    body('sport')
        .trim()
        .notEmpty()
        .withMessage('El deporte es obligatorio')
];

// Validación para el ID del equipo
const teamIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID del equipo debe ser un número entero positivo')
];

module.exports = { teamValidation, teamIdValidation };