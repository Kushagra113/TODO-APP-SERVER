const nodeMailer = require('nodemailer');
const otpModel = require('../models/otpModel');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const groupController = require('./authController');

// Configuring Enviromental Variables
require('dotenv').config();

module.exports.sendOtp = async (emailaddress) => {
    try{
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.emailAddress,
                pass: process.env.appPassword
            }
        });
        var otp = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });
        let requestId = await otpModel.create({ email: emailaddress, otp });
        // console.log(requestId);
        const mailOptions = {
            from: process.env.emailAddress,
            to: emailaddress,
            subject: 'OTP For Your Account',
            text: `OTP is ${otp}`,
        };
    
        await transporter.sendMail(mailOptions);
        return requestId._id;
    }
    catch(err){
        return err;
    }
}

module.exports.verifyOtp = async (req, res) => {
    const { id, otp, name, emails } = req.body;
    const result = await otpModel.findOne({ _id: id, otp: otp });
    if (result) {
        let accessToken = await jwt.sign({
            email: result.email,
        }, process.env.jwtSecret, { expiresIn: '1 day' });
        res.json({ accessToken });
    }
    else {
        res.json({ accessToken: null });
    }
}