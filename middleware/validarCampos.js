const { validationResult } = require('express-validator');

/**
 *
 * @type import('express').RequestHandler
 */
const validarCampos = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      ok: false,
      error: error.mapped(),
    });
  }

  return next();
};

module.exports = {
  validarCampos,
};
