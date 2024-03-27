const express = require("express")
const router = express.Router()
const Folder = require("../models/folder")
const Task = require("../models/task")
const User = require("../models/user")
const authenticationMiddleware = require("../middleware/authentication")

router.use(express.json())


router.route("/:action/:target")
.all(authenticationMiddleware)

.post(async (request, response) => {
    const {action, target} = request.params
    let object
    switch(action){

        case "create":
            switch(target){

                case "task":
                    object = new Task(request.body)
                    break


                case "folder":
                    object = new Folder(request.body)
                    break


                default:
                    return response.status(400).json({message:"Target invalide"})


            }
            await object.save()
            response.status(201).json({
                message:`${target} Correctement enregistrer \n\n ${JSON.stringify(object, null, 2)}`,
                payload:object
            })
            break
            
        default:
            return response.status(400).json({message:"Action invalide."})
    }
})

module.exports = router