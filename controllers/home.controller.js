var data = require('../layout.data');

module.exports.get = async function(req, res){
    res.render('./home/index', {
        data: data.data
    });
};