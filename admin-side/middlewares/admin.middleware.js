var Admin = require('../models/admin.model');
var Role = require('../models/role.model');

module.exports = async function(req, res, next){
    if (req.signedCookies.adminID) {
        var admin = await Admin.findById(req.signedCookies.adminID);
        var role = await Role.findById(admin.id_role)
        res.locals.role = role.name
        res.locals.admin = admin;
        res.locals.name = admin.name
    }
    
    next()
}