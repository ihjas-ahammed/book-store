const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  id: { type: Number, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  priceOld: { type: Number }, 
  description: { type: String, required: true },
  author: { type: String, required: true }
});

const OrderSchema = new Schema({
  item: { type: ItemSchema, required: true },
  count: { type: Number, required: true},
  status: { type: String, required: true, default: "Requested" }
});

const Orders = new Schema({
  username: { type: String, required: true },
  orders: { type: [OrderSchema], default: [] }
});

module.exports = mongoose.model('Orders', Orders);
