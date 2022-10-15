const express= require('express');
const router = express.Router();
const Sauces = require(`../models/sauces`);
//router.use(express.json());

const sauceController = require('../controllers/sauces');


router.route('/')
    .get(sauceController.getAllSauces)
    .post(sauceController.createSauces);

router.route('/:id')
    .get(sauceController.getOneSauce)
    .put(sauceController.modifySauce)
    .delete(sauceController.deleteSauce);

router.post("/:id/like", sauceController.likeSauce);



module.exports = router


// SAUVEGARDE
/**
 * 
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
        Sauces.findOne({ userId: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
    })
    .put((req,res) =>{
        router.put('/api/stuff/:id', (req, res, next) => {
            Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Objet modifié !'}))
              .catch(error => res.status(400).json({ error }));
          });
    })
    .delete((req,res) =>{
        router.delete('/api/stuff/:id', (req, res, next) => {
            Sauces.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
              .catch(error => res.status(400).json({ error }));
          });
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
 */