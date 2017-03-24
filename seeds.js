var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require("./models/comment");

var data = [
    {
    name: "Cloud's rest", 
    image: "http://medora.com/data/upfiles/media/2010CampgroundTentsDSC_2748.jpg",
    description: "Four dollar toast bespoke selvage succulents copper mug. Deep v air plant brunch, authentic umami skateboard cliche copper mug. Prism single-origin coffee lyft try-hard, tote bag snackwave hashtag tacos pour-over beard small batch. YOLO fingerstache listicle single-origin coffee pabst semiotics. Distillery viral leggings, stumptown kombucha hella trust fund tousled microdosing meggings wolf gentrify. Pour-over pitchfork williamsburg fam post-ironic stumptown. Hot chicken 90's chillwave, bicycle rights fap plaid pickled butcher forage pop-up paleo letterpress."
    },
    {
    name: "Potato Village", 
    image: "http://lostriver.com/style/images/Pic-2-Tent.jpg",
    description: "Four dollar toast bespoke selvage succulents copper mug. Deep v air plant brunch, authentic umami skateboard cliche copper mug. Prism single-origin coffee lyft try-hard, tote bag snackwave hashtag tacos pour-over beard small batch. YOLO fingerstache listicle single-origin coffee pabst semiotics. Distillery viral leggings, stumptown kombucha hella trust fund tousled microdosing meggings wolf gentrify. Pour-over pitchfork williamsburg fam post-ironic stumptown. Hot chicken 90's chillwave, bicycle rights fap plaid pickled butcher forage pop-up paleo letterpress."
    },
    {
    name: "Dry Creek", 
    image: "http://cdn.kittatinny.com/files/files/uploads/2013/05/Kittatinny-Campground-2.jpg",
    description: "Four dollar toast bespoke selvage succulents copper mug. Deep v air plant brunch, authentic umami skateboard cliche copper mug. Prism single-origin coffee lyft try-hard, tote bag snackwave hashtag tacos pour-over beard small batch. YOLO fingerstache listicle single-origin coffee pabst semiotics. Distillery viral leggings, stumptown kombucha hella trust fund tousled microdosing meggings wolf gentrify. Pour-over pitchfork williamsburg fam post-ironic stumptown. Hot chicken 90's chillwave, bicycle rights fap plaid pickled butcher forage pop-up paleo letterpress."
    },
    {
    name: "Snowy Meadow", 
    image: "https://www.nps.gov/zion/planyourvisit/images/WatchmanCG_Watchman_r.jpg",
    description: "Four dollar toast bespoke selvage succulents copper mug. Deep v air plant brunch, authentic umami skateboard cliche copper mug. Prism single-origin coffee lyft try-hard, tote bag snackwave hashtag tacos pour-over beard small batch. YOLO fingerstache listicle single-origin coffee pabst semiotics. Distillery viral leggings, stumptown kombucha hella trust fund tousled microdosing meggings wolf gentrify. Pour-over pitchfork williamsburg fam post-ironic stumptown. Hot chicken 90's chillwave, bicycle rights fap plaid pickled butcher forage pop-up paleo letterpress."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log('Removed campgrounds')
        // //add in campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log('added campground');
        //             //add in comments
        //             Comment.create({text: "I love this place, who's ready for Luby's?",
        //                 author: "Jake"}, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         console.log("comment added");
        //                         campground.comments.push(comment);
        //                         campground.save();
                                
        //                     }
        //                 }
        //             );
        //             //add in comments
        //         }
        //     });
        // });
    });
    

    
}

module.exports = seedDB;