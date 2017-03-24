var express = require('express');
var router = express.Router();
var passport    = require('passport');
var User = require("../models/user");

//Routes 
router.get("/", function(req, res){
    res.render("landing");
});

//Auth Routes
router.get('/register', function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

//Login routes
router.get("/login", function(req, res){
  //res.flash("success", "Welcome "+req.user.username);
  res.render("login");
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//Logout route
router.get("/logout", function(req, res){
  req.flash("success", "Logged you out.");
  req.logout();
  res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;