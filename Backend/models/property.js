const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    name:{type:String, required:true},
    folderID:{type:mongoose.Types.ObjectId, required:true},
    userID:{type:mongoose.Types.ObjectId, required:true},
    values:[{
        itemID:{type:mongoose.Types.ObjectId},
        value:{type:String}
    }]
})

const Property = mongoose.model("Property", propertySchema)

module.exports = Property