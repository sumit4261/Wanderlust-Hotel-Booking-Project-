const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js");

module.exports.createReview = async (req,res) =>{
    
    const listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" , "Review Submitted!");
    res.redirect(`/listings/${listing._id}`);

}

module.exports.deleteReview = async (req,res) => {

    let { id, review_id } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: {reviews: review_id}});
    await Review.findByIdAndDelete(review_id);
    req.flash("success" , "Review Deleted!");
    res.redirect(`/listings/${id}`);
}