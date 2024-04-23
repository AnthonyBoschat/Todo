const express = require("express");
const router = express.Router();
const Item = require("../models/item")
const Property = require("../models/property")
const authenticationMiddleware = require("../middleware/authentication");

// middleware pour parser le JSON
router.use(express.json())


//////////////////////////////////////////////////////////////////////////////////////
// Ajoute une tâche
router.post("/create", authenticationMiddleware, async (request, response) => {
    try{
        const {userID} = request.token
        const {folderID} = request.body
        const userItems = await Item.find({userID:userID, folderID:folderID})
        const position = userItems.length
        request.body.userID = userID
        request.body.position = position
        // request.body.properties = []
        // // On regarde s'il y a des propriétés associer à ce dossier, si oui on les ajoutes
        // const propertyList = await Property.find({folderID:folderID})
        // for(let i = 0; i<propertyList.length; i++){
        //     request.body.properties.push({
        //         propertyID:propertyList[i]._id,
        //         name:propertyList[i].name
        //     })
        // }


        request.body.property = {}
        // On regarde s'il y a des propriétés associer à ce dossier, si oui on les ajoutes
        const propertyList = await Property.find({folderID:folderID})
        propertyList.forEach(property => {
            request.body.property[property._id] = {
                name:property.name,
                value:"N/A"
            }
        })




        const newItem = new Item(request.body);
        await newItem.save();
        response.status(200).json({
            messageDebugConsole:`L'Item a été correctement sauvegarder \n\n ${JSON.stringify(newItem, null, 2)}`,
            messageDebugPopup:`Item sauvegarder`,
            payload:newItem
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec dans l'enregistrement de la tâche ${JSON.stringify(request.body, null, 2)}`,
            messageDebugPopup:`Echec de l'enregistrement de la tâche`,
        });
    }
});




//////////////////////////////////////////////////////////////////////////////////////
// Supprime une Item
router.delete("/delete/:itemID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const itemID = request.params.itemID
    try{
        const thisItem = await Item.findById(itemID)
        const ItemDeleted = await Item.deleteOne({_id:itemID, userID:userID})
        if(!ItemDeleted){
            throw Error()
        }
        response.status(200).json({
            messageDebugConsole:`La tâche a correctement été supprimer \n\n ${JSON.stringify(thisItem, null, 2)}`,
            messageDebugPopup:`Tâche supprimer (${thisItem._id})`,
            messageUserPopup:`Item deleted`,
            payload:itemID
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Erreur lors de la suppresion de la tâche ${ItemID}`,
            messageDebugPopup:`Echec de la suppression de la tâche`,
        })
    }
})





//////////////////////////////////////////////////////////////////////////////////////
// Toggle une Item (completed)
router.put("/toggleCompleted/:ItemID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const {ItemID} = request.params
    const {completed} = request.body
    try{
        const updatedItem = await Item.findOneAndUpdate(
            {_id:ItemID, userID:userID},
            {$set: {completed:completed, onWorking:false}},
            {new:true}
        )
        if (!updatedItem) {
            throw Error()
        }
        response.status(200).json({
            messageDebugConsole:`Le toggle completed de la tâche a correctement été modifier \n\n ${JSON.stringify(updatedItem, null, 2)}`,
            messageDebugPopup:"Toggle completed modifier",
            payload:updatedItem
        });
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la modification du toggle completed de la tâche ${ItemID}`,
            messageDebugPopup:"Echec mise à jour du toggle completed",
        })
    }
})


//////////////////////////////////////////////////////////////////////////////////////
// Toggle une Item (onWorking)
router.put("/toggleOnWorking/:ItemID", authenticationMiddleware, async(request, response) => {
    const {userID} = request.token
    const {ItemID} = request.params
    const {onWorking} = request.body
    try{
        const resetItem = await Item.findOneAndUpdate(
            {userID:userID, onWorking:true},
            {$set: {onWorking:false}},
            {new:true}
        )
        const updatedItem = await Item.findOneAndUpdate(
            {_id:ItemID, userID:userID},
            {$set: {onWorking:onWorking}},
            {new:true}
        )
        if(!updatedItem){
            throw Error()
        }

        response.status(200).json({
            messageDebugConsole:`Le toggle onWorking de la tâche a correctement été modifier \n\n ${JSON.stringify(updatedItem, null, 2)}`,
            messageDebugPopup:"Toggle onWorking modifier",
            payload:[updatedItem, resetItem]
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la modification du toggle onWorking de la tâche ${ItemID}`,
            messageDebugPopup:"Echec mise à jour du toggle onWorking",
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Rename une Item
router.put("/rename/:ItemID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const ItemID = request.params.ItemID
    const {newItemContent} = request.body
    try{
        const updatedItem = await Item.findOneAndUpdate(
            {_id:ItemID, userID:userID},
            {$set:{content:newItemContent}},
            {new:true}
        )
        if(!updatedItem){
            throw Error()
        }
        response.status(200).json({
            messageDebugConsole:`La tâche a vu son "content" correctement mis à jour \n\n ${JSON.stringify(updatedItem, null, 2)}`,
            messageDebugPopup:"Contenu de la tâche mise à jour",
            messageUserPopup:"Item updated",
            payload:updatedItem
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la modification du content de la tâche ${ItemID}`,
            messageDebugPopup:"Echec mise à jour du contenu de la tâche",
        })
    }
})



//////////////////////////////////////////////////////////////////////////////////////
// Réorganise la position des items
router.post("/sort", authenticationMiddleware, async(request, response) => {
    try{
        const {userID} = request.token
        const {newItemsList} = request.body
        for(let i = 0; i<newItemsList.length; i++){
            await Item.findOneAndUpdate(
                {_id:newItemsList[i]._id},
                {$set:{position:i}}
            )
        }
        const ItemsListUpdated = await Item.find({userID:userID, folderID:newItemsList[0].folderID})
        response.status(200).json({
            messageDebugConsole:`Ordre des tâches mis à jour \n\n ${JSON.stringify(ItemsListUpdated, null, 2)}`, 
            messageDebugPopup:`Ordre des tâches mis à jour`,
            payload:ItemsListUpdated
        })
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la suppression de la réorganisation de l'ordre des tâches`,
            payload:error.message
        })
    }
    
})


module.exports = router;

