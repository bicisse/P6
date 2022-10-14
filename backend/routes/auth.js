const express= require('express');
const router = express.Router();
router.use(express.json());

router.post('/signup',(req,res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.send('TEST POST AUTH SIGNUP');
    console.log(req.body);
    res.send('Done')

    /*
    {
        email: string,
        password : string

    }
    */
});
router.post('/login',(req,res)=>{
    res.send('TEST POST AUTH LOGIN');
    console.log(req.body);
    res.send('Done')
     /*
    {
        email: string,
        password : string

    }
    */
});
module.exports = router;