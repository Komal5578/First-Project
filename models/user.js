const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Adds username and password fields

// Hashes and stores passwords

// Provides ready-made helper methods for user authentication
const passportLocalMongoose = require("passport-local-mongoose");   
const userSchema = new Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);