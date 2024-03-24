const express = require("express")
const router = express.Router()
const Folder = require("../models/folder")
const Task = require("../models/task")

router.use(express.json())


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Récupère tout les dossiers
router.get("/getAllFolders/:userID", async(request, response) => {
    const userID = request.params.userID
    try{
        const allFolders = await Folder.find({userID:userID})
        response.status(200).json({
            message:"Tout les dossiers ont été récupérer avec succès",
            payload:allFolders
        })
    }catch(error){
        response.status(400).json({
            message:"Echec lors de la récupération des dossiers",
            payload:error.message
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Enregistre un dossier
router.post("/addFolder", async (request, response) => {
    try{
        const folder = new Folder(request.body)
        await folder.save()
        response.status(201).json({
            message:`Le dossier ${folder.name} a été enregistrer.`,
            payload:folder
        })
    }catch(error){
        response.status(400).json({
            message:`Echec de l'enregistrement du dossier ${request.body}`,
            payload:error.message
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Supprime un dossier
router.delete("/deleteFolder/:folderID", async (request, response) => {
    const folderID = request.params.folderID
    try{
        // Suppresion du dossier
        const deletedFolder = await Folder.findByIdAndDelete(folderID)
        if(!deletedFolder){
            return response.status(404).json({message:`Impossible de trouver le dossier ${folderID}, Echec de la suppression`})
        }
        // Récupération de la liste des tâche associés
        const getListTask = await Task.find({folderID}).lean()
        const listTask = getListTask.map(task => 
`
Task._id => ${task._id}
Task.folderID => ${task.folderID}
Task.content => ${task.content}
Task.completed => ${task.completed}
`).join("\n")


        // Suppression des tâches associés
        const deletedTask = await Task.deleteMany({folderID:folderID})
        response.status(200).json({
            message:
`
------------------- Dossier supprimé : 

deleteFolder.name => ${deletedFolder.name}
deletedFolder._id => ${deletedFolder._id}

------------------- Tâche supprimé (${deletedTask.deletedCount}) : 

${listTask}`,
            payload:folderID
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
router.put("/updateFolderName/:folderID", async (request, response) => {
    const {folderID} = request.params
    console.log(folderID)
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
            message:`Le dossier ${folderID} a bien été renommer (${newFolderName})`, 
            payload:updatedFolder})
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la suppression du renommage du dossier ${folderID} => ${newFolderName}`,
            payload:error.message
        })
    }
})




//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// DEVTOOLS
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Supprime tout les dossiers de cette utilisateur
router.delete("/DELETE_ALL_FOLDER/:userID", async (request, response) => {
    const userID = request.params.userID
    try{
        await Folder.deleteMany({userID:userID})
        await Task.deleteMany({userID:userID})
        response.status(200).send({message:
`
---------------------------------------------------------
Tout les dossiers et toutes les tâches ont été supprimés
---------------------------------------------------------`})
    }catch(error){
        response.status(400).send(error)
    }
})




module.exports = router