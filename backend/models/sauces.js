const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    sauce: {tyoe: String, required: true},
    image : {type: File, required: true}

});

module.exports = mongoose.models ('Sauces', saucesSchema);