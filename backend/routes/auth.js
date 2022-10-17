const express= require('express');
const router = express.Router();
router.use(express.json());

const userController = require('../controllers/auth');


router.post('/signup',userController.signUp);

router.post('/login',userController.login);


module.exports = router;