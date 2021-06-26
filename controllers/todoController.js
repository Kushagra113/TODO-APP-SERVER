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

module.exports.deleteTodo = async (req,res) =>{
    try{
        const result = await todoModel.deleteOne({_id:req.params.id})
        res.json({"success":"Todo Successfully Deleted"});
    }
    catch(err){
        res.json({err});
    }
}

module.exports.deleteAllTodosWithCategory = async (categoryId)=>{
    try{
        const result = await todoModel.deleteMany({categoryId:categoryId});
        return "Success";
    }
    catch(err){
        return err;
    }
}

module.exports.editTodo = async(req,res)=>{
    console.log("Request Coming?");
    try{
        const result = await todoModel.findByIdAndUpdate({_id:req.params.id},{$set:{title:req.body.title,description:req.body.description}},{useFindAndModify: false});
        res.json({success:"Todo SuccessFully Updated"});
    }
    catch(err){
        res.json({err:"Some Error Occured While Updating Todo Please Try Again Later"});
    }
}

