const { Schema, model } = require('mongoose');

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

IngredientSchema.method('toJSON', function json() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Ingredient', IngredientSchema);
