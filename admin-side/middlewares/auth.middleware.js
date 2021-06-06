module.exports.signedCookies = function (req, res, next) {
    res.setHeader("Content-Type", "text/html");
    if (!req.signedCookies.adminID) {
        res.locals.checkLogin = false;
    } else {
        res.locals.checkLogin = true;
    }
    next();
};

module.exports.auth = function(req, res, next){
    if (!res.locals.checkLogin){
        res.redirect('/authentication/login');
    }
    
    next();
}