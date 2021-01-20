require('dotenv').config();
const User = require('../models/authSchema')
const session = require('express-session')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// @ts-ignore
const findOrCreate = require('mongoose-findorcreate');


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.use(
    new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


homePage = (req,res) => {
    res.render("home");
}

loginPage = (req,res) => {
    res.render("login");
}

registerPage = (req,res) => {
    res.render("register");
}

secretsPage = (req, res) => {
    if(req.isAuthenticated()){
        res.render("secrets");
    }else{
        res.redirect("/login");
    }
}

register = (req,res) => {

    User.register({username: req.body.username}, req.body.password, function(err, user){

        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    })

}

login = (req,res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function(err){
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    })
    
}

logout = (req,res) => {

    req.logout();
    res.redirect("/");
}

callback = (req, res) => {

    res.redirect("/secrets");
}


module.exports = {
    homePage,
    loginPage,
    registerPage,
    secretsPage,
    register,
    login,
    logout,
    callback
}