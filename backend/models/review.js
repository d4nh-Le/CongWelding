const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    rating: { type: Number, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);


