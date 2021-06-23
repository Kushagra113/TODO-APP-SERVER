const nodeMailer = require('nodemailer');
const otpModel = require('../models/otpModel');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');

// Configuring Enviromental Variables
require('dotenv').config();

module.exports.sendOtp = async (req, res) => {
    const { emailaddress } = req.body;
    if(emailaddress=="tibrewalkushagra@gmail.com" || emailaddress=="yashkush.tibrewal@gmail.com" || emailaddress=="tibrewalmadhu8@gmail.com" || emailaddress=="pankaj@empeetex.com"){
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.emailAddress,
                pass: process.env.appPassword
            }
        });
        var otp = otpGenerator.generate(4,{alphabets:false,upperCase: false, specialChars: false});
        let requestId = await otpModel.create({email:emailaddress,otp});
        res.json({id:requestId._id});
        const mailOptions = {
            from: process.env.emailAddress,
            to: emailaddress,
            subject: 'OTP For Your Account',
            text: `OTP is ${otp}`,
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({error:"Some Error Occured While Sending Email Please Try Again Later"});
            } else {
                res.json({id:requestId._id});
                // ,info
            }
        });
    }
    else{
        res.json({error:"Not Authorised to Send Request"});
    }
}

module.exports.verifyOtp = async (req, res) => {
    const { id,otp } = req.body;
    const result = await otpModel.findOne({_id:id,otp:otp});
    if(result){
        let accessToken =  await jwt.sign({
            email:result.email,
        },process.env.jwtSecret,{expiresIn:'1 day'})
        res.json({accessToken});
    }
    else{
        res.json({accessToken:null});
    }

}