var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    phone: String,
    id_role: String,
});

var Admin = mongoose.model("Admin", adminSchema, "admin");

module.exports = Admin;
