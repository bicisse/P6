const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    email: {tyoe: String, required: true},
    password: {type: String, required: true}

});

module.exports = mongoose.models ('Login', loginSchema);