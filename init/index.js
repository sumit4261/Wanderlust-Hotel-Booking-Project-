require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main().then(() => {
    console.log("Connected to DB");

}).catch(err => {
    console.log(err.message);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj , owner : "67f7c9112c22ce66846c905a"}))
   await Listing.insertMany(initData.data);
   console.log("data was Initialized");
};

initDB();