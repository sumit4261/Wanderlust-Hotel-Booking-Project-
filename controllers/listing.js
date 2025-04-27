const Listing = require("../Models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Index — Show all listings with optional search
module.exports.index = async (req, res) => {
  const { search } = req.query;
  let allListings;
  if (search) {
    const searchRegex = new RegExp(search, "i");
    allListings = await Listing.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
        { category: searchRegex }
      ]
    });
  } else {
    allListings = await Listing.find({});
  }
  res.locals.search = search || "";
  res.render("listings/index.ejs", { allListings });
};

// New — Show form to create a new listing
module.exports.new = (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
};

// Show — Show one listing by ID
module.exports.show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }

  // Ensure geometry is included (it is part of the document by default)
  res.render("listings/show.ejs", { listing });
};

// Create — Handle form submission to create a new listing
module.exports.create = async (req, res, next) => {

  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send()

  if (!req.file) {
    req.flash("error", "Image upload failed or missing");
    return res.redirect("/listings/new");
  }

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Edit — Show form to edit an existing listing
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","w_300")

  res.render("listings/edit.ejs", { listing , originalImageUrl });
};

// Update — Handle edit form submission
module.exports.update = async (req, res) => {
  const { id } = req.params;

  if (!req.body.listing) {
    throw new ExpressError(400, "Invalid Listing Data");
  }

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined"){

  let url = req.file.path;
  let filename = req.file.filename;

  listing.image = { url, filename };
  await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

// Delete — Remove listing by ID
module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};
