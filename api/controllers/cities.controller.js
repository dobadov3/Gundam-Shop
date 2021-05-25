var data = require('../vietnam_provinces_cities.json');

module.exports.get = function(req, res){
    res.json(data)
}