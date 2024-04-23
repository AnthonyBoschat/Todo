const express = require("express")
const router = express.Router()
router.use(express.json())
const List = require("../models/list")
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



module.exports = router