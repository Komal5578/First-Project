const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); // Assuming review.js is in the same directory

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename: String,
    },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category:{
    type:String,
    enum:["Trending", "Rooms", "Beach", "Surfing",  "Castles","Mountains","Arctic","Farms","Cities","Pools","Camps"]
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
     await Review.deleteMany({_id: {$in: listing.reviews}});// This will delete all reviews associated with the listing being deleted
  }
 
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
