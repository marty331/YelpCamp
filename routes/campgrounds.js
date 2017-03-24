var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require("../middleware");
//var Comment = require("../models/comments");

//INDEX - List all campgrounds
router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("campground error");
            res.redirect("/");
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    })
});


//CREATE - Add new campgrounds to db
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var price = req.body.price;
   var author = {
   		id: req.user._id,
   		username: req.user.username
   };
   var newCampground = {name:name, image:image, price: price, description: description, author: author};
   //campgrounds.push(newCampground);
   Campground.create(newCampground, function(err, camp){
       if(err){
           console.log("new camp error")
           res.redirect("/");
       } else {
           console.log("new camp added")
           req.flash("success", "You added a new campground.");
           res.redirect("/campgrounds");
       }
   })
});


//NEW - Show form for campgrounds
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    
    //find the campground with the id
    //show the show page with that id
    res.render("campgrounds/new");
});



//SHOW - Shows info about one campground /campgrounds/:id
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit Campground route
router.get("/campgrounds/:id/edit", middleware.checkCampOwner, function(req, res){
		//is user logged in, if not redirect to login

		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				console.log(err);
				res.redirect("/campgrounds");
			} else {
				//if logged in, does user own campground
				if(foundCampground.author.id.equals(req.user._id)){
					res.render("campgrounds/edit",{campground: foundCampground});
				}
			}
		});	
		
});

//Edit Update route
router.put("/campgrounds/:id", middleware.checkCampOwner, function(req, res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, foundCampground){
		if(err){
			res.redirect('/campgrounds');
		} else {
			req.flash("success", "Campground updated.");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
});

//Destroy campground route
router.delete("/campgrounds/:id", middleware.checkCampOwner, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		}
		req.flash("success", "Campground deleted.");
		res.redirect("/campgrounds");
	})
});


module.exports = router;