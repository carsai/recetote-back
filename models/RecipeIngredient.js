const { Schema, model } = require('mongoose');

const RecipeIngredientSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
  },
  ingredient: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

RecipeIngredientSchema.method('toJSON', function json() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('RecipeIngredient', RecipeIngredientSchema);
