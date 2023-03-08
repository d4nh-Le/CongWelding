const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const weldingSpecsSchema = new Schema({
    model: {type: String, required: true},
    technology: {type: String, required: true},
    powerSupply: {type: String, required: true},
    powerConsumption: {type: String, required: true},
    noLoadVoltage: {type: String, required: true},
    weldingCurrent: {type: String, required: true},
    efficiency: {type: String, required: true},
    weldingRodSize: {type: String, required: true},
    dimensions: {type: String, required: true},
    weight: {type: String, required: true},
    accessories: {type: String, required: true},
    origin: {type: String, required: true},
    _id: false // Disables default Mongoose id generation
});

module.exports = weldingSpecsSchema;