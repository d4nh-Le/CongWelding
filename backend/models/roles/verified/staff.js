const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const staffSchema = new Schema({
    firstName: { type: String, required: true },
    lastName : { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: null },
    sessionId : { type: String }
});

staffSchema.plugin(uniqueValidator);

module.exports = mongoose.model('staff', staffSchema);