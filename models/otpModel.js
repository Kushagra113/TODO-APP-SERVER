const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    }
})

const otpModel = mongoose.model("otp",otpSchema);

module.exports = otpModel;