const express = require("express")
const router = express.Router()
const Folder = require("../models/folder")

router.use(express.json())


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Récupère tout les dossiers
router.get("/getAllFolders", async(request, response) => {
    try{
        const allFolders = await Folder.find({})
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
        const deletedFolder = await Folder.findByIdAndDelete(folderID)
        if(!deletedFolder){
            return response.status(404).json({message:`Impossible de trouver le dossier ${folderID}, Echec de la suppression`})
        }
        response.status(200).json({
            message:`Dossier supprimé avec succès : ${deletedFolder.name}`, 
            payload:deletedFolder
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
// Supprime tout les dossiers
router.delete("/DELETE_ALL_FOLDER", async (request, response) => {
    try{
        await Folder.deleteMany()
        response.status(200).send({message:"Tout les dossiers ont été supprimés"})
    }catch(error){
        response.status(400).send(error)
    }
})




module.exports = router