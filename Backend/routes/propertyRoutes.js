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


//////////////////////////////////////////////////////////////////////////////////////
// Supprime une propriété
router.delete("/delete/:propertyID/:folderSelectedID", authenticationMiddleware, async(request, response) => {
    try{
        const {userID} = request.token
        const {propertyID, folderSelectedID} = request.params
        // On supprime la propriété de la collection Property
        await Property.deleteOne({_id:propertyID, folderID:folderSelectedID})
        // On supprime la propriété de tout les items qui ont pour properties, un objet qui match avec propertyID
        const itemsUpdated = await Item.updateMany(
            {folderID:folderSelectedID, userID:userID},
            {$pull: {properties: {propertyID:propertyID}}}
        )
        response.status(200).json({
            messageDebugConsole:`La propriété a été correctement supprimer \n\n ${propertyID}`,
            messageDebugPopup:`Propriété supprimé ${propertyID}`,
            messageUserPopup:"Property deleted",
            payload:{
                propertyID:propertyID,
                folderSelectedID:folderSelectedID
            }
        })

    }catch(error){
        response.status(400).json({
            message:"Echec lors de la suppression de la propriété",
            messageDebugConsole:error.message,
            payload:error.message
        })
    }
})


//////////////////////////////////////////////////////////////////////////////////////
// Met à jour les propriété d'un item
router.put("/updateItem", authenticationMiddleware, async(request,response) => {
    try{
        const {itemID, updateList} = request.body
        // On récupère l'item dans la base de donnée
        const thisItem = await Item.findById(itemID)
        if(!thisItem){
            throw new Error(`Aucun item trouver avec cette identifiant ${itemID}`)
        }
        // On modifie les propriété du document
        thisItem.properties.forEach(property => {
            if(updateList.hasOwnProperty(property.propertyID)){
                property.value = updateList[property.propertyID]
            }
        })
        // On sauvegarde le document mis à jour
        await thisItem.save()

        response.status(200).json({
            messageDebugConsole:`Mise à jour des propriétés de l'item correctement effectuer \n\n ${JSON.stringify(thisItem, null, 2)}`,
            messageDebugPopup:"Mise à jour des propriétés de l'item effectuer",
            messageUserPopup:"Item updated",
            payload:{
                newItem:thisItem
            }
        })
    }catch(error){
        response.status(400).json({
            message:error.message
        })
    }
})


module.exports = router
