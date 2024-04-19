const express = require("express")
const router = express.Router()
const Property = require("../models/property")
const Folder = require("../models/folder")
const Item = require("../models/item")
const authenticationMiddleware = require("../middleware/authentication")
router.use(express.json())



//////////////////////////////////////////////////////////////////////////////////////
// Enregistre une nouvelle propriété
router.post("/create", authenticationMiddleware, async(request,response) => {
    try{
        const {userID} = request.token
        const {propertyName, folderID} = request.body

        // On construit et sauvegarde le nouveau document property
        const newProperty = new Property({
            name:propertyName,
            folderID:folderID,
            userID:userID,
        })
        await newProperty.save()
        

        // On ajoute cette proprertyà tous les items
        const itemsUpdated = await Item.updateMany(
            {folderID:folderID},
            {$push : {properties:{
                propertyID:newProperty._id, 
                name:newProperty.name,
                value:"N/A"
            }}},
        )

        // A ce stade, le document property a été ajouter, et la propriété a été ajouter à tout les items du dossier, avec pour valeur "N/A"
        
        response.status(201).json({
            messageDebugConsole:`La propriété a été enregistrer \n\n ${JSON.stringify(newProperty, null, 2)}`,
            messageDebugPopup:`Propriété enregistrer "${newProperty.name}"`,
            messageUserPopup:"Property saved",
            payload:newProperty
        })
        
    }catch(error){
        response.status(400).json({
            message:"Echec lors de l'enregistrement de la propriété",
            messageDebugConsole:error.message,
            payload:error.message
        })
    }
})



module.exports = router
