const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/',authMiddleware.isSigned,categoryController.addCatergory)
router.get('/all',authMiddleware.isSigned,categoryController.getAllCategories);

module.exports = router