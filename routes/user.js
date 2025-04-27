const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../Models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


router.route("/signup")
.get( userController.signupRender)
.post( wrapAsync (userController.Signup));


router.route("/login")
.get(userController.loginRender)
.post(saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),userController.login);


router.get("/logout", userController.logout)

module.exports = router;