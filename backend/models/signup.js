const mongoose = require('mongoose');

const signUpSchema = mongoose.Schema({
    email: {tyoe: String, required: true},
    password: {type: String, required: true}

});

module.exports = mongoose.models ('SignUp', signUpSchema);