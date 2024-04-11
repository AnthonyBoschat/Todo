const express = require("express")
const router = express.Router()
const Folder = require("../models/folder")
const Task = require("../models/task")
const { ObjectId } = require('mongodb');
const authenticationMiddleware = require("../middleware/authentication")
router.use(express.json())



//////////////////////////////////////////////////////////////////////////////////////
// Enregistre un dossier
router.post("/create", authenticationMiddleware, async (request, response) => {
    try{
        const {userID} = request.token
        // On récupère la liste de tout les dossiers de l'utilisateur
        const userFolders = await Folder.find({userID:userID})
        const position = userFolders.length
        
        console.log(userFolders)
        request.body.position = position
        request.body.userID = userID
        const folder = new Folder(request.body)
        await folder.save()
        response.status(201).json({
            messageDebugConsole:`Le dossier a été enregistrer \n\n ${JSON.stringify(folder, null, 2)}`,
            messageDebugPopup:`Dossier enregistrer (${folder.name})`,
            messageUserPopup:`Folder created`,
            payload:folder
        })
    }catch(error){
        response.status(400).json({
            message:`Echec de l'enregistrement du dossier \n\n ${JSON.stringify(request.body, null, 2)}`,
            payload:error.message
        })
    }
})





//////////////////////////////////////////////////////////////////////////////////////
// Supprime un dossier
router.delete("/delete/:folderID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const folderID = request.params.folderID
    try{
        // Suppresion du dossier
        const folder = await Folder.findById(folderID)
        if(!folder){
            return response.status(404).json({message:`Impossible de trouver le dossier ${folderID}, Echec de la suppression`})
        }
        await Folder.deleteMany({_id:folderID, userID:userID})
        // Récupération de la liste des tâche associés
        const getListTask = await Task.find({folderID}).lean()
        const listDeletedTask = getListTask.map(task => `${JSON.stringify(task, null, 2)}`).join("\n")


        // Suppression des tâches associés
        const deletedTask = await Task.deleteMany({folderID:folderID, userID:userID})
        response.status(200).json({
            messageDebugConsole:`
------------------- Dossier supprimé : 

${JSON.stringify(folder, null, 2)}

------------------- Tâche supprimé (${deletedTask.deletedCount}) : 

${listDeletedTask}`,
            messageDebugPopup:`Dossier ${folder.name} et tâche supprimer ${deletedTask.deletedCount}`,
            messageUserPopup:`Folder deleted`,
            payload:folder
        })
    }catch(error){
        response.status(400).json({
            message:`Echec de la suppression du dossier ${folderID}`,
            payload:error.message
        })
    }
})



//////////////////////////////////////////////////////////////////////////////////////
// Modifie le nom d'un dossier
router.put("/rename/:folderID", authenticationMiddleware, async (request, response) => {
    const {folderID} = request.params
    const {newFolderName} = request.body
    try{
        const updatedFolder = await Folder.findByIdAndUpdate(
            folderID,
            {$set:{name:newFolderName}},
            {new:true}
        )
        if(!updatedFolder){
            return response.status(404).json({
                message:`Impossible de trouver le dossier ${folderID}, échec du renommage`
            })
        }
        response.status(200).json({
            messageDebugConsole:`Le dossier a bien été renommer \n\n ${JSON.stringify(updatedFolder, null, 2)}`, 
            messageDebugPopup:`Dossier renommer (${updatedFolder.name})`,
            messageUserPopup:`Folder renamed`,
            payload:updatedFolder
        })
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la suppression du renommage du dossier ${folderID}`,
            payload:error.message
        })
    }
})



//////////////////////////////////////////////////////////////////////////////////////
// Réorganise la position des dossiers
router.post("/sort", authenticationMiddleware, async(request, response) => {
    try{
        const {userID} = request.token
        const {newFoldersList} = request.body
        for(let i = 0; i<newFoldersList.length; i++){
            await Folder.findOneAndUpdate(
                {_id:newFoldersList[i]._id},
                {$set:{position:i}}
            )
        }
        const foldersListUpdated = await Folder.find({userID:userID})
        response.status(200).json({
            messageDebugConsole:`Ordre des dossiers mis à jour \n\n ${JSON.stringify(foldersListUpdated, null, 2)}`, 
            messageDebugPopup:`Ordre des dossiers mis à jour`,
        })
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la suppression de la réorganisation de l'ordre des dossiers`,
            payload:error.message
        })
    }
    
})


module.exports = router