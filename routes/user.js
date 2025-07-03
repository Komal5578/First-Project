const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const ExpressError = require("../utils/ExpressError.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");
const user = require("../models/user.js");


router.route("/signup")
  .get(userController.renderSignup)// Render signup form
  .post(wrapAsync(userController.signup));// Handle signup form submission



router.route("/login")
    .get(userController.renderLogin)// Render login form
    // Handle login form submission with passport authentication
    .post(
      saveRedirectUrl,
      passport.authenticate("local",
        {
          failureRedirect: "/login",
          failureFlash: true
        }),
      userController.login
  );
// Logout route
router.get("/logout", userController.logout);
module.exports = router;