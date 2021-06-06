var express = require("express");
var router = express.Router();
var controller = require("../controllers/home.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware.auth, controller.get);

module.exports = router;