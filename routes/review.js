const express = require("express");
const router = express.Router({ mergeParams:true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js")
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//Review Route
router.post("/", validateReview ,isLoggedIn , wrapAsync((reviewController.createReview)));

//Delete Review route
router.delete(
    "/:review_id",isLoggedIn,isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router;