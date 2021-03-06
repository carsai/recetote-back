const express = require('express');
const {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require('../controller/ingredients');

const router = express.Router();

router.get('/', getAllIngredients);

router.put('/', createIngredient);

router.post('/', updateIngredient);

router.delete('/:id', deleteIngredient);

module.exports = router;
