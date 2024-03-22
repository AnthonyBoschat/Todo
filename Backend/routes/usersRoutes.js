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
// Connecte un utilisateur
router.post("/connectUser", async(request, response) => {
    const {userName, password} = request.body
    try{
        const userNameExist = await User.findOne({userName:userName})
        if(!userNameExist){
            return response.status(400).json({
                message:"Nom d'utilisateur incorrecte"
            })
        }else{
            const correctPassword = userNameExist.userPassword === password
            if(!correctPassword){
                return response.status(400).json({
                    message:"Mot de passe incorrecte"
                })
            }else{
                response.status(200).json({
                    message:
`
Utilisateur connecté :
${JSON.stringify(userNameExist, null, 2)}`,
payload:userNameExist
                })
            }
        }
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la connection de l'utilisateur ${userName}`,
            payload:error.message
        })
    }
})

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

${JSON.stringify(savedUser, null, 2)}`,
payload:savedUser
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

//////////////////////////////////////////////////////////////////////////////////////
// Supprime tout les utilisateurs
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


//////////////////////////////////////////////////////////////////////////////////////
// Supprime l'utilisateur en cours
router.delete("/DELETE_THIS_USER/:userID", async(request, response) => {
    const userID = request.params.userID
    try{
        const userDeleted = await User.deleteMany({_id:userID})
        if(!userDeleted){ return response.status(404).json({message:`Aucun utilisateur trouver avec l'identifiant ${userID}`})}
        const foldersDeleted = await Folder.deleteMany({userID:userID})
        const tasksDeleted = await Task.deleteMany({userID:userID})
        response.status(200).json({
message:
`
---------------------------------
Suppression de l'utilisateur fini :

Tâche supprimer : ${tasksDeleted.deletedCount}
Dossier supprimer : ${foldersDeleted.deletedCount}
---------------------------------`
        })
    }catch(error){
        response.status(400).send(error)
    }
})



module.exports = router;