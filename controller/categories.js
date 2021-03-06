const Category = require('../models/category');

/**
 *
 * @type import('express').RequestHandler
 */
const getAllCategories = async (_req, res) => {
  const categories = await Category.find();

  res.json({
    ok: true,
    categories,
  });
};

/**
 *
 * @type import('express').RequestHandler
 */
const createCategory = async (req, res) => {
  const category = new Category(req.body);

  const categoryDB = await category.save();

  res.json({
    ok: true,
    category: categoryDB,
  });
};

/**
 *
 * @type import('express').RequestHandler
 */
const updateCategory = (req, res) => {
  res.json({
    ok: true,
    api: `updateCategory ${req.params.id}`,
  });
};

/**
 *
 * @type import('express').RequestHandler
 */
const deleteCategory = (req, res) => {
  res.json({
    ok: true,
    api: `deleteCategory ${req.params.id}`,
  });
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
