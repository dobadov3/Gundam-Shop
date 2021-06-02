var data = require('../layout.data');
var Account = require('../models/account.model');
var Role = require('../models/role.model');
var md5 = require('md5');
const e = require('express');

module.exports.get = async function(req, res) {

    res.render('./authentication/index', {
        data: data.data
    });
};

module.exports.postLogin = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = await Account.findOne({ email: email });
    var userByUserName = await Account.findOne({username: email});

    if(!user && !userByUserName){
        res.render("./authentication/index", {
            error: "Account doesn't exits!",
            data: data.data,
            values: req.body,
        });
        return;
    }else{
        if(user){
            if (md5(password) !== user.password) {
                res.render("./authentication/index", {
                    error: "Wrong password!",
                    data: data.data,
                    values: req.body,
                });
                return;
            }
    
            res.cookie("userID", user.id, {
                signed: true,
            });
        }else{
            if (md5(password) !== userByUserName.password) {
                res.render("./authentication/index", {
                    error: "Wrong password!",
                    data: data.data,
                    values: req.body,
                });
                return;
            }
    
            res.cookie("userID", userByUserName.id, {
                signed: true,
            });
        }
    }
 
    res.redirect('/home');
};

module.exports.logout = function(req, res) {
    res.clearCookie("userID");
    res.redirect('/home');
}

module.exports.postSignUp = async function(req, res) {
    req.body.email = req.body.emailSignUp;
    var password = req.body.passwordSignUp;
    var confirmPass = req.body.confirmPassword;
    var errorSignUp = "";
    var newUser = new Account(req.body);
    var delivery_address = {
        name: req.body.name,
        phone: req.body.phone,
        address: "",
    };

    var user = await Account.findOne({ email: req.body.email });

    if (user) {
        errorSignUp = "Account already exist!";
        res.render('./authentication/index', {
            errorSignUp,
            data: data.data,
            values: req.body
        })
        return;
    }


    if (password !== confirmPass) {
        errorSignUp = "Confirm password is not correct!";
        res.render('./authentication/index', {
            errorSignUp,
            data: data.data,
            values: req.body
        })
        return;
    }

    newUser.password = md5(password);
    newUser.delivery_address.push(delivery_address);

    Account.create(newUser);

    res.redirect('back');
}