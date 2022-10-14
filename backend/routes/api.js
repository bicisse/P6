const express= require('express');
const router = express.Router();

router.get('/',(req, res) =>{
    res.json(200,{message : 'Harry Potter'
})
})



module.exports = router;