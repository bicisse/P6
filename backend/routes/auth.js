const express= require('express');
const router = express.Router();
router.use(express.json());
const Login = require(`../models/login`);
const SignUp = require(`../models/signup`);

router.post('/signup',(req,res)=>{
    delete req.body._id; 
    const signUp = new SignUp({
      ...req.body
    });

    signUp.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({WARNING: error.message }));
    console.log('signUp ==>', signUp);
});

router.post('/login',(req,res)=>{
 
    Login.find()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
});


module.exports = router;