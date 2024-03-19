const express = require("express");
const router = express.Router();
const Task = require("../models/task")

// middleware pour parser le JSON
router.use(express.json())

// Route pour créer une nouvelle tâche
router.post("/addTask", async (request, response) => {
    try{
        const task = new Task(request.body);
        await task.save();
        response.status(201).send(task)
    }catch(error){
        response.status(400).send(error);
    }
});

// Pour récupérer la liste des tâches depuis l'ID d'un folder
router.get("/getTasks/:folderID", async (request, response) => {
    try{
        const folderID = request.params.folderID
        const allTasks = await Task.find({folderID:folderID})
        response.status(200).json(allTasks)
    }catch(error){
        response.status(400).send(error)
    }
})


// Pour le toggle d'une task depuis son id
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
            return response.status(404).send(`Aucune tâche trouvé avec l'identifiant ${taskID}`);
        }
        console.log("Tâche mise à jours avec succès :", updatedTask)
        response.status(200).json(updatedTask);
    }catch(error){
        console.log("Erreurs lors de la mise à jours de la tâche")
        response.status(400).send(error)
    }
})

// Supprime toutes les tâches d'un dossier qui vient d'être supprimer grâce à son id
router.delete("/deleteAllTaskForThisFolder/:folderID", async (request, response) => {
    const folderID = request.params.folderID
    try{
        await Task.deleteMany({folderID:folderID})
        response.status(200).json({message:`Toutes les tâches ayant pour folderID ${folderID} ont été supprimé`})
    }catch(error){
        response.status(500).json({message:error.message})
    }
})

// Supprime une tâche
router.delete("/deleteTask/:taskID", async (request, response) => {
    const taskID = request.params.taskID
    try{
        const taskDeleted = await Task.findByIdAndDelete(taskID)
        if(!taskDeleted){
            response.status(404).json({message:`La tâche ${taskID} n'a pas été trouver`})
        }
        response.status(200).json({message:`La tâche ${taskID} a correctement été supprimer`, taskDeleted:taskDeleted})
    }catch(error){
        response.status(400).json({message:`Erreur lors de la suppresion de la tâche ${taskID}`})
    }
})


// DEVTOOLS ///////////////////////////////////////////////
// Supprime toutes les tasks
router.delete("/DELETE_ALL_TASK", async (request, response) => {
    try{
        await Task.deleteMany()
        response.status(200).json({message:"Toutes les tâches ont été supprimés"})
    }catch(error){response.status(400).json({message:error.message})}
})

module.exports = router;