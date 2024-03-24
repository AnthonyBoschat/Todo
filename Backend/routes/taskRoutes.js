const express = require("express");
const router = express.Router();
const Task = require("../models/task")

// middleware pour parser le JSON
router.use(express.json())









//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
// Récupère les tasks d'un dossier
router.get("/getTasks/:folderID", async (request, response) => {
    try{
        const folderID = request.params.folderID
        const allTasks = await Task.find({folderID:folderID})
        response.status(200).json({
            message:`Toutes les tâches du dossier  "${folderID}" ont été récupérer avec succès`,
            payload:allTasks
        })
    }catch(error){
        response.status(400).json({
            message:`Echec de la récupération des tâches du dossier "${folderID}"`,
            payload:error.message
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Ajoute une tâche
router.post("/addTask", async (request, response) => {
    try{
        const newTask = new Task(request.body);
        await newTask.save();
        response.status(200).json({
            message:`La tâche ${newTask._id} a été correctement sauvegarder`,
            payload:newTask
        })
    }catch(error){
        response.status(400).json({
            message:`Echec dans l'enregistrement de la tâche ${request.body}`,
            payload:error.message
        });
    }
});

//////////////////////////////////////////////////////////////////////////////////////
// Supprime une task
router.delete("/deleteTask/:taskID", async (request, response) => {
    const taskID = request.params.taskID
    try{
        const taskDeleted = await Task.findByIdAndDelete(taskID)
        if(!taskDeleted){
            response.status(404).json({
                message:`La tâche ${taskID} n'a pas été trouver`
            })
        }
        response.status(200).json({
            message:`La tâche ${taskID} a correctement été supprimer`,
            payload:taskDeleted
        })
    }catch(error){
        response.status(400).json({
            message:`Erreur lors de la suppresion de la tâche ${taskID}`,
            payload:error.message
        })
    }
})


//////////////////////////////////////////////////////////////////////////////////////
// Toggle une task
router.put("/toggleTask/:taskID", async (request, response) => {
    const {taskID} = request.params
    const {completed} = request.body
    try{
        const updatedTask = await Task.findByIdAndUpdate(
            taskID,
            {$set:{completed:completed}},
            {new:true}
        )
        if (!updatedTask) {
            return response.status(404).json({
                message:`Aucune tâche trouvé avec l'identifiant ${taskID}, échec de la modification de son toggle`
            });
        }
        response.status(200).json({
            message:`Le toggle de la tâche ${updatedTask._id} a correctement été modifier`,
            payload:updatedTask
        });
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la modification du toggle de la tâche ${taskID}`,
            payload:error.message
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Rename une task
router.put("/renameTask/:taskID", async (request, response) => {
    const taskID = request.params.taskID
    const {newTaskContent} = request.body
    try{
        const updatedTask = await Task.findByIdAndUpdate(
            taskID,
            {$set:{content:newTaskContent}},
            {new:true}
        )
        if(!updatedTask){return response.status(404).json({
            message:`Aucune tâche trouvé avec l'identifiant ${taskID}, échec de la modification de son "content"`
        })}
        response.status(200).json({
            message:`La tâche ${taskID} a vu son "content" correctement mis à jour`,
            payload:updatedTask
        })
    }catch(error){
        response.status(400).json({
            message:`La modification du contenu de la task ${taskID} a échoué.`,
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
// Supprime toutes les tâches
router.delete("/deleteAllTaskForThisFolder/:folderID", async (request, response) => {
    const folderID = request.params.folderID
    try{
        await Task.deleteMany({folderID:folderID})
        response.status(200).json({message:"Toutes les tâches ont été supprimés"})
    }catch(error){response.status(400).json({message:error.message})}
})

module.exports = router;

