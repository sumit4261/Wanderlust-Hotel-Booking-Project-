const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/listing.js");

const MONGO_URL = "mongodb://localhost:27017/wandarlust";

main().then(() => {
    console.log("Connected to DB");

}).catch(err => {
    console.log(err.message);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/" , (req,res) => {
    res.send("Hi I'm root")
})

app.get("/testListing" , async  (req,res) => {
    let sampleListing = new Listing({
        title: "My new Villa",
        description: "By the beach",
        price:1200,
        location: "Calangute , Goa",
        country:"India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful testing");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})