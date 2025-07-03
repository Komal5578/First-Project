const Listing = require("../models/listing");
const Review = require("../models/review");



module.exports.createReview = async (req, res) => {
    let listing=await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the author to the current user
    newReview.name = req.user.username; // Set the name to the current user's username
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview =async (req, res) => {
    let { id, reviewId } = req.params;
     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); 
    await Review.findByIdAndDelete(reviewId);
    req.flash("error", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}
