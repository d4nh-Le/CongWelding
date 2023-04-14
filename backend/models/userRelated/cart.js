const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const cartItemSchema = require('./cartItem');

const cartSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: { type: [cartItemSchema], required: true },
  _id: false // Disables default Mongoose id generation
});

cartSchema.plugin(uniqueValidator);

module.exports = mongoose.model('cart', cartSchema);