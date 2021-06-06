const Account = require('../models/account.model');
const Role = require("../models/role.model");
const Admin = require('../models/admin.model');
const md5 = require('md5');
const _ = require('lodash');

module.exports.get = async function (req, res) {
    var accounts = await Account.find();
    var roles = await Role.find();
    var admins = await Admin.find().sort({id_role: 1});
    for (let i = 0; i < accounts.length; i++) {
        accounts[i].role = "customer";
    }

    for(let i = 0; i<admins.length;i++){
        var role = await Role.findById(admins[i].id_role);

        admins[i].role = role.name;
    }
    
    res.render("./admin/users/index", {
        account: res.locals.admin,
        accounts,
        admins,
        roles,
    });
};

module.exports.postCreate = async function (req, res) {
    req.body.password = md5("123");
    var newAccount = new Admin(req.body);
    Admin.create(newAccount);
    res.redirect("back");
};

module.exports.delete = async function (req, res) {
    var accountID = req.params.accountID;
    await Account.findByIdAndDelete(accountID);
    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var acc = await Account.findById(req.params.accountID);

    if (!acc){
        acc = await Admin.findById(req.params.accountID)
    }

    var roles = await Role.find();
    res.render("./admin/users/editUser", {
        acc,
        roles,
    });
};

module.exports.postEdit = async function (req, res) {
    var account = await Account.findById(req.params.accountID);
    if (!account){
        account = await Admin.findById(req.params.accountID);
        account = _.extend(account, req.body)
        account.save();
        res.redirect("back");
        return
    }
    account.name = req.body.name;
    account.email = req.body.email;
    account.phone = req.body.phone;
    account.id_role = req.body.id_role;
    await account.save();
    res.redirect("back");
};
