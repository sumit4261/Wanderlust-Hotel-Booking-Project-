const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index + Create
router
  .route("/")
  .get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.create)
);

// New form
router.get("/new", isLoggedIn, listingController.new);

// Show, Update, Delete
router
  .route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.update)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete));

// Edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.edit)
);

module.exports = router;
