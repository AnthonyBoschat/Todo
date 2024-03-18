const express = require("express");
const router = express.Router();
const Task = require("../models/task")

// middleware pour parser le JSON
router.use(express.json())

// Route pour créer une nouvelle tâche
router.post("/", async (request, response) => {
    try{
        const task = new Task(request.body);
        await task.save();
        response.status(201).send(task)
    }catch(error){
        response.status(400).send(error);
    }
});

// Route pour récupérer toutes les tâches
router.get('/', async (request, response) => {
    try {
      const tasks = await Task.find({});
      response.send(tasks);
    } catch (error) {
      response.status(500).send();
    }
  });

module.exports = router;