const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{type:String, required:true},
    userPassword:{type:String, required:true},
    userEmail:{type:String, required:true},
    revoceryPasswordCode:{type:String, requires:false},
})

const User = mongoose.model(`User`, userSchema)
module.exports = User;