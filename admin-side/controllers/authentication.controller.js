const Admin = require('../models/admin.model');
const md5= require('md5');

module.exports.getLogin = async function (req, res) {
    res.render("./admin/authentication/login");
};

module.exports.getRegister = async function (req, res) {
    res.render("./admin/authentication/register");
};

module.exports.postLogin = async function (req, res){
    const { username, password } = req.body;
    var admin = await Admin.findOne({username});
    console.log(admin, username, password);
    if (!admin){
        res.render("./admin/authentication/login", {
            error: "Account doesn't exist!"
        });
        return;
    }else{
        if (password !== admin.password) {
            res.render("./admin/authentication/login", {
                error: "Wrong password!",
            });
            return;
        } else {
            res.cookie("adminID", admin._id, {
                signed: true,
            });
            res.redirect("/");
            return;
        }
    }
}

module.exports.logOut = function(req, res){
     res.clearCookie("adminID");
     res.redirect("/authentication/login");
}
