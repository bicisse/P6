const express= require('express');
const router = express.Router();
router.use(express.json());

router.route('/')
    .get((req, res)=> {
            res.send('Test GET SAUCES /');
        })
    .post((req, res) =>{
            res.send('test POST SAUCES/');



             /*
    {
        sauce: string,
        image : file

    }
    */
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
     res.send('test POST SAUCES ID LIKE ');
      /*
    {
        userId: string,
        like: number

    }
    */
})



module.exports = router