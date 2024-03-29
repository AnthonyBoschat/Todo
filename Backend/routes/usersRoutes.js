const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Task = require("../models/task")
const Folder = require("../models/folder")
const authenticationMiddleware = require("../middleware/authentication")

// middleware pour parser le JSON
router.use(express.json())


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////



router.get("/reconnectUser", authenticationMiddleware, async(request,response) => {
    const {userID} = request.token
    try{
        const user = await User.findOne({_id:userID})
        if(!user){
            return response.status(400).json({
                message:"Utilisateur introuvable"
            })
        }
        response.status(200).json({
            message:`Reconnection réussi \n\n ${JSON.stringify(user, null, 2)}`,
            payload:user
        })
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la reconnection de l'utilisateur ${userID}`,
            payload:error.message
        })
    }
})




//////////////////////////////////////////////////////////////////////////////////////
// Connecte un utilisateur
router.post("/connectUser", async(request, response) => {
    const {userName, userPassword} = request.body
    try{
        const user = await User.findOne({userName:userName})
        if(!user){
            return response.status(400).json({
                message:"Nom d'utilisateur incorrecte"
            })
        }else{
            const correctPassword = await bcrypt.compare(userPassword, user.userPassword)
            if(!correctPassword){
                return response.status(400).json({
                    message:"Mot de passe incorrecte"
                })
            }else{
                const token = jwt.sign({userID:user._id}, "secretKey", {expiresIn:"1h"})
                response.cookie("session_token", token, {
                    httpOnly:true, // Le cookie n'est pas accessible via JavaScript côté client
                    // secure:true, // Le cookie est envoyé uniquement sur HTTPS
                    maxAge:3600000 // Durée de vie du cookie en millisecondes (1 heure ici)
                })
                response.status(200).json({
                    message:`Utilisateur connecté \n\n ${JSON.stringify(user, null, 2)}`,
                    payload:user
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
    const {userName, userPassword} = request.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userPassword, salt)
    const userToSave = {
        userName:userName,
        userPassword:hashedPassword
    }
    const newUser = new User(userToSave)
    

    try{
        const userAlreadyExist = await User.findOne({userName:newUser.userName})
        if(userAlreadyExist){
            return response.status(400).json({
                message:"Nom d'utilisateur déjà existant dans la base de donnée"
            })
        }else{
            const savedUser = await newUser.save()
            const token = jwt.sign(
                {userID:savedUser._id}, 
                "secretKey", 
                {expiresIn:"1h"})
            response.cookie("session_token", token, {
                httpOnly:true, // Le cookie n'est pas accessible via JavaScript côté client
                // secure:true, // Le cookie est envoyé uniquement sur HTTPS
                maxAge:3600000 // Durée de vie du cookie en millisecondes (1 heure ici)
            })
            response.status(200).json({
                message: `Utilisateur enregistré : ${JSON.stringify(savedUser, null, 2)}`,
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


router.get("/disconnection", async(request, response) => {
    response.cookie("session_token", '', {expires:new Date(0), path:"/"})
    response.status(200).json({
        message:"Deconnexion réussie."
    })
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
        response.status(200).send({message:`
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
            message:`
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