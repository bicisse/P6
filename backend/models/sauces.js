const mongoose = require('mongoose');

// const usersLikedSchema = mongoose.Schema({
//     sauce : {type: String},
//     image : {type: Buffer}
// });

const saucesSchema = mongoose.Schema({
    userId : {type: String},
    name : {type: String},
    manufacturer : {type: String},
    description : {type: String},
    mainPepper : {type: String},
    imageUrl : {  type: String },
    heat : {type: Number},
    likes : {type: Number},
    dislikes : {type: Number},
    usersLiked : [],
    usersDisliked :[]
    

});

module.exports = mongoose.model('Sauces', saucesSchema);