const express = require("express")
const router = express.Router()
router.use(express.json())
const Folder = require("../models/folder")
const Task = require("../models/task")
const User = require("../models/user")
const authenticationMiddleware = require("../middleware/authentication")

//////////////////////////////////////////////////////////////////////////////////////
// Supprime tout les dossiers de cette utilisateur
router.delete("/DELETE_ALL_FOLDERS/:userID", async (request, response) => {
    const userID = request.params.userID
    try{
        const foldersDeleted = await Folder.deleteMany({userID:userID})
        const tasksDeleted = await Task.deleteMany({userID:userID})
        response.status(200).json({
            messageDebugConsole:`Tout les dossier et toutes les tâches ont été supprimer \n\nDossier : ${foldersDeleted.deletedCount}\nTâches : ${tasksDeleted.deletedCount} `,
            messageDebugPopup:`Tout les dossier et toutes les tâches supprimer`,
            // payload:{
            //     finalAction:library_finalAction.DEVTOOLS_DELETE_ALL_FOLDERS
            // }
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
router.delete("/DELETE_ALL_TASKS/:folderID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const folderID = request.params.folderID
    try{
        const allTasks = await Task.find({folderID:folderID})
        const deletedTasks = await Task.deleteMany({folderID:folderID})
        const allTasksUpdate = await Task.find({userID:userID}) // Pertinence ?
        response.status(200).json({
            messageDebugConsole:`Toutes les tâches ont été supprimés \n\n ${JSON.stringify(allTasks, null, 2)}`,
            messageDebugPopup:`Toutes les tâches ont été supprimer (${deletedTasks.deletedCount})`,
            // payload:{
            //     finalAction:library_finalAction.DEVTOOLS_DELETE_ALL_TASKS,
            //     target:library_target.tasks,
            //     data:allTasksUpdate,
            // }
            payload:allTasksUpdate
            // payload:{
            //     finalAction:"DEVTOOL/DELETE_ALL_TASKS",
            //     data:allTasksUpdate,
            // }
        })
    }catch(error){response.status(400).json({
        messageDebugConsole:`Echec lors de la suppression des tasks du dossier \n\n ${folderID}`,
        messageDebugPopup:"Echec lors de la suppression des tasks",
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
        const tasksDeleted = await Task.deleteMany({userID:userID})
        response.status(200).json({
            messageDebugConsole:`Suppression de l'utilisateur terminer :\n\nDossier supprimer : ${foldersDeleted.deletedCount}\nTâche supprimer : ${tasksDeleted.deletedCount}`,
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
        const tasksDeleted = await Task.deleteMany()
        const userDeleted = await User.deleteMany()
        response.status(200).json({
            messageDebugConsole:`Base de donnée correctement vidée \n\nUtilisateur supprimer : ${userDeleted.deletedCount}\nDossier supprimer : ${foldersDeleted.deletedCount}\nTâche supprimer : ${tasksDeleted.deletedCount}`,
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