const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  id: { type: Number, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  priceOld: { type: Number }, // optional field
  description: { type: String, required: true },
  author: { type: String, required: true }
});

const CartItemSchema = new Schema({
  item: { type: ItemSchema, required: true },
  count: { type: Number, required: true, default: 1 }
});

const CartSchema = new Schema({
  username: { type: String, required: true },
  cartItems: { type: [CartItemSchema], default: [] }
});

module.exports = mongoose.model('Cart', CartSchema);
