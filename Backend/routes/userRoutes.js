require("dotenv").config()
const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Item = require("../models/item")
const Folder = require("../models/folder")
const Collection = require("../models/collection")
const authenticationMiddleware = require("../middleware/authentication")
const Property = require("../models/property");
const env = process.env
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
    const {userName, userPassword, userEmail} = request.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userPassword, salt)
    const userToSave = {
        userName:userName,
        userPassword:hashedPassword,
        userEmail:userEmail,
    }
    const newUser = new User(userToSave)
    

    try{
        const userAlreadyExist = await User.findOne({userEmail:newUser.userEmail})
        if(userAlreadyExist){
            const error = new Error()
            error.messageUserPopup = "Email already in use, please try another one"
            error.messageDebugConsole = `Email déjà existant dans la base de donnée \n\n ${JSON.stringify(userEmail, null, 2)}`
            error.messageDebugPopup = `${userEmail} déjà dans la base de donnée`
            error.status = 400
            throw error
        }else{
            const savedUser = await newUser.save()
            const token = jwt.sign(
                {userID:savedUser._id}, 
                env.secret_key, 
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
                payload:savedUser
            })  
        }
    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.messageDebugConsole,
            messageDebugPopup:error.messageDebugPopup,
            messageUserPopup:error.messageUserPopup,
            errorAction:"/users/create"
        })
    }
    
})


//////////////////////////////////////////////////////////////////////////////////////
// Connecte un utilisateur
router.post("/connect", async(request, response) => {
    const {userEmail, userPassword, remember} = request.body
    try{
        const user = await User.findOne({userEmail:userEmail})
        if(!user){
            const error = new Error()
            error.messageDebugConsole=`Email inconnu dans la base de donnée \n\n ${userEmail}`,
            error.messageDebugPopup=`${userEmail} introuvable`,
            error.status = 400
            error.payload = userName
            throw error
        }else{
            const correctPassword = await bcrypt.compare(userPassword, user.userPassword)
            if(!correctPassword){
                const error = new Error()
                error.messageDebugConsole=`Le mot de passe ne correspond pas au compte associé à cet email \n\n Email : ${userEmail} \n\n Password : ${userPassword}`,
                error.messageDebugPopup=`${userPassword} ne correspond pas`,
                error.status = 400
                throw error
            }else{
                let token
                if(remember){
                    token = jwt.sign({userID:user._id}, env.secret_key)
                }
                if(!remember){
                    token = jwt.sign({userID:user._id}, env.secret_key, {expiresIn:"1h"})
                }
                response.cookie("session_token", token, {
                    httpOnly:true, // Le cookie n'est pas accessible via JavaScript côté client
                    // secure:true, // Le cookie est envoyé uniquement sur HTTPS
                    maxAge:3600000 // Durée de vie du cookie en millisecondes (1 heure ici)
                })
                response.status(200).json({
                    messageDebugConsole:`Utilisateur connecté \n\n ${JSON.stringify(user, null, 2)}`,
                    messageDebugPopup:`Utilisateur connecté (${user.userName})`,
                    messageUserPopup:`Connection successful`,
                    payload:user
                })
            }
        }
    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.messageDebugConsole,
            messageDebugPopup:error.messageDebugPopup,
            messageUserPopup:`Email or Password incorrect`,
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
        payload:"disconnection"
    })
})

//////////////////////////////////////////////////////////////////////////////////////
// Reconnecte un utilisateur
router.get("/reconnect", authenticationMiddleware, async(request,response) => {
    console.log(request.token)
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
            payload:user
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
router.get("/loadDatas", authenticationMiddleware, async(request, response) => {
    const {userID} = request.token
    
    try{
        const user = await User.findOne({_id: userID})
        const newUserFoldersList = await Folder.find({userID:userID})
        const newUserItemsList = await Item.find({userID:userID})
        const newUserCollectionsList = await Collection.find({userID:userID})
        const newUserPropertyList = await Property.find({userID:userID})
        response.status(201).json({
            messageDebugConsole:`Récupération des données de l'utilisateur réussi \n\n ${JSON.stringify(user, null, 2)}`,
            messageDebugPopup:"Récupération des données de l'utilisateur réussi",
            payload:{newUserFoldersList, newUserItemsList, newUserCollectionsList, newUserPropertyList}
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la récupération des données de l'utilisateur ${userID}`,
            messageDebugPopup:`Echec récupération données utilisateur (${userID})`,
        })
    }
})



module.exports = router