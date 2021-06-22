const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');

router.post('/',categoryController.addCatergory)
router.get('/all',categoryController.getAllCategories);

module.exports = router