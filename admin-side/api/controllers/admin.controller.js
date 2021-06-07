const Admin = require('../../models/admin.model');
const Role = require('../../models/role.model');

module.exports.getCurrentAdmin = async function(req, res){
    var admin = await Admin.findById(res.locals.admin._id);

    // var role = await Role.findById(admin.id_role);

    // admin.role = role.name;

    res.json(admin)
}