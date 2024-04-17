const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    name:{type:String, required:true},
    folderID:{type:mongoose.Types.ObjectId, required:true},
    userID:{type:mongoose.Types.ObjectId, required:true},
})

const Property = mongoose.model("Property", propertySchema)

module.exports = Property