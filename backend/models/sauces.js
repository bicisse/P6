const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    sauce: {type: String, required: true},
    image : {
        data: Buffer,
        contentType: String
    }

});

module.exports = mongoose.model('Sauces', saucesSchema);