const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    orderNumber: { type: String, required: true, unique: true },
    orderDate: {type: Date, required: true },
    orderStatus: {type: String, required: true },
    shippingAddress: { type: Object, required: true },
    billingAddress: { type: Object, required: true }, // shipping address and bill address are required as they can be different.
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    items: { type: Object, required: true } // gonna get the info from the cart and clear it on order confirmation
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('order', orderSchema);