var data = require('../layout.data');

module.exports.get = function(req, res){
    res.render('./cart/index', {
        data: data.data
    });
}