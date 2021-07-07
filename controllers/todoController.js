const todoModel = require('../models/todosModel');

module.exports.addTodo = async (req,res)=>{
    const { categoryId ,title, description ,status,groupId }= req.body;
    try{
        const result = await todoModel.create({categoryId, title, description ,status,groupId});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getAllTodos = async (req,res)=>{
    const {categoryId,groupId } = req.body
    try{
        const result = await todoModel.find({categoryId,groupId});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getCompletedTodos = async (req,res)=>{
    const {categoryId ,limit,skip,groupId} = req.body
    try{
        const result = await todoModel.find({categoryId,status:"C",groupId}).limit(limit).skip(skip);
        // .limit(2).skip(2)
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getNotCompletedTodos = async (req,res)=>{
    const {categoryId,limit,skip ,groupId} = req.body
    try{
        const result = await todoModel.find({categoryId,status:"NC",groupId}).limit(limit).skip(skip);
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.MarkasComplete = async (req,res)=>{
    const {categoryId , todoId,groupId} = req.body
    try{
        const result = await todoModel.updateOne({_id:todoId ,categoryId:categoryId,status:"NC",groupId},{$set:{status:"C"}});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.MarkasNotComplete = async (req,res)=>{
    const {categoryId , todoId,groupId} = req.body
    try{
        const result = await todoModel.updateOne({_id:todoId ,categoryId:categoryId,status:"C",groupId},{$set:{status:"NC"}});
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteTodo = async (req,res) =>{
    const { groupId } = req.body;
    try{
        const result = await todoModel.deleteOne({_id:req.params.id,groupId})
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
    try{
        const result = await todoModel.findByIdAndUpdate({_id:req.params.id},{$set:{title:req.body.title,description:req.body.description}},{useFindAndModify: false});
        res.json({success:"Todo SuccessFully Updated"});
    }
    catch(err){
        res.json({err:"Some Error Occured While Updating Todo Please Try Again Later"});
    }
}

// module.exports.completeAndNotCompletedTodos = async(req,res) =>{
//     try{
//         const Completed = await todoModel.countDocuments({status:'C',categoryId:req.body.categoryId});
//         const Notcompleted = await todoModel.countDocuments({status:'NC',categoryId:req.body.categoryId});
//         res.json({Completed,Notcompleted});
//     }
//     catch(err){
//         res.json({err:"Some Error Occured While Retreiving Data"})
//     }
// }

