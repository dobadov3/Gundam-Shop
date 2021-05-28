var express = require("express");
var router = express.Router();
var controller = require("../controllers/products.controller");
var path = require("path");
var multer = require("multer");
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({
    storage: storage,
});

router.get("/", controller.get);
router.get("/edit/:productID", controller.getEdit);
router.get("/delete/:productID", controller.delete);
router.post("/create", upload.array("avatar", 4), controller.postcreate);
router.post("/edit/:productID", upload.fields([
    {name: "avatar-0", maxCount: 1}, 
    {name: "avatar-1", maxCount: 1}, 
    {name: "avatar-2", maxCount: 1}, 
    {name: "avatar-3", maxCount: 1}])
    , controller.postEdit
);

module.exports = router;
