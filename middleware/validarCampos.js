const { validationResult } = require('express-validator');

/**
 *
 * @type import('express').RequestHandler
 */
const validarCampos = (req, res, next) => {
  const error = validationResult(req);
  const errorFiles = req.fileError;

  const allErrors = [];

  if (!error.isEmpty()) {
    allErrors.push(error.mapped());
  }

  if (errorFiles) {
    allErrors.push(errorFiles);
  }

  if (allErrors.length > 0) {
    return res.status(400).json({
      ok: false,
      error: allErrors,
    });
  }

  return next();
};

module.exports = {
  validarCampos,
};
