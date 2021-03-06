/**
 *
 * @type import('express').RequestHandler
 */
const noApi = (_req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'API no encontrada',
  });
};

module.exports = {
  noApi,
};
