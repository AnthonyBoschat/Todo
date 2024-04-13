require("dotenv").config()
const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Item = require("../models/item")
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
        const newUserItemsList = await Item.find({userID:userID})
        response.status(201).json({
            messageDebugConsole:`Récupération des données de l'utilisateur réussi \n\n ${JSON.stringify(user, null, 2)}`,
            messageDebugPopup:"Récupération des données de l'utilisateur réussi",
            payload:{newUserFoldersList, newUserItemsList}
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
router.post("/sendRecoverPasswordEmail", async(request,response) => {
    const {userEmail} = request.body
    try{
        // Verification que l'utilisateur existe dans la base de donnée, sinon, on envoie pas le mail
        const user = await User.findOne({userEmail:userEmail})
        if(!user){
            const error = new Error()
            error.messageDebugConsole = `Aucun utilisateur de connu dans la base de donnée avec cette adresse email \n\n ${userEmail}`,
            error.messageDebugPopup = `${userEmail} aucun utilisateur connu` 
            throw error
        }
        // On supprime l'éventuel ancien code qui était associé à cet adresse email
        await Recover.findOneAndDelete({userEmail:userEmail})
        // On génère un nouveau code
        const revoveryCode = generateRandomCode(6)
        // On sauvegarde un document Rcover avec le code généré, et l'email associé
        const newRecoveryDocument = new Recover({
            userEmail:userEmail,
            recoveryCode:revoveryCode
        })
        await newRecoveryDocument.save()
        
        // Envoie de l'email
        const transporter = nodemailer.createTransport({
            host:"localhost",
            port:1025, // Par défaut, mailHog écoute ce port
            secure:false,
        })
        const mailOptions = {
            from: `ItemNest <noreply@Itemnest.example>`,
            to:userEmail,
            subject:"Password recovery",
            text:`Here is your password reset code to enter in the application : ${revoveryCode}  This code will only work for the next 15 minutes`,
            html:`<br/><br/>Here is your password reset code to enter in the application : <b>${revoveryCode}</b> <br/><br/> This code will only work for the next <b>15 minutes</b>`
        }
        await transporter.sendMail(mailOptions)

        // réponse
        response.status(201).json({
            messageDebugConsole:"Code d'authentification correctement envoyer",
            messageDebugPopup:"Email envoyer",
            messageUserPopup:"A reset code has been sent at this email adress ",
        })

    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.messageDebugConsole,
            messageDebugPopup:error.messageDebugPopup,
            messageUserPopup:"Unknown email address",
        })
    }
})


router.post("/checkResetPasswordCode", async(request, response) => {
    const {userResetCode, userEmail} = request.body
    try{
        const validCode = await Recover.findOne({recoveryCode:userResetCode, userEmail:userEmail})
        if(!validCode){
            const error = new Error()
            error.messageDebugConsole = `Le code d'authentification n'est pas valide, ou ne correspond à aucune adresse email \n\n ${userResetCode} \n\n ${userEmail}`,
            error.messageDebugPopup = `${userResetCode} Code incorrecte` 
            throw error
        }
        await Recover.findOneAndDelete({_id:validCode._id})
        response.status(201).json({
            messageDebugConsole:`Code de réinitialisation valide \n\n ${userResetCode} \n\n ${userEmail}`,
            messageDebugPopup:"Code de réinitialisation valide",
            messageUserPopup:"Code valid",
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.messageDebugConsole,
            messageDebugPopup:error.messageDebugPopup,
            messageUserPopup:"This code is incorrect, please retry",
        })
    }
})

router.put("/changePassword/:userEmail", async(request, response) => {
    try{
        const {userEmail} = request.params
        const {userNewPassword} = request.body
        const thisUser = await User.findOne({userEmail:userEmail})
        if(!thisUser){
            const error = new Error()
            error.messageDebugConsole = `Aucune utilisateur de trouver associé avec cette adresse email dans la base de donnée \n\n ${userEmail}`,
            error.messageDebugPopup = `${userEmail} inexistant dans la base de donnée`
            throw error
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userNewPassword, salt)
        const updatedUser = await User.findOneAndUpdate(
            {_id:thisUser._id},
            {$set: {userPassword:hashedPassword}},
            {new:true}
        )
        response.status(200).json({
            messageDebugConsole:`Le mot de passe de l'utilisateur a été correctement modifier \n\n Mail : ${updatedUser.userEmail} \n ID : ${updatedUser._id}`,
            messageDebugPopup:"Mot de passe correctement modifier",
            messageUserPopup:"Your new password have been saved"
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.messageDebugConsole,
            messageDebugPopup:error.messageDebugPopup,
            messageUserPopup:"An erro have been occured, please retry",
        })
    }
})



module.exports = router