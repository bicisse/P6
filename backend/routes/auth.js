const express= require('express');
const router = express.Router();


router.get('/', (req, res)=> {
    console.log('Test GET /');
    res.send('Test GET /');
})

// router.post('/', (req, res)=>{
//     console.log('Test POST /sauces');
//     res.render('Test post /sauces')
// })

router.post('/', (req, res) =>{
    console.log('Auth test POST /');
    res.send('Auth test POST /');
});

router.route('/:id')
.get((req,res) =>{
    console.log(req.user);
    res.send(`Get User With ID ${req.params.id}`)
})
.put((req,res) =>{
    req.params.id
    res.send(`Update User With ID ${req.params.id}`)
})
.delete((req,res) =>{
    req.params.id
    res.send(`Delete User With ID ${req.params.id}`)
});

const users = [{name : 'Harry'}, {name : 'Hermione'}];
router.param('id', (req, res, next, id)=>{
    req.user = users[id]
    next()
})

module.exports = router