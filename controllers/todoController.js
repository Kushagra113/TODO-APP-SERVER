const todoModel = require('../models/todosModel');

module.exports.addTodo = async (req,res)=>{
    const {categoryId , title, description ,status }= req.body;
    try{
        const result = await todoModel.create({categoryId, title, description ,status});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getAllTodos = async (req,res)=>{
    const {categoryId } = req.body
    try{
        const result = await todoModel.find({categoryId});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getCompletedTodos = async (req,res)=>{
    const {categoryId } = req.body
    try{
        const result = await todoModel.find({categoryId:categoryId,status:"C"});
        // .limit(2).skip(2)
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getNotCompletedTodos = async (req,res)=>{
    const {categoryId } = req.body
    try{
        const result = await todoModel.find({categoryId,status:"NC"});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.MarkasComplete = async (req,res)=>{
    const {categoryId , todoId} = req.body
    try{
        const result = await todoModel.updateOne({_id:todoId ,categoryId:categoryId,status:"NC"},{$set:{status:"C"}});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.MarkasNotComplete = async (req,res)=>{
    const {categoryId , todoId} = req.body
    try{
        const result = await todoModel.updateOne({_id:todoId ,categoryId:categoryId,status:"C"},{$set:{status:"NC"}});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}
