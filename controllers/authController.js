const groupModel = require('../models/groupModel');
const otpController = require('./otpController');

module.exports.signup = async (req, res) => {
    try {
        if (req.body.emails.length > 5) {
            res.json({ err: "Cannot add More than 5 Emails For Group" });
        }
        else if (req.body.emails.length < 1) {
            res.json({ err: "One Email is required to Create a Group" });
        }
        else {
            const group = await groupModel.find({ name: req.body.name });
            if (group.length > 0) {
                const err = "Group Already Exist";
                res.json({ err });
            }
            else {
                const result = await groupModel.create({ name: req.body.name, emails: req.body.emails });
                res.json({ result });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.json({ err });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { name, emailaddress } = req.body;
        const group = await groupModel.find({ name: name });
        if (group.length > 0) {
            console.log(group[0].emails);
            console.log(group[0].emails.indexOf(emailaddress))
            if (group[0].emails.indexOf(emailaddress)>= 0) {
                const id = await otpController.sendOtp(emailaddress);
                if (id.command) {
                    throw err;
                }
                else {
                    res.json({ id ,name:group[0].name,groupId:group[0]._id});
                }
            }
            else {
                res.json({ err: "Email Address is Not Registered With this Group" });
            }
        }
        else {
            res.json({ err: "Group Dosn't Exists Please Signup First" });
        }
    }
    catch (err) {
        res.json({ err: "Some Server Error Occured" });
    }
}
