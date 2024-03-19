const express = require("express")
const router = express.Router()
const Folder = require("../models/folder")

router.use(express.json())






// Récupère tout les dossiers
router.get("/getAllFolders", async(request, response) => {
    try{
        const allFolders = await Folder.find({})
        response.status(200).json(allFolders)
    }catch(error){
        response.status(400).send(error)
    }
})

// Ajoute un dossier
router.post("/addFolder", async (request, response) => {
    try{
        const folder = new Folder(request.body)
        await folder.save()
        response.status(201).send(folder)
    }catch(error){
        response.status(400).send(error)
    }
})

// Supprime un dossier grâce à son ID
router.delete("/deleteFolder/:folderID", async (request, response) => {
    const folderID = request.params.folderID
    try{
        const deletedFolder = await Folder.findByIdAndDelete(folderID)
        if(!deletedFolder){
            return response.status(404).send(`Impossible de trouver le dossier ${folderID}, Echec de la suppression`)
        }
        response.status(200).json({message:`Dossier supprimé avec succès : ${deletedFolder.name}`})
    }catch(error){
        response.status(400).send(error.message)
        console.log(error)
    }
})

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
            return response.status(404).send(`Impossible de trouver le dossier ${folderID}, échec du renommage`)
        }
        response.status(200).json({message:`Le dossier ${folderID} a bien été renommer (${newFolderName})`, updatedFolder:updatedFolder})
    }catch(error){
        response.status(400).json({message:error.message})
    }
})




// DEVTOOLS ///////////////////////////////////////////////
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