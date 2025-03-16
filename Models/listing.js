const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
      type:String,
      required:true,
    },
    
    description:String,

    image:{
        type:String,
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1610641818989-c2…xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },

    price:Number,
    loacation:String,
    country:String,
});

const Listing = mongoose.model('Listing' , listingSchema);
module.exports = Listing;