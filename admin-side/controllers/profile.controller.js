const Order = require('../models/order.model')
const Admin = require('../models/admin.model')
const Role = require('../models/role.model')
const md5 = require('md5')
module.exports.get = async function (req, res) {
    res.render("./admin/profile/profile", {
        admin: res.locals.admin,
        role: res.locals.role,

    });
};
module.exports.getChangePass = async function(req, res){
    res.render('./admin/profile/password')
}
module.exports.postChangePass = async function(req, res){
    var admin  = await Admin.findById(res.locals.admin._id);
    var old_pass = req.body.old_pass
    var new_pass = req.body.new_pass

    if(req.body.confirm_newPass !== req.body.new_pass){
        res.render("./admin/profile/password", {
            error: "Mật khẩu xác nhận không đúng!"
        });
        return
    }
    if (md5(old_pass) !== admin.password) {
        res.render("./admin/profile/password", {
            error: "Mật khẩu cũ không đúng!",
        });
        return;
    }
    admin.password = md5(new_pass);
    admin.save();

    res.redirect('back')
}
module.exports.postProfile = async function(req, res){
    var currentAdmin = await Admin.findById(res.locals.admin._id);
    currentAdmin.email = req.body.email;
    currentAdmin.username = req.body.username;
    currentAdmin.name = req.body.name;
    currentAdmin.phone = req.body.phone;
    currentAdmin.save();

    res.redirect('back');
}
