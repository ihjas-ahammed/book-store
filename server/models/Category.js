const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: String, required: true },
  price: { type: String, required: true },
  priceOld: { type: String, default: null },
  description: { type: String },
  author: { type: String }
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [ItemSchema]
});

module.exports = mongoose.model('Category', CategorySchema);
