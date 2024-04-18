const mongoose = require("mongoose")

const folderSchema = new mongoose.Schema({
    name:{type:String, required:true},
    userID:{type:String, required:true},
    position:{type:Number, required:true},
    commonProperties:[]
})

const Folder = mongoose.model("Folder", folderSchema)

module.exports = Folder