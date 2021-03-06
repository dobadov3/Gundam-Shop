var mongoose = require('mongoose');
const mongooseDateFormat = require("mongoose-date-format");

var accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: String,
    id_role: String,
    delivery_address: Array,
    wishList: Array,
    username: String,
    date_create: { type: Date, default: new Date() },
    cmnd: String,
    job: String,
    gender: String,
    resetLink: {
        type: String,
        default: ""
    }
});
accountSchema.plugin(mongooseDateFormat);

var Account = mongoose.model('Account', accountSchema, 'account');


module.exports = Account;