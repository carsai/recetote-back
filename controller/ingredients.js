const Ingredient = require('../models/Ingredient');

/**
 * @type import('express').RequestHandler
 */
const getAllIngredients = async (_req, res) => {
  try {
    const ingredients = await Ingredient.find();

    return res.json({
      ok: true,
      ingredients,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

/**
 * @type import('express').RequestHandler
 */
const createIngredient = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);

    const ingredientDB = await ingredient.save();

    return res.status(201).json({
      ok: true,
      ingredient: ingredientDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

/**
 * @type import('express').RequestHandler
 */
const updateIngredient = async (req, res) => {
  try {
    const { id, ...ingredientToUpdate } = req.body;

    let ingredientToUpdateImg = ingredientToUpdate;

    if (req.fileVal) {
      const base64img = req.fileVal.buffer.toString('base64');

      ingredientToUpdateImg = {
        ...ingredientToUpdateImg,
        image: base64img,
      };
    }

    const newIngredient = await Ingredient.findByIdAndUpdate(
      id,
      ingredientToUpdateImg,
      { new: true },
    );

    return res.json({
      ok: true,
      ingredient: newIngredient,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

/**
 * @type import('express').RequestHandler
 */
const deleteIngredient = async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);

    return res.json({
      ok: true,
      api: 'Ingrediente borrado',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
