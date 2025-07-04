const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userScehma = new Schema({
    email: {
        type : String,
        required: true,
    }
})

userScehma.plugin(passportLocalMongoose);

module.exports = mongoose.model('User' , userScehma);