const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    countryName: String,
    continent: String 
});

module.exports = mongoose.model('Country', countrySchema);