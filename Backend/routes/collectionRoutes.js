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
            messageUserPopup:"Collection created",
            payload:savedList
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:"Erreur dans l'enregistrement de la liste",
            messageDebugPopup:"Erreur enregistrement liste",
        })
    }
})

router.delete("/delete/:collectionID", authenticationMiddleware, async(request,response) => {
    try{
        const {userID} = request.token
        const {collectionID} = request.params

        // On trouve la collection
        const thisCollection = await Collection.findById(collectionID)
        const deletedCollection = await Collection.findOneAndDelete({_id:collectionID, userID:userID})
        if(deletedCollection){
            response.status(200).json({
                messageDebugConsole:"Collection correctement supprimer dans la base de donnée",
                messageUserPopup:"Collection deleted",
                payload:collectionID,
            })
        }else{
            throw new Error()
        }
    }catch(error){
        response.status(400).json({
            messageDebugConsole:"Erreur lors de la suppression de la collection",
            message:error.message
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
        const {itemID, collectionsID} = request.body
        // On trouve l'item correspondant à cet ID
        const thisItem = await Item.findById(itemID)

        const allFinalPosition = []
        // Pour chaque collection dans laquell l'item doit etre ajouter
        for(const collectionID of collectionsID) {
            const thisCollection = await Collection.findById(collectionID) // On trouve la collection en cours de traitement
            const itemsArray = Object.values(thisCollection.items)
            const maxPosition = itemsArray.reduce((max, item) => {
                return item.position > max ? item.position : max
            }, 0)

            // const thisCollectionLength = Object.keys(thisCollection.items).length
            const finalPosition = maxPosition + 1
            allFinalPosition.push({position:finalPosition, collectionID:collectionID})

            
            if(thisCollection.items[itemID]){ // Si l'item est déjà présent dans cette collection on sort de la fonction
                continue
            }
            // Enfin, on peut enregistrer l'item dans cette collection
            const itemKey = `items.${itemID}`
            await Collection.findByIdAndUpdate(
                {_id:collectionID},
                {$set:{[itemKey]:{
                    name:thisItem.content,
                    position:finalPosition
                }}},
            )
        }
        response.status(200).json({
            messageDebugConsole:`Ajout de l'item dans la liste réussi \n\n Item: ${JSON.stringify(thisItem, null, 2)}`,
            messageDebugPopup:"Ajout de l'item dans la liste réussi",
            payload:{
                itemID:thisItem._id,
                itemContent:thisItem.content,
                itemPosition:allFinalPosition
            }
        })

        
        

    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de l'ajout de l'item dans la liste`,
            payload:error.message
        })
    }
})

router.delete("/deleteItem/:collectionID/:itemID", authenticationMiddleware, async(request, response) => {
    const {itemID, collectionID} = request.params
    try{
        // On créé le chemin dynamique
        const itemsPath = `items.${itemID}`
        const updatedCollection = await Collection.findByIdAndUpdate(collectionID, {
            $unset: {[itemsPath] : ""},
        }, {new:true})
        // On trouve la collection correspondante à l'identifiant
        if(!updatedCollection){
            const error = new Error()
            error.messageDebugConsole = `La collection n'a pas été trouver \n\n collection_ID : ${collectionID}`
            throw error
        }
        if(Object.keys(updatedCollection.items).length === 0){
            await Collection.findByIdAndUpdate(collectionID, { $unset: { items: "" } });
        }
        response.status(201).json({
            messageDebugConsole:`Suppression de l'item correctement effectuer \n\n Nouvelle collection : ${JSON.stringify(updatedCollection, null, 2)}`,
            messageDebugPopup:"Item supprimer de la collection",
            payload:{
                itemID,
                collectionID
            }
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.messageDebugConsole || "Une erreur est survenue dans la route collection/deleteItem",
            payload:error.message
        })
    }
})

router.delete("/deleteItemGlobal/:itemID/:collectionsID", authenticationMiddleware, async(request, response) => {
    try{
        const {itemID, collectionsID} = request.params
        const collectionsIDArray = collectionsID.split(",")
        await collectionsIDArray.forEach( async(collectionID) => {
            // const thisCollection = await Collection.findById(collectionID)
            const itemKey = `items.${itemID}`
            await Collection.findByIdAndUpdate(
                {_id:collectionID},
                {$unset: {[itemKey]: ""}}
            )
        })
        response.status(200).json({
            messageDebugConsole:"Suppression des items en mode Global réussi",
            payload:{
                itemID:itemID,
                collectionsID:collectionsIDArray
            }
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.messageDebugConsole || "Une erreur est survenue dans la route collection/deleteItemGlobal",
            payload:error.message
        })
    }
})



module.exports = router