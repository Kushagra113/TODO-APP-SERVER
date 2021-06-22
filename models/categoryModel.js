const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    }
})

const categoryModel = mongoose.model("categories",categorySchema);

module.exports = categoryModel;