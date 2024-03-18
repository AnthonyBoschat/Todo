const express = require("express")
const router = express.Router()
const Folder = require("../models/folder")

router.use(express.json())

router.post("/addFolder", async (request, response) => {
    try{
        const folder = request.body
        await folder.save()
        response.status(201).send(folder)
    }catch(error){
        response.status(400).send(error)
    }
})