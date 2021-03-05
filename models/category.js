const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
  nombre: {
    type: String,
    require: true
  },
  imagen: {
    type: String,
    require: true
  }
})

CategorySchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = model('Category', CategorySchema)
