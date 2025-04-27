const express = require('express');
const router = express.Router();


//Index - users
router.get("/",(req,res) => {
    res.send("Get for show user")
});

//Show - users
router.get("/:id",(req,res) => {
    res.send("Get for Show users");
});

//Post - users
router.post("/",(req,res) => {
    res.send("Post for Users")
});

//DELETE - users
router.delete("/:id",(req,res) => {
    res.send("Delete for Users");
});

module.exports = router;