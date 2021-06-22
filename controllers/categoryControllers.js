const categoryModel = require('../models/categoryModel');

module.exports.addCatergory = async (req,res)=>{
    const { text } = req.body;
    try{
        const result = await categoryModel.create({text});
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}


module.exports.getAllCategories = async (req,res)=>{
    try{
        const result = await categoryModel.find();
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}
