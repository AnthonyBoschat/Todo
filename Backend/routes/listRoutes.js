const express = require("express")
const router = express.Router()
router.use(express.json())
const List = require("../models/list")
const Item = require("../models/item")
const authenticationMiddleware = require("../middleware/authentication")

router.post("/create", authenticationMiddleware, async(request, response) => {
    try{
        const {userID} = request.token
        const newList = request.body
        newList.userID = userID
        const userLists = await List.find({userID:userID})
        const position = userLists.length
        newList.position = position
        const savedList = new List(newList)
        await savedList.save()
        response.status(200).json({
            messageDebugConsole:`Liste correctement sauvegarder \n\n ${JSON.stringify(savedList, null, 2)}`,
            messageDebugPopup:"Erreur enregistrement liste",
            messageUserPopup:"List saved",
            payload:savedList
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:"Erreur dans l'enregistrement de la liste",
            messageDebugPopup:"Erreur enregistrement liste",
        })
    }
})


//////////////////////////////////////////////////////////////////////////////////////
// Réorganise la position des items
router.post("/sort", authenticationMiddleware, async(request, response) => {
    try{
        const {userID} = request.token
        const {newListList} = request.body
        for(let i = 0; i<newListList.length; i++){
            await List.findOneAndUpdate(
                {_id:newListList[i]._id},
                {$set:{position:i}}
            )
        }
        const ListListUpdated = await List.find({userID:userID, folderID:newListList[0].folderID})
        response.status(200).json({
            messageDebugConsole:`Ordre des listes mis à jour \n\n ${JSON.stringify(ListListUpdated, null, 2)}`, 
            messageDebugPopup:`Ordre des listes mis à jour`,
            payload:ListListUpdated
        })
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la réorganisation de l'ordre des listes`,
            payload:error.message
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Ajoute un item à la liste
router.post("/addItem", authenticationMiddleware, async(request, response) => {
    try{
        const {userID} = request.token
        const {itemID, listID, itemPosition} = request.body
        // Find the item in Item collection
        const thisItem = await Item.findById(itemID)
        // La liste concerner
        const thisList = await List.findById(listID);

        

        // Mise à jour des positions des éléments existants
        const itemsToUpdate = {};
        Object.entries(thisList.items).forEach(([key, item]) => {
            if (item.position >= itemPosition) {
                itemsToUpdate[`items.${key}.position`] = item.position + 1;
            }
        });

        // Mise à jour des positions dans la base de données
        await List.updateOne({ _id: listID }, { $set: itemsToUpdate });

        const itemKey = `items.${itemID}`
        const listUpdated = await List.findByIdAndUpdate(
            {_id:listID},
            {$set:{[itemKey]:{
                name:thisItem.content,
                position:itemPosition
            }}},
            {new:true}
        )

        
        response.status(200).json({
            messageDebugConsole:`Ajout de l'item dans la liste réussi \n\n Liste: ${JSON.stringify(listUpdated, null, 2)} \n\n Item: ${JSON.stringify(thisItem, null, 2)}`,
            messageDebugPopup:"Ajout de l'item dans la liste réussi",
            payload:{
                itemID:thisItem._id,
                listID:listUpdated._id,
                itemContent:thisItem.content,
            }
        })

    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la l'ajout de l'item dans la liste`,
            payload:error.message
        })
    }
    

})



module.exports = router