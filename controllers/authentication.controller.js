var data = require('../layout.data');
var Account = require('../models/account.model');
var Role = require('../models/role.model');
var md5 = require('md5');

module.exports.get = async function(req, res) {

    res.render('./authentication/index', {
        data: data.data
    });
};

module.exports.postLogin = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = await Account.findOne({ email: email });
    var role = await Role.findOne({_id: user.id_role});

    if (!user) {
        res.render('./authentication/index', {
            error: "Account doesn't exits!",
            data: data.data,
            values: req.body
        });
        return;
    }

    if (md5(password) !== user.password) {
        res.render('./authentication/index', {
            error: "Wrong password!",
            data: data.data,
            values: req.body
        });
        return;
    }

    res.cookie('userID', user.id, {
        signed: true
    });
    if (role.name === "admin" || role.name === "staff"){
        res.redirect('/admin');
    }else if(role.name === "customer"){
        res.redirect('/home');
    }
};

module.exports.logout = function(req, res) {
    res.clearCookie("userID");
    res.redirect('back');
}

module.exports.postSignUp = async function(req, res) {
    var email = req.body.emailSignUp;
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.passwordSignUp;
    var confirmPass = req.body.confirmPassword;
    var errorSignUp = "";
    var newUser = new Account();
    var delivery_address = {
        name: name,
        phone: phone,
        address: ""
    }

    var user = await Account.findOne({ email: email });
    var role = await Role.findOne({name: "customer"})

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


    newUser.email = email;
    newUser.name = name;
    newUser.password = md5(password);
    newUser.phone = phone;
    newUser.id_role = role._id
    newUser.delivery_address.push(delivery_address);

    Account.create(newUser);

    res.redirect('back');
}