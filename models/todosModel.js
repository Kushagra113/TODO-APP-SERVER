const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    categoryId:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },

})

const todoModel = mongoose.model("todos",todoSchema);

module.exports = todoModel;