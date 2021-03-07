const express = require('express');
const { check } = require('express-validator');
const {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require('../controller/ingredients');
const { checkOneFicherosImg } = require('../middleware/checkFicheros');
const { validarCampos } = require('../middleware/validarCampos');

const router = express.Router();

router.get('/', getAllIngredients);

router.put(
  '/',
  [
    check('name').trim().notEmpty(),
    checkOneFicherosImg('img', false),
    validarCampos,
  ],
  createIngredient,
);

router.post(
  '/',
  [checkOneFicherosImg('img', false), validarCampos],
  updateIngredient,
);

router.delete('/:id', deleteIngredient);

module.exports = router;
