const Role = require('../models/role.model');

module.exports.get = async function (req, res) {
    var roles = await Role.find();

    res.render("./admin/role/index", {
        roles,
    });
};

module.exports.postCreate = async function (req, res) {
    var role = new Role(req.body);
    await Role.create(role);
    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var editRole = await Role.findById(req.params.roleID);

    res.render("./admin/role/editRole", {
        editRole,
        account: res.locals.account,
    });
};

module.exports.postEdit = async function (req, res) {
    var role = await Role.findById(req.params.roleID);
    role.name = req.body.name;
    role.markModified("name");
    role.save();
    res.redirect("back");
};

module.exports.delete = async function (req, res) {
    await Role.findByIdAndDelete(req.params.roleID);
    res.redirect("back");
};
