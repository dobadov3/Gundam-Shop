var mongoose = require('mongoose');
var shortId = require('short-id')

var discountSchema = new mongoose.Schema({
    code: {
        type: String,
        default: shortId.generate(),
    },
    date_create: {
        type: Date,
        default: new Date(),
    },
    expire: Date,
    multiply: Number,
});

discountSchema.virtual("date").get(function () {
    var m = this.date_create.getMonth() + 1;
    var d = this.date_create.getDate();
    var y = this.date_create.getFullYear();
    return d + "/" + m + "/" + y;
});

discountSchema.virtual("date_expire").get(function () {
    var m = this.expire.getMonth() + 1;
    var d = this.expire.getDate();
    var y = this.expire.getFullYear();
    return d + "/" + m + "/" + y;
});

var Discount = mongoose.model("Discount", discountSchema, "discount");

module.exports = Discount;