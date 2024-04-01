const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Task = require("../models/task")
const Folder = require("../models/folder")
const library_finalAction = require("../Library/finalAction")
const authenticationMiddleware = require("../middleware/authentication")

// middleware pour parser le JSON
router.use(express.json())


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
// Ajouter un utilisateur
router.post("/create", async(request, response) => {
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
            const error = new Error("Nom d'utilisateur déjà existant dans la base de donnée")
            error.status = 400
            throw error
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
                messageDebugConsole: `Utilisateur enregistré : ${JSON.stringify(savedUser, null, 2)}`,
                messageDebugPopup:`Utilisateur enregistrer (${savedUser.userName})`,
                messageUserPopup:`Registration successful`,
                payload:{
                    finalAction:library_finalAction.connectUser,
                    data:savedUser
                }
            })  
        }
    }catch(error){
        console.log(error)
        response.status(400).json({
            messageDebugConsole:`Nom d'utilisateur déjà existant dans la base de donnée (${userName})`,
            messageDebugPopup:`Nom d'utilisateur existe déjà (${userName})`,
            messageUserPopup:`This username is already used. Please try another one`,
            errorAction:"/users/create"
        })
    }
    
})


//////////////////////////////////////////////////////////////////////////////////////
// Connecte un utilisateur
router.post("/connect", async(request, response) => {
    const {userName, userPassword} = request.body
    try{
        const user = await User.findOne({userName:userName})
        if(!user){
            const error = new Error("Nom d'utilisateur incorrecte")
            error.status = 400
            error.payload = userName
            throw error
        }else{
            const correctPassword = await bcrypt.compare(userPassword, user.userPassword)
            if(!correctPassword){
                const error = new Error("Mot de passe incorrecte")
                error.status = 400
                error.payload = userPassword
                throw error
            }else{
                const token = jwt.sign({userID:user._id}, "secretKey", {expiresIn:"1h"})
                response.cookie("session_token", token, {
                    httpOnly:true, // Le cookie n'est pas accessible via JavaScript côté client
                    // secure:true, // Le cookie est envoyé uniquement sur HTTPS
                    maxAge:3600000 // Durée de vie du cookie en millisecondes (1 heure ici)
                })
                response.status(200).json({
                    messageDebugConsole:`Utilisateur connecté \n\n ${JSON.stringify(user, null, 2)}`,
                    messageDebugPopup:`Utilisateur connecté (${user.userName})`,
                    messageUserPopup:`Connection successful`,
                    payload:{
                        finalAction:library_finalAction.connectUser,
                        data:user
                    }
                })
            }
        }
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`${error.message} (${error.payload})`,
            messageDebugPopup:`${error.message} (${error.payload})`,
            messageUserPopup:`userName or Password incorrect`,
            errorAction:"/users/connect"
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Deconnecte un utilisateur
router.get("/disconnect", async(request, response) => {
    response.cookie("session_token", '', {expires:new Date(0), path:"/"})
    response.status(200).json({
        messageDebugConsole:"Deconnexion réussie",
        messageDebugPopup:"Deconnexion réussie",
        messageUserPopup:"You have been disconnected",
        payload:{
            finalAction:library_finalAction.disconnectUser,
        }
    })
})

//////////////////////////////////////////////////////////////////////////////////////
// Reconnecte un utilisateur
router.get("/reconnect", authenticationMiddleware, async(request,response) => {
    const {userID} = request.token
    try{
        const user = await User.findOne({_id:userID})
        if(!user){
            return response.status(400).json({
                message:"Utilisateur introuvable"
            })
        }
        response.status(200).json({
            messageDebugConsole:`Reconnection réussi \n\n ${JSON.stringify(user, null, 2)}`,
            messageDebugPopup:`Reconnection réussi (${user.userName})`,
            messageUserPopup:"Connection successful",
            payload:{
                finalAction:library_finalAction.connectUser,
                data:user
            }
        })
    }catch(error){
        response.status(400).json({
            message:`Echec lors de la reconnection de l'utilisateur ${userID}`,
            payload:error.message,
            errorAction:"/user/reconnect"
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Récupère toute les datas de l'utilisateur
router.get("/getAllData", authenticationMiddleware, async(request, response) => {
    const {userID} = request.token
    try{
        const user = await User.findOne({_id: userID})
        const userFoldersList = await Folder.find({userID:userID})
        const userTasksList = await Task.find({userID:userID})
        response.status(201).json({
            messageDebugConsole:`Récupération des données de l'utilisateur réussi \n\n ${JSON.stringify(user, null, 2)}`,
            messageDebugPopup:"Récupération des données de l'utilisateur réussi",
            payload:{
                finalAction:library_finalAction.loadAllDatas,
                data:{newUserFoldersList:userFoldersList, newUserTasksList:userTasksList}
            }
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la récupération des données de l'utilisateur ${userID}`,
            messageDebugPopup:`Echec récupération données utilisateur (${userID})`,
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
        const foldersDeleted = await Folder.deleteMany()
        const tasksDeleted = await Task.deleteMany()
        const userDeleted = await User.deleteMany()
        response.status(200).json({
            messageDebugConsole:`Base de donnée correctement vidée \n\nUtilisateur supprimer : ${userDeleted.deletedCount}\nDossier supprimer : ${foldersDeleted.deletedCount}\nTâche supprimer : ${tasksDeleted.deletedCount}`,
            messageDebugPopup:"Base de donnée correctement vidée",
            payload:{
                finalAction:library_finalAction.disconnectUser
            },
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec de la suppression de tout les utilisateurs de la base de donnée`,
            messageDebugPopup:`Echec lors de la suppression de tout les utilisateurs`,
        })
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
            messageDebugConsole:`Suppression de l'utilisateur terminer :\n\nDossier supprimer : ${foldersDeleted.deletedCount}\nTâche supprimer : ${tasksDeleted.deletedCount}`,
            messageDebugPopup:`Utilisateur correctement supprimer (ID : ${userID})`,
            messageUserPopup:`Your account has been successfully deleted`,
            payload:{
                finalAction:library_finalAction.disconnectUser
            },
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la suppression de l'utilisateur \n\n ID : ${userID}`,
            messageDebugPopup:`Echec de la suppression de l'utilisateur (ID : ${userID})`
        })
    }
})



module.exports = router;