const express = require("express");
const router = express.Router();
const User = require("../models/user")
const Task = require("../models/task")
const Folder = require("../models/folder")

// middleware pour parser le JSON
router.use(express.json())


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Ajouter un utilisateur
router.post("/addUser", async(request, response) => {
    const newUser = new User(request.body)

    try{
        const userAlreadyExist = await User.findOne({userName:newUser.userName})
        if(userAlreadyExist){
            return response.status(400).json({
                message:"Nom d'utilisateur déjà existant dans la base de donnée"
            })
        }else{
            const savedUser = await newUser.save()
            response.status(200).json({
                message:
`-----------------------
Utilisateur enregistré :

${JSON.stringify(savedUser, null, 2)}`
        })  
        }
        
        
    }catch(error){
        response.status(400).json({
            message:`Echec lors de l'enregistrement de l'utilisateur \n\n${JSON.stringify(newUser, null, 2)}`,
            payload:error.message
        })
    }
    
})




//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// DEVTOOLS
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

router.delete("/DELETE_ALL_USERS", async(request, response) => {
    try{
        await Folder.deleteMany()
        await Task.deleteMany()
        await User.deleteMany()
        response.status(200).send({message:
`
---------------------------------------------------------------------------
Tout les utilisateurs, tout dossiers et toutes les tâches ont été supprimés
---------------------------------------------------------------------------`})
    }catch(error){
        response.status(400).send(error)
    }
})



module.exports = router;