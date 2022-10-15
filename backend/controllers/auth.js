
const User = require(`../models/user`);

//▶▶▶▶▶ SIGN IN
exports.signIn = (req, res, next) => {
    delete req.body._id; 
    const signUp = new User({
      ...req.body
    });

    signUp.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({error}));
    
};

//▶▶▶▶▶ LOG IN
exports.login = (req, res, next) => {
    User.find()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
};