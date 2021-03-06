const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

// router.get('/CompleteNumber',todoController.completeAndNotCompletedTodos);
router.post('/',authMiddleware.isSigned,todoController.addTodo);
router.post('/all',authMiddleware.isSigned,todoController.getAllTodos);
router.post('/completed',authMiddleware.isSigned,todoController.getCompletedTodos);
router.post('/Notcompleted',authMiddleware.isSigned,todoController.getNotCompletedTodos);
router.put('/Markcomplete',authMiddleware.isSigned,todoController.MarkasComplete);
router.put('/Marknotcomplete',authMiddleware.isSigned,todoController.MarkasNotComplete);
router.put('/edit/:id',authMiddleware.isSigned, todoController.editTodo);
router.delete('/delete/:id',authMiddleware.isSigned,todoController.deleteTodo);

module.exports = router;