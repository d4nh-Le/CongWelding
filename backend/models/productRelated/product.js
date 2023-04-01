const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const weldingSpecsSchema = require('./weldingSpecs');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: {type: String, required: true},
    price: { type: Number, required: true },
    images: {
        type: [{
            url: { type: String, required: true },
            alt: { type: String }
        }], required: [
            () => this.images  && this.images.length > 0,
            'Product must have at least one image'
        ]
    },
    quantity: { type: Number, require: true },
    weldingSpecs: { type: weldingSpecsSchema }
});

productSchema.plugin(uniqueValidator);
productSchema.index({ name: 1, 'weldingSpecs.model': 1 }, { unique: true });

module.exports = mongoose.model('product', productSchema);


