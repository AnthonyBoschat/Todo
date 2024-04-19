const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    userID:{type:mongoose.Types.ObjectId, required:true}, // Appartient à cet utilisateur
    folderID:{type:mongoose.Types.ObjectId, required:true}, // Propriété de ce dossier
    name:{type:String, required:true}, // Nom de la propriété
})

const Property = mongoose.model("Property", propertySchema)

module.exports = Property