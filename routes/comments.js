var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require("../models/comment");
var middleware = require("../middleware");



//New Comment Route 
router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong, please try again.");
            res.redirect("/campgrounds");
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

//Comments Create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
   //lookup campground
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
          req.flash("error", "Something went wrong, please try again.");
          res.redirect("/campgrounds");
      }  else {
          console.log(campground);
          Comment.create(req.body.comment, function(err, comment){
              console.log(comment);
              if(err){
                  console.log(err);
              } else {
                  //add username and id and save
                  console.log("new comment username: "+req.user.username);
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  console.log("comment ="+comment);
                  campground.comments.push(comment);
                  campground.save();
                  req.flash("success", "New comment added.");
                  res.redirect('/campgrounds/'+campground._id);
              }
          });
      }
   });
});

//Edit comment
router.get("/campgrounds/:id/comments/:commentid/edit", middleware.checkCommentOwner, function(req, res){
  Comment.findById(req.params.commentid, function(err, foundComment){
    if(err){
      req.flash("error", "Something went wrong, please try again.");
      res.redirect("back");
    } else {

      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
  
});

//Update comment
router.put("/campgrounds/:id/comments/:commentid", middleware.checkCommentOwner, function(req, res){
  Comment.findByIdAndUpdate(req.params.commentid, req.body.comment, function(err, updatedComment){
    if(err){
      req.redirect("back");
    } else {
      req.flash("success", "Your comment has been updated.");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});


//Delete comment
router.delete("/campgrounds/:id/comments/:commentid", middleware.checkCommentOwner, function(req, res){
  Comment.findByIdAndRemove(req.params.commentid, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Your comment was deleted.");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});



module.exports = router;