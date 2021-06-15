const Discount = require('../../models/discount.model');

module.exports.get = async function(req, res){
    var {code} = req.params;

    var discount = await Discount.findOne({code});

    res.json(discount);
}