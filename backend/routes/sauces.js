const express= require('express');
const router = express.Router();
router.use(express.json());
const multer = require('../middleware/multer-config');

const authMiddleware = require('../middleware/auth')
const saucesController = require('../controllers/sauces');


router.post("/:id/like", authMiddleware, saucesController.likeSauce);

router.route('/:id')
    .get(authMiddleware, saucesController.getASauce)
    .put(authMiddleware, multer, saucesController.updateASauce)
    .delete(authMiddleware, saucesController.deleteASauce);




router.route('/')
    .get(authMiddleware, saucesController.getAllSauces)
    .post(authMiddleware, multer, saucesController.createASauce);

module.exports = router
