const express = require("express")
const router = express.Router()
router.use(express.json())
const Collection = require("../models/collection")
const Item = require("../models/item")
const authenticationMiddleware = require("../middleware/authentication")

router.post("/create", authenticationMiddleware, async(request, response) => {
    try{
        const {userID} = request.token
        const newList = request.body
        newList.userID = userID
        const userLists = await Collection.find({userID:userID})
        const position = userLists.length
        newList.position = position
        const savedList = new Collection(newList)
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
        const {newCollectionsList} = request.body
        for(let i = 0; i<newCollectionsList.length; i++){
            await Collection.findOneAndUpdate(
                {_id:newCollectionsList[i]._id},
                {$set:{position:i}}
            )
        }
        const CollectionListUpdated = await Collection.find({userID:userID, folderID:newCollectionsList[0].folderID})
        response.status(200).json({
            messageDebugConsole:`Ordre des listes mis à jour \n\n ${JSON.stringify(CollectionListUpdated, null, 2)}`, 
            messageDebugPopup:`Ordre des listes mis à jour`,
            payload:CollectionListUpdated
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
        const thisList = await Collection.findById(listID);



        let finalPosition // Position final de l'item à ajouter
        let itemsToUpdatePosition = {} // Initialisation d'un objet qui sert à récupérer les possibles nouvelles positions des éléments


        // Si l'item existe déjà dans la liste
        if(thisList.items[itemID]){
            response.status(400).json({
                messageUserPopup:"This object is already saved in this list"
            })
            return
        }
        // Si l'item n'existe pas encore, on peut l'enregistrer
        else{

            // On verifie la taille de cette liste, si 0, pas besoin de mettre à jours des positions, on initialise la position à 0
            if(Object.entries(thisList.items).length === 0){
                finalPosition = 0
            }
            
            // Si la liste contient déjà des items, la position du nouvel objet est bien sa position de drop
            else{ 
                finalPosition = itemPosition

                // On rempli itemsToUpdatePosition des nouvelles position des élément suivent dans la liste au augmentant de 1 leurs positions
                Object.entries(thisList.items).forEach(([key, item]) => {
                    if (item.position >= itemPosition) {
                        itemsToUpdatePosition[`items.${key}.position`] = item.position + 1
                    }
                });

                // Mise à jour des nouvelles positions dans la base de données pour les items qui était déjà présent
                await Collection.updateOne({ _id: listID }, { $set: itemsToUpdatePosition });
            }
        }
        // Enfin, on peut enregistrer le nouveau item, avec la finalPosition défini plus haut
        const itemKey = `items.${itemID}`
        const listUpdated = await Collection.findByIdAndUpdate(
            {_id:listID},
            {$set:{[itemKey]:{
                name:thisItem.content,
                position:finalPosition
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
                itemPosition:finalPosition
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