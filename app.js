var express     = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    methodOverride = require("method-override"),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    seedDB = require("./seeds"),
    flash = require('connect-flash'),
    User = require("./models/user"),
    Comment = require("./models/comment");

//requiring routes
var commentsRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
//Turn off seeds
//seedDB();

//Passport configuration
app.use(require("express-session")({
  secret: "mAggie is the dog of the house and I am the mASTER!",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(authRoutes);
app.use(commentsRoutes);
app.use(campgroundRoutes);


app.listen(3000, function () {
  console.log('Auth app listening on port 3000!')
});