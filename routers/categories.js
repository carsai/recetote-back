const express = require('express');
const { check } = require('express-validator');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controller/categories');
const { validarCampos } = require('../middleware/validarCampos');
const { checkOneFicherosImg } = require('../middleware/checkFicheros');

const router = express.Router();

router.get('/', getAllCategories);

router.put(
  '/',
  [
    check('name', 'Es obligatorio').toUpperCase().trim().notEmpty(),
    checkOneFicherosImg('img'),
    validarCampos,
  ],
  createCategory,
);

router.post(
  '/',
  [
    check('id', 'Es obligatorio').notEmpty(),
    check('name', 'Es obligatorio').toUpperCase().trim(),
    checkOneFicherosImg('img'),
    validarCampos,
  ],
  updateCategory,
);

router.delete('/:id', deleteCategory);

module.exports = router;
