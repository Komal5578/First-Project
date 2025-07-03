const express =require("express");
const router =express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");  
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview} = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");
const {isAuthor} = require("../middleware.js");
const reviewController= require("../controller/reviews.js");
const review = require("../models/review.js");



// reviews//post route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

// delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;