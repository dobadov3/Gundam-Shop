var ids = require('short-id');
var Session = require('../models/session.model');

module.exports = function(req, res, next){
    var randomID = ids.generate();
    if (!req.signedCookies.sessionId){
        res.cookie('sessionId', randomID,{
            signed: true
        });

        Session.create({sessionID: randomID});
    }

    next();
}