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



module.exports = router