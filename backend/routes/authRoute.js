const express = require("express");
const authController = require("../controller/authControlle");
const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

module.exports = router;
