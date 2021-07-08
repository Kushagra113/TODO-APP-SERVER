const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/',authMiddleware.isSigned,categoryController.addCatergory)
router.get('/all/:id',authMiddleware.isSigned,categoryController.getAllCategories);
router.delete('/delete/:id',authMiddleware.isSigned,categoryController.deleteCategory);


module.exports = router