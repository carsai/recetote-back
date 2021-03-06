const Category = require('../models/Category');

/**
 *
 * @type import('express').RequestHandler
 */
const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find();

    return res.json({
      ok: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

/**
 *
 * @type import('express').RequestHandler
 */
const createCategory = async (req, res) => {
  try {
    if (req.fileVal) {
      const base64img = req.fileVal.buffer.toString('base64');

      req.body = {
        ...req.body,
        image: base64img,
      };
    }

    const category = new Category(req.body);

    const categoryDB = await category.save();

    return res.status(201).json({
      ok: true,
      category: categoryDB,
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: 'La categoría ya existe',
      });
    }

    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

/**
 *
 * @type import('express').RequestHandler
 */
const updateCategory = async (req, res) => {
  try {
    const { id, ...categoryToUpdate } = req.body;

    let categoryToUpdateImg = categoryToUpdate;

    if (req.fileVal) {
      const base64img = req.fileVal.buffer.toString('base64');

      categoryToUpdateImg = {
        ...categoryToUpdateImg,
        image: base64img,
      };
    }

    const newCategory = await Category.findByIdAndUpdate(id, categoryToUpdateImg, {
      new: true,
    });

    return res.json({
      ok: true,
      category: newCategory,
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: 'La categoría ya existe',
      });
    }

    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

/**
 *
 * @type import('express').RequestHandler
 */
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    return res.json({
      ok: true,
      api: 'Categoría borrada',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
