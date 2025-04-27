const express = require('express');
const router = express.Router();

//Index 
router.get("/",(req,res) => {
    res.send("Get for show posts")
});

//Show 
router.get("/:id",(req,res) => {
    res.send("Get for Show posts");
});

//Post 
router.post("/",(req,res) => {
    res.send("Post for posts")
});

//DELETE 
router.delete("/:id",(req,res) => {
    res.send("Delete for posts");
});

module.exports = router;