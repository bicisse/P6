const express= require('express');
const router = express.Router();
router.use(express.json());
const User = require(`../models/user`);


router.post('/signup',(req,res)=>{
    delete req.body._id; 
    const signUp = new User({
      ...req.body
    });

    signUp.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({WARNING: error.message }));
    console.log('signUp ==>', signUp);
});

router.post('/login',(req,res)=>{
 
    User.find()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
});


module.exports = router;