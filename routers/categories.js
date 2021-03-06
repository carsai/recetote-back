const express = require('express');
const { check } = require('express-validator');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controller/categories');
const { validarCampos } = require('../middleware/validarCampos');

const router = express.Router();

router.get('/', getAllCategories);

router.put(
  '/',
  [check('nombre', 'Es obligatorio').toUpperCase().notEmpty(), validarCampos],
  createCategory,
);

router.post('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
