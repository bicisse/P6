const express= require('express');
const router = express.Router();

router.route('/')
    .get((req, res)=> {
            console.log('Test GET SAUCES /');
            res.send('Test GET SAUCES /');
        })
    .post((req, res) =>{
            console.log('test POST SAUCES /');
            res.send('test POST SAUCES/');
        });

router.route('/:id')
    .get((req,res) =>{
        res.send('test GET SAUCES ID ');
    })
    .put((req,res) =>{
        req.params.id
        res.send('test PUT SAUCES ID ');
    })
    .delete((req,res) =>{
        req.params.id
        res.send('test DELETE SAUCES ID ');
    });

router.post("/:id/like", (req, res)=>{
    console.log('test POST /');
     res.send('test POST SAUCES ID LIKE ');
})



module.exports = router