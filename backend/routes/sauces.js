const express= require('express');
const router = express.Router();
const Sauces = require(`../models/sauces`);
const Like = require(`../models/like`);

router.use(express.json());


router.route('/')
    .get((req, res)=> {
            res.send('Test GET SAUCES /');
        })
    .post((req, res) =>{
            delete req.body._id; 
            const newPostSauce = new Sauces({
              ...req.body
            });
            newPostSauce.save()
              .then(() => res.status(201).json({ message: 'SAUCE enregistrée !'}))
              .catch(error => res.status(400).json(error.message ));
            console.log('post sauces ==>', newPostSauce);

            
        });

router.route('/:id')
    .get((req,res) =>{
        res.send('test GET SAUCES ID ');
    })
    .put((req,res) =>{
        res.send('test PUT SAUCES ID ');
    })
    .delete((req,res) =>{
        res.send('test DELETE SAUCES ID ');
    });

router.post("/:id/like", (req, res)=>{
    delete req.body._id; 
            const newPostLike = new Like({
              ...req.body
            });
            newPostLike.save()
              .then(() => res.status(201).json({ message: 'LIKE enregistré !'}))
              .catch(error => res.status(400).json({WARNING: error.message }));
            console.log('post like ==>', newPostLike);

})



module.exports = router