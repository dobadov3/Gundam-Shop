var data = require('../layout.data');

module.exports.get = async function(req, res){
    res.render('./products/index', {
        data: data.data
    });
};