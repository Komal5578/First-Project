const express =require("express");
const router =express.Router({mergeParams: true});
const wrapAsync= require("../utils/wrapAsync.js");
const{validateListing}= require("../middleware.js");
const Listing =require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const listingController= require("../controller/listings.js");
const multer = require("multer");
const { cloudinary, storage } = require("../Cloudconfig.js"); // Import cloudinary and storage configuration
const upload = multer({ storage }); // Set up multer for file uploads


router.route("/")
    .get(wrapAsync(listingController.index)) //index route
    .post(isLoggedIn, 
        validateListing,
        upload.single("listing[image]"),//   multer is use to handle file uploads
        wrapAsync(listingController.createListing)); //create route
    
    
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

// / Filter listings by category
router.get("/category/:categoryName", wrapAsync(async (req, res) => {
    const { categoryName } = req.params;
    let  listings = await Listing.find({ category: categoryName });
    if (listings.length === 0) {
        listings = await Listing.find({});
    }
    res.render("listings/index", { allListings: listings, activeCategory: categoryName });
}));



router.route("/:id")
    .get(wrapAsync(listingController.showListing)) //show route
    .put(isLoggedIn, isOwner, validateListing,upload.single("listing[image]"),
     wrapAsync(listingController.updateListing)) //update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //delete route


// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;