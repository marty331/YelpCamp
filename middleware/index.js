var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require("../models/comment");

middlewareObj.checkCampOwner = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				console.log(err);
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				//if logged in, does user own campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You can only edit camps that you own.");
					res.redirect("back");
				}
			}
		});	
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back")
	}	
}

middlewareObj.checkCommentOwner = function(req, res, next){
  if(req.isAuthenticated()){
      Comment.findById(req.params.commentid, function(err, foundComment){
        if(err){
          console.log(err);
          req.flash("error", "Comment not found.");
          res.redirect("back");
        } else {
          //if logged in, does user own campground
          if(foundComment.author.id.equals(req.user._id)){
            next();
          } else {
          	req.flash("error", "You can only edit comments that belong to you.");
            res.redirect("back");
          }
        }
      }); 
    } else {
    	req.flash("error", "You need to be logged in to do that.");
      res.redirect("back")
    } 
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that.");
  res.redirect("/login");
}


module.exports = middlewareObj;