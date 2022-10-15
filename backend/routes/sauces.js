const express= require('express');
const router = express.Router();
const Sauces = require(`../models/sauces`);


router.use(express.json());


router.route('/')
    .get((req, res)=> {
        Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
        })
    .post((req, res) =>{
            delete req.body._id; 
            const sauces = new Sauces({
              ...req.body
            });
            sauces.save()
              .then(() => res.status(201))
              .catch(error => res.status(400).json(error ));
           

            
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
            const like = new Sauce({
              ...req.body
            });
            like.save()
              .then(() => res.status(201).json({ message: 'LIKE enregistré !'}))
              .catch(error => res.status(400).json({WARNING: error.message }));
            console.log('post like ==>', like);

})



module.exports = router