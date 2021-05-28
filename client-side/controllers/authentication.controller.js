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
    console.log(req.body)
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
    
    if (role.name === "admin" || role.name === "staff"){
        res.render("./authentication/index", {
            error: "This account can't be used on this page!!",
            data: data.data,
            values: req.body,
        });
        return;
    }

    res.cookie('userID', user.id, {
        signed: true
    });

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

    newUser.password = md5(password);
    newUser.id_role = role._id
    newUser.delivery_address.push(delivery_address);

    Account.create(newUser);

    res.redirect('back');
}