const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: { type: String, default: [] }
});

roleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('role', roleSchema);