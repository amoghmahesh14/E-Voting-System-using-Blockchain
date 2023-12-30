const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');
////
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amoghm14@gmail.com',
      pass: ''
    }
  });

function sendMail(email,private_string){
  var mailOptions = {
    from: 'amoghm14@gmail.com',
    to: email,
    subject: 'Welcome',
    text: "Login Successful" + "\nThis is your Private Key to Vote:\n" + private_string + "\n Thank you"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
////
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            sendMail(email,user.private_string)
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
