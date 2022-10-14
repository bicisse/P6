const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    userId: {tyoe: String, required: true},
    like : {type: Number, required: true}

});

module.exports = mongoose.models ('Like', likeSchema);