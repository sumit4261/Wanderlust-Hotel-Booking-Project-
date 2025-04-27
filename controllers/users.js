const { model } = require("mongoose");
const User = require("../Models/user.js")

module.exports.signupRender = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.Signup = async (req, res) => {

    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username })
        let registerdUser = await User.register(newUser, password);
        console.log(registerdUser);
        req.login(registerdUser, (err => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wandurlust");
            res.redirect("/listings");
        }))

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.loginRender = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    let redirectUrl = req.session.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "Logged out Successfully");
        res.redirect("/listings");
    })
}