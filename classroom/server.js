const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require('express-session')
const flash = require('connect-flash');

const sessionOptions = {secret:"mysupersecretstring" , resave:false , saveUninitialized:true}

app.use(session(sessionOptions));

app.get("/reqcount" , (req,res) => {
if(req.session.count){
    req.session.count++;
}
else{
    req.session.count= 1;
}

    res.send(`you sent a request to ${req.session.count}  times`)
})

// app.get("/test" , (req,res) =>{
//     res.send("test succesfully")
// })


// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));


// app.get("/getsignedcookie" , (req , res) => {
//     res.cookie("made-in" , "India" , { signed: true});
//     res.send("signed cookie sent")
// })

// app.get("/verify" , (req,res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies" , (req,res) =>{
//     res.cookie("greet" , "Hello");
//     res.cookie("madeIn" , "India");
//     res.send("Sent your some cookie");
// });

// app.get("/", (req,res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);





app.listen(3000, () => {
    console.log("Server is running on port 3000");
});