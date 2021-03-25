var data = require('../layout.data');

module.exports.get = async function(req, res){
    res.render('./wishlist/index', {
        data: data.data
    });
}