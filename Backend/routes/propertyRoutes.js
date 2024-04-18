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
        const newPropertyToSave = new Property({
            name:propertyName,
            folderID:folderID,
            userID:userID,
        })
        await newPropertyToSave.save()

        // // On ajoute cette propriété à tout les items
        // const itemUpdated = await Item.updateMany(
        //     {folderID:folderID},
        //     {$push : {properties:{propertyID:propertyID, name:propertyName}}}
        // )

        // On trouve l'item sur lequel la propriété a été ajouter
        // const thisItem = await Item.findOneAndUpdate(
        //     {
        //         "_id":itemID, 
        //         "properties.propertyID":propertyID
        //     },
        //     {
        //         "$set":{
        //             "properties.$.value":propertyValue,
        //         },
        //     },
        //     {
        //         new:true
        //     }
        // )

        // On récupère la liste de touts les items de l'utilisateur pour mettre à jour l'état redux
        // const allUserItem = await Item.find({userID:userID})
        
        response.status(201).json({
            messageDebugConsole:`La propriété a été enregistrer \n\n ${JSON.stringify(newPropertyToSave, null, 2)}`,
            messageDebugPopup:`Propriété enregistrer "${newPropertyToSave.name}"`,
            messageUserPopup:"Property saved",
            payload:newPropertyToSave
        })
        
    }catch(error){
        response.status(400).json({
            message:"Echec lors de l'enregistrement de la propriété",
            payload:error.message
        })
    }
})



module.exports = router
