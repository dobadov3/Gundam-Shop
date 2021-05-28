const Account = require('../models/account.model');
const Role = require("../models/role.model");

module.exports.get = async function (req, res) {
    var accounts = await Account.find();
    var roles = await Role.find();
    for (let i = 0; i < accounts.length; i++) {
        var role = await Role.findById(accounts[i].id_role);
        accounts[i].role = role.name;
    }
    res.render("./admin/users/index", {
        account: res.locals.account,
        accounts,
        roles,
    });
};

module.exports.postCreate = async function (req, res) {
    req.body.password = md5("123");
    var newAccount = new Account(req.body);
    Account.create(newAccount);
    res.redirect("back");
};

module.exports.delete = async function (req, res) {
    var accountID = req.params.accountID;
    await Account.findByIdAndDelete(accountID);
    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var acc = await Account.findById(req.params.accountID);
    var roles = await Role.find();
    res.render("./admin/users/editUser", {
        acc,
        roles,
    });
};

module.exports.postEdit = async function (req, res) {
    var account = await Account.findById(req.params.accountID);
    account.name = req.body.name;
    account.email = req.body.email;
    account.phone = req.body.phone;
    account.id_role = req.body.id_role;
    await account.save();
    res.redirect("back");
};
