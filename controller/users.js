const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
}


module.exports.signup=async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email })
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    // Automatically log in the user after registration
    req.login(registeredUser, (err) => {
      if (err) {
        throw new ExpressError("Login failed after registration", 500);
      }
      req.flash("success", "Successfully logged in!");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }

}
module.exports.renderLogin =(req, res) => {
  res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Successfully logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

  module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Successfully logged out!");
    res.redirect("/listings");
  });
}


