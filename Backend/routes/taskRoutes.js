const express = require("express");
const router = express.Router();
const Task = require("../models/task")
const authenticationMiddleware = require("../middleware/authentication");

// middleware pour parser le JSON
router.use(express.json())


//////////////////////////////////////////////////////////////////////////////////////
// Ajoute une tâche
router.post("/create", authenticationMiddleware, async (request, response) => {
    try{
        const {userID} = request.token
        request.body.userID = userID
        const newTask = new Task(request.body);
        await newTask.save();
        response.status(200).json({
            messageDebugConsole:`La tâche a été correctement sauvegarder \n\n ${JSON.stringify(newTask, null, 2)}`,
            messageDebugPopup:`Tâche sauvegarder`,
            payload:newTask
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec dans l'enregistrement de la tâche ${JSON.stringify(request.body, null, 2)}`,
            messageDebugPopup:`Echec de l'enregistrement de la tâche`,
        });
    }
});




//////////////////////////////////////////////////////////////////////////////////////
// Supprime une task
router.delete("/delete/:taskID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const taskID = request.params.taskID
    try{
        const task = await Task.findById(taskID)
        const taskDeleted = await Task.deleteOne({_id:taskID, userID:userID})
        if(!taskDeleted){
            throw Error()
        }
        response.status(200).json({
            messageDebugConsole:`La tâche a correctement été supprimer \n\n ${JSON.stringify(task, null, 2)}`,
            messageDebugPopup:`Tâche supprimer (${task._id})`,
            messageUserPopup:`Task deleted`,
            payload:task
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Erreur lors de la suppresion de la tâche ${taskID}`,
            messageDebugPopup:`Echec de la suppression de la tâche`,
        })
    }
})





//////////////////////////////////////////////////////////////////////////////////////
// Toggle une task (completed)
router.put("/toggleCompleted/:taskID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const {taskID} = request.params
    const {completed} = request.body
    try{
        const updatedTask = await Task.findOneAndUpdate(
            {_id:taskID, userID:userID},
            {$set: {completed:completed, onWorking:false}},
            {new:true}
        )
        if (!updatedTask) {
            throw Error()
        }
        response.status(200).json({
            messageDebugConsole:`Le toggle completed de la tâche a correctement été modifier \n\n ${JSON.stringify(updatedTask, null, 2)}`,
            messageDebugPopup:"Toggle completed modifier",
            payload:updatedTask
        });
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la modification du toggle completed de la tâche ${taskID}`,
            messageDebugPopup:"Echec mise à jour du toggle completed",
        })
    }
})


//////////////////////////////////////////////////////////////////////////////////////
// Toggle une task (onWorking)
router.put("/toggleOnWorking/:taskID", authenticationMiddleware, async(request, response) => {
    const {userID} = request.token
    const {taskID} = request.params
    const {onWorking} = request.body
    try{
        const resetTask = await Task.findOneAndUpdate(
            {userID:userID, onWorking:true},
            {$set: {onWorking:false}},
            {new:true}
        )
        const updatedTask = await Task.findOneAndUpdate(
            {_id:taskID, userID:userID},
            {$set: {onWorking:onWorking}},
            {new:true}
        )
        if(!updatedTask){
            throw Error()
        }

        response.status(200).json({
            messageDebugConsole:`Le toggle onWorking de la tâche a correctement été modifier \n\n ${JSON.stringify(updatedTask, null, 2)}`,
            messageDebugPopup:"Toggle onWorking modifier",
            payload:[updatedTask, resetTask]
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la modification du toggle onWorking de la tâche ${taskID}`,
            messageDebugPopup:"Echec mise à jour du toggle onWorking",
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Rename une task
router.put("/rename/:taskID", authenticationMiddleware, async (request, response) => {
    const {userID} = request.token
    const taskID = request.params.taskID
    const {newTaskContent} = request.body
    try{
        const updatedTask = await Task.findOneAndUpdate(
            {_id:taskID, userID:userID},
            {$set:{content:newTaskContent}},
            {new:true}
        )
        if(!updatedTask){
            throw Error()
        }
        response.status(200).json({
            messageDebugConsole:`La tâche a vu son "content" correctement mis à jour \n\n ${JSON.stringify(updatedTask, null, 2)}`,
            messageDebugPopup:"Contenu de la tâche mise à jour",
            messageUserPopup:"Task updated",
            payload:updatedTask
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la modification du content de la tâche ${taskID}`,
            messageDebugPopup:"Echec mise à jour du contenu de la tâche",
        })
    }
})


module.exports = router;

