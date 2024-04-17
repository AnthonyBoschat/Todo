const express = require("express")
const router = express.Router()
router.use(express.json())
const Folder = require("../models/folder")
const Item = require("../models/item")
const User = require("../models/user")
const Property = require("../models/property")
const authenticationMiddleware = require("../middleware/authentication")

//////////////////////////////////////////////////////////////////////////////////////
// Supprime tout les dossiers de cette utilisateur
router.delete("/DELETE_ALL_FOLDERS/:userID", async (request, response) => {
    const userID = request.params.userID
    try{
        const foldersDeleted = await Folder.deleteMany({userID:userID})
        const ItemsDeleted = await Item.deleteMany({userID:userID})
        response.status(200).json({
            messageDebugConsole:`Tout les dossier et toutes les tâches ont été supprimer \n\nDossier : ${foldersDeleted.deletedCount}\nTâches : ${ItemsDeleted.deletedCount} `,
            messageDebugPopup:`Tout les dossier et toutes les tâches supprimer`,
            payload:"DELETE_ALL_FOLDERS"
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la suppression de tout les dossier et toutes les tâches de cet utilisateur`,
            messageDebugPopup:`Echec de la suppression des dossier et des tâches`,
        })
    }
})


//////////////////////////////////////////////////////////////////////////////////////
// Supprime toutes les tâches
router.delete("/DELETE_ALL_ITEMS/:folderID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const folderID = request.params.folderID
    try{
        const allItems = await Item.find({folderID:folderID})
        const deletedItems = await Item.deleteMany({folderID:folderID})
        const deletedProperty = await Property.deleteMany({folderID:folderID})
        const allItemsUpdate = await Item.find({userID:userID}) // Pertinence ?
        response.status(200).json({
            messageDebugConsole:`Toutes les tâches ont été supprimés \n\n ${JSON.stringify(allItems, null, 2)}`,
            messageDebugPopup:`Toutes les tâches ont été supprimer (${deletedItems.deletedCount})`,
            payload:allItemsUpdate
        })
    }catch(error){response.status(400).json({
        messageDebugConsole:`Echec lors de la suppression des Items du dossier \n\n ${folderID}`,
        messageDebugPopup:"Echec lors de la suppression des Items",
        messageUserPopup:"Une erreur est survenue"
    })}
})

//////////////////////////////////////////////////////////////////////////////////////
// Supprime l'utilisateur en cours
router.delete("/DELETE_THIS_USER/:userID", async(request, response) => {
    const userID = request.params.userID
    try{
        const userDeleted = await User.deleteMany({_id:userID})
        if(!userDeleted){ return response.status(404).json({message:`Aucun utilisateur trouver avec l'identifiant ${userID}`})}
        const foldersDeleted = await Folder.deleteMany({userID:userID})
        const ItemsDeleted = await Item.deleteMany({userID:userID})
        response.status(200).json({
            messageDebugConsole:`Suppression de l'utilisateur terminer :\n\nDossier supprimer : ${foldersDeleted.deletedCount}\nTâche supprimer : ${ItemsDeleted.deletedCount}`,
            messageDebugPopup:`Utilisateur correctement supprimer (ID : ${userID})`,
            messageUserPopup:`Your account has been successfully deleted`,
            payload:"DELETE_THIS_USER"
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la suppression de l'utilisateur \n\n ID : ${userID}`,
            messageDebugPopup:`Echec de la suppression de l'utilisateur (ID : ${userID})`
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Supprime tout les utilisateurs
router.delete("/DELETE_ALL_USERS", async(request, response) => {
    try{
        const foldersDeleted = await Folder.deleteMany()
        const ItemsDeleted = await Item.deleteMany()
        const userDeleted = await User.deleteMany()
        response.status(200).json({
            messageDebugConsole:`Base de donnée correctement vidée \n\nUtilisateur supprimer : ${userDeleted.deletedCount}\nDossier supprimer : ${foldersDeleted.deletedCount}\nTâche supprimer : ${ItemsDeleted.deletedCount}`,
            messageDebugPopup:"Base de donnée correctement vidée",
            payload:"DELETE_ALL_USERS"
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec de la suppression de tout les utilisateurs de la base de donnée`,
            messageDebugPopup:`Echec lors de la suppression de tout les utilisateurs`,
        })
    }
})

module.exports = router