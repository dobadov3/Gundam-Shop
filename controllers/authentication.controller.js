var data = require('../layout.data');
const axios = require('axios');
var city = [];

module.exports.get = async function(req, res){
    await axios.get('https://thongtindoanhnghiep.co/api/city').then(response => {
        response.data.LtsItem.map(c => {
            city.push(c.Title)
        })
    }).catch(err => {
        console.log(err)
    })

    console.log(city)
    res.render('./authentication/index', {
        data: data.data, 
        city
    });
};