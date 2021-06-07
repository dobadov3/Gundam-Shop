var express = require("express");
var router = express.Router();
var controller = require("../controllers/profile.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware.auth, controller.get);
router.get("/change-password", controller.getChangePass);

router.post("/", controller.postProfile);
router.post("/change-password", controller.postChangePass);
module.exports = router;