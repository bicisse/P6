const express= require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesController = require('../controllers/sauces');

router.route('/')
    .get(saucesController.getAllSauces)
    .post(saucesController.createSauces);

router.route('/:id')
    .get(saucesController.getOneSauce)
    .put(saucesController.modifySauce)
    .delete(saucesController.deleteSauce);

router.post("/:id/like", saucesController.likeSauce);



module.exports = router
