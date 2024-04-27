require("dotenv").config()
const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Recovery = require("../models/recovery")
const recoveryCodeVerify = require("../middleware/recoveryCodeVerify")
const extractUserID = require("../middleware/extractUserID")
const nodemailer = require("nodemailer")
const crypto = require("crypto");
const env = process.env
// middleware pour parser le JSON
router.use(express.json())

const generateRandomCode = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length)
}


//////////////////////////////////////////////////////////////////////////////////////
// Envoi un meil a de récupération de mot de passe
router.post("/sendRecoverPasswordEmail", async(request,response) => {
    
    try{
        const {userEmail} = request.body
        // Verification que l'utilisateur existe dans la base de donnée, sinon, on envoie pas le mail
        const user = await User.findOne({userEmail:userEmail})
        if(!user){
            const error = new Error()
            error.messageDebugConsole = `Aucun utilisateur de connu dans la base de donnée avec cette adresse email \n\n ${userEmail}`,
            error.messageDebugPopup = `${userEmail} aucun utilisateur connu` 
            throw error
        }
        // On génère un nouveau code
        const recoveryCode = generateRandomCode(6)
        // On le code générer
        const salt = await bcrypt.genSalt(10)
        const hachedRecoveryCode = await bcrypt.hash(recoveryCode, salt)
        // On sauvegarde un document Rcover avec le code généré, et l'email associé
        const newRecoveryDocument = new Recovery({
            userEmail:userEmail,
            recoveryCode:hachedRecoveryCode
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
            text:`Here is your password reset code to enter in the application : ${recoveryCode}  This code will only work for the next 15 minutes`,
            html:`<br/><br/>Here is your password reset code to enter in the application : <b>${recoveryCode}</b> <br/><br/> This code will only work for the next <b>15 minutes</b>`
        }
        await transporter.sendMail(mailOptions)

        // On enregistre un token pour permettre l'identification de document recovery grâce à sont ID
        const recoveryDocumentID = newRecoveryDocument._id
        const recoveryToken = jwt.sign(
            {recoveryID:recoveryDocumentID},
            env.recovery_secret_key,
            {expiresIn:"15m"}
        )
        response.cookie("recovery_token", recoveryToken, {
            httpOnly:true,
            maxAge:900000
        })
        // réponse status
        response.status(201).json({
            messageDebugConsole:"Code d'authentification correctement envoyer",
            messageDebugPopup:"Email envoyer",
            messageUserPopup:"A reset code has been sent at this email adress ",
        })

    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.message,
            messageDebugPopup:error.message,
            messageUserPopup:"Unknown email address",
        })
    }
})

// Vérifie que le code renseigner est cohérent avec celui stocker dans la base de donnée
router.post("/checkResetPasswordCode",recoveryCodeVerify, async(request, response) => {
    try{
        const {userResetCode, userEmail} = request.body
        const {recoveryID} = request.token_recoveryID
        const recoveryDocument = await Recovery.findById(recoveryID)
        const validCode = await bcrypt.compare(userResetCode, recoveryDocument.recoveryCode)
        if(!validCode){
            const error = new Error()
            error.messageDebugConsole = `Le code d'authentification n'est pas valide, ou ne correspond à aucune adresse email \n\n ${userResetCode} \n\n ${userEmail}`,
            error.messageDebugPopup = `${userResetCode} Code incorrecte` 
            throw error
        }
        await Recovery.findOneAndDelete({_id:recoveryID})
        const userDocument = await User.findOne({userEmail:userEmail})
        const userID = userDocument._id
        const token = jwt.sign(
            {userID:userID},
            env.userIDCrypt_secret_key,
            {expiresIn:"15m"}
        )
        response.cookie("recovery_userID", token, {
            httpOnly:true,
            maxAge:900000
        })
        response.status(201).json({
            messageDebugConsole:`Code de réinitialisation valide \n\n ${userResetCode} \n\n ${userEmail}`,
            messageDebugPopup:"Code de réinitialisation valide",
            messageUserPopup:"Code valid",
        })
    }catch(error){
        response.status(400).json({
            messageDebugConsole:error.message,
            messageDebugPopup:error.message,
            messageUserPopup:"This code is incorrect, please retry",
        })
    }
})

// Change le mot de passe de l'utilisateur par un nouveau mot de passe
router.put("/changePassword/:userEmail", extractUserID, async(request, response) => {
    try{
        const {userNewPassword} = request.body
        const {userID} = request.token_userID
        const thisUser = await User.findOne({_id:userID})
        if(!thisUser){
            const error = new Error()
            error.messageDebugConsole = `Aucune utilisateur de trouver associé avec cette adresse email dans la base de donnée`,
            error.messageDebugPopup = `Utilisateur inexistant dans la base de donnée`
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