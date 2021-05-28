module.exports.get = async function (req, res) {
    console.log(res.locals.role);
    res.render("./admin/layouts/layout", {
        role: res.locals.role,
        account: res.locals.account,
    });
};
