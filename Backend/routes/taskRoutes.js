const express = require("express");
const router = express.Router();
const Task = require("../models/task")
const authenticationMiddleware = require("../middleware/authentication")

// middleware pour parser le JSON
router.use(express.json())










//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
// Récupère les tasks d'un dossier
router.get("/getTasks/:folderID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    try{
        const folderID = request.params.folderID
        const allTasks = await Task.find({folderID:folderID, userID:userID})
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
            message:`La tâche a été correctement sauvegarder \n\n ${JSON.stringify(newTask, null, 2)}`,
            payload:newTask
        })
    }catch(error){
        response.status(400).json({
            message:`Echec dans l'enregistrement de la tâche ${JSON.stringify(request.body, null, 2)}`,
            payload:error.message
        });
    }
});

//////////////////////////////////////////////////////////////////////////////////////
// Supprime une task
router.delete("/deleteTask/:taskID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const taskID = request.params.taskID
    try{
        const task = await Task.findById(taskID)
        const taskDeleted = await Task.deleteOne({_id:taskID, userID:userID})
        if(!taskDeleted){
            response.status(404).json({
                message:`La tâche ${taskID} n'a pas été trouver`
            })
        }
        response.status(200).json({
            message:`La tâche a correctement été supprimer \n\n ${JSON.stringify(task, null, 2)}`,
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
router.put("/toggleTask/:taskID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const {taskID} = request.params
    const {completed} = request.body
    try{
        const updatedTask = await Task.findOneAndUpdate(
            {_id:taskID, userID:userID},
            {$set: {completed:completed}},
            {new:true}
        )
        if (!updatedTask) {
            return response.status(404).json({
                message:`Aucune tâche trouvé avec l'identifiant ${taskID}, échec de la modification de son toggle`
            });
        }
        response.status(200).json({
            message:`Le toggle de la tâche a correctement été modifier \n\n ${JSON.stringify(updatedTask, null, 2)}`,
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
router.put("/renameTask/:taskID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const taskID = request.params.taskID
    const {newTaskContent} = request.body
    try{
        const updatedTask = await Task.findOneAndUpdate(
            {_id:taskID, userID:userID},
            {$set:{content:newTaskContent}},
            {new:true}
        )
        if(!updatedTask){return response.status(404).json({
            message:`Aucune tâche trouvé avec l'identifiant ${taskID}, échec de la modification de son "content"`
        })}
        response.status(200).json({
            message:`La tâche a vu son "content" correctement mis à jour \n\n ${JSON.stringify(updatedTask, null, 2)}`,
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

