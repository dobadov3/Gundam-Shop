var ids = require('short-id');
var Session = require('../models/session.model');

module.exports = async function(req, res, next){
    var randomID = ids.generate();
    if (!req.signedCookies.sessionId){
        res.cookie('sessionId', randomID,{
            signed: true
        });

        await Session.create({sessionID: randomID});
    }

    next();
}