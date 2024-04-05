require("dotenv").config()
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Task = require("../models/task")
const Folder = require("../models/folder")
const Recover = require("../models/recover")
const authenticationMiddleware = require("../middleware/authentication")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const env = process.env
// middleware pour parser le JSON
router.use(express.json())

const generateRandomCode = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length)
}


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
                payload:savedUser
            })  
        }
    }catch(error){
        console.log(error)
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
    const {userEmail, userPassword} = request.body
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
        const newUserTasksList = await Task.find({userID:userID})
        response.status(201).json({
            messageDebugConsole:`Récupération des données de l'utilisateur réussi \n\n ${JSON.stringify(user, null, 2)}`,
            messageDebugPopup:"Récupération des données de l'utilisateur réussi",
            // payload:{
            //     finalAction:"user/loadDatas",
            //     data:{newUserFoldersList, newUserTasksList}
            // }
            payload:{newUserFoldersList, newUserTasksList}
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:`Echec lors de la récupération des données de l'utilisateur ${userID}`,
            messageDebugPopup:`Echec récupération données utilisateur (${userID})`,
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////
// Permet de récupérer un mot de passe
router.post("/SendEmail_ResetPasswordCode/:userEmail", async(request,response) => {
    const {userEmail} = request.params
    try{
        const user = await User.findOne({userEmail:userEmail})
        if(!user){
            const error = new Error()
            error.messageDebugConsole = `Aucun utilisateur de connu dans la base de donnée avec cette adresse email \n\n ${userEmail}`,
            error.messageDebugPopup = `${userEmail} aucun utilisateur connu` 
            throw error
        }
        const revoveryCode = generateRandomCode(6)
        const newRecoveryDocument = new Recover({
            recoveryCode:revoveryCode
        })
        await newRecoveryDocument.save()
        
        // Envoie de l'email
        const transporter = nodemailer.createTransport({
            service:"hotmail",
            auth:{
                user:env.recoverMail,
                pass:env.recoverMailpassword
            }
        })

        const mailOptions = {
            from: `"Gestionnaire de tâche" <${env.recoverMail}>`,
            to:userEmail,
            subject:"Password recovery",
            text:`<br/><br/>Here is your password reset code to enter in the application : <b>${revoveryCode}</b> <br/><br/> This code will only work for the next <b>15 minutes</b>`,
            html:`<br/><br/>Here is your password reset code to enter in the application : <b>${revoveryCode}</b> <br/><br/> This code will only work for the next <b>15 minutes</b>`
        }
        const emailSend = await transporter.sendMail(mailOptions)
        response.status(201).json({
            messageDebugConsole:"Code d'authentification correctement envoyer",
            messageDebugPopup:"Email envoyer",
            messageUserPopup:"An email has been sent at your email adress",
        })

    }catch(error){
        response.status(201).json({
            messageDebugConsole:error.messageDebugConsole,
            messageDebugPopup:error.messageDebugPopup,
            messageUserPopup:"An error occurred, please try again later",
        })
    }
})



module.exports = router;