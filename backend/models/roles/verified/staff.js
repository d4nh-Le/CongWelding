const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const staffSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true},
    role: { type: String, default: null },
    sessionId : { type: String }
});

staffSchema.plugin(uniqueValidator);

module.exports = mongoose.model('staff', staffSchema);