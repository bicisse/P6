const express= require('express');
const router = express.Router();


router.post('/signup',(req,res)=>{
    res.send('TEST POST AUTH SIGNUP')
});
router.post('/login',(req,res)=>{
    res.send('TEST POST AUTH LOGIN')
});
module.exports = router;