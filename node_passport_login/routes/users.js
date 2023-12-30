const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", (req, res) => {
  const { name, email, password2, aadhar } = req.body;
  var password = req.body.password;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        User.findOneAndUpdate(
          { email: email },
          { name: name, password: hash }
        ).then(user => {
          if (!user) {
            errors.push({ msg: "You are not in the voter's list" });
            res.render("register", {
              errors,
              name,
              email,
              password,
              password2
            });
          } else {
            if (user.aadhar != aadhar) {
              errors.push({ msg: "Aadhar Number is not a match" });
              res.render("register", {
                errors,
                name,
                email,
                password,
                password2
              });
            } else {
              res.redirect("/users/login");
            }
          }
        });
      });
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
4
router.get("/candidates",(req,res)=>{
  res.render("candidates")
})
module.exports = router;
