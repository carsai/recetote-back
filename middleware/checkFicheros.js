/**
 * @param {String} campo
 * @param {Boolean} obligatorio
 * @returns {import('express').RequestHandler}
 */
const checkOneFicherosImg = (campo, obligatorio = false) => (
  req,
  _res,
  next,
) => {
  const image = req.files && req.files.length > 0
    ? req.files.filter(({ fieldname }) => fieldname === campo)
    : undefined;

  if (!image || image.length === 0) {
    if (obligatorio) {
      req.fileError = {
        [campo]: {
          msg: 'Es obligatorio',
          param: campo,
          location: 'file',
        },
      };
    }

    return next();
  }

  const { mimetype } = image[0];

  if (mimetype.split('/')[0] !== 'image') {
    req.fileError = {
      [campo]: {
        msg: 'No es una imagen valida',
        param: campo,
        location: 'file',
      },
    };
  }

  const [file] = image;

  req.fileVal = file;

  return next();
};

module.exports = {
  checkOneFicherosImg,
};
