const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const weldingSpecsSchema = require('./weldingSpecs');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: {type: String, required: true},
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, require: true },
    weldingSpecs: { type: weldingSpecsSchema, required: false }
});

productSchema.plugin(uniqueValidator);
productSchema.index({ name: 1, 'weldingSpecs.model': 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);


