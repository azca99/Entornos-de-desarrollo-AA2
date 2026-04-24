const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        // Mensaje del primer error
        message: errors.array()[0].msg,
        // Lista de todos los errores
        errors: errors.array()
    });
};

module.exports = { handleValidation };