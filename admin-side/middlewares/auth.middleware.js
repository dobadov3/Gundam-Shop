module.exports = function(req, res, next) {
    if (req.signedCookies.userID) {
        next();
    } else {
        res.redirect('/authentication')
    }

    next();
}