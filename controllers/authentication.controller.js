var data = require('../layout.data');

module.exports.get = function(req, res){
    res.render('./authentication/index', {
        data: data.data
    });
};