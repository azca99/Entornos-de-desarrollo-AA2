// body para validar los datos enviados en el cuerpo de la solicitud
// param para validar los parámetros de la URL
// query para validar los parámetros de consulta en la URL
const { body, param, query } = require('express-validator');

const playerValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    
    body('birth_date')
        .trim()
        .notEmpty()
        .withMessage('La fecha de nacimiento es obligatoria')
        .matches(/^\d{2}-\d{2}-\d{4}$/)
        .withMessage('La fecha debe tener formato dd-mm-yyyy'),

    body('position')
        .trim()
        .notEmpty()
        .withMessage('La posición es obligatoria'),

    body('id_team')
        .isInt({ min: 1 })
        .withMessage('El ID del equipo debe ser un número entero positivo')
];

const playerIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID del jugador debe ser un número entero positivo')
];

const playerSearchValidation = [
    query('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre no puede estar vacío')
];

module.exports = { playerValidation, playerIdValidation, playerSearchValidation };
