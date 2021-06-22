const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/',todoController.addTodo);
router.post('/all',todoController.getAllTodos);
router.post('/completed',todoController.getCompletedTodos);
router.post('/Notcompleted',todoController.getNotCompletedTodos);
router.put('/Markcomplete',todoController.MarkasComplete);
router.put('/Marknotcomplete',todoController.MarkasNotComplete);

module.exports = router;