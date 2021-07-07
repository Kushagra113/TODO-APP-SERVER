const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emails:{
        type:[{type:String}]
    }
})

const groupModel = mongoose.model("group",groupSchema);

module.exports = groupModel;