require("dotenv").config()
const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Item = require("../models/item")
const Folder = require("../models/folder")
const Recovery = require("../models/recovery")
const Collection = require("../models/collection")
const authenticationMiddleware = require("../middleware/authentication")
const nodemailer = require("nodemailer")
const crypto = require("crypto");
const Property = require("../models/property");
const env = process.env
// middleware pour parser le JSON
router.use(express.json())

const generateRandomCode = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length)
}


//////////////////////////////////////////////////////////////////////////////////////
// Envoi un meil a de récupération de mot de passe
router.post("/sendRecoverPasswordEmail", async(request,response) => {
    const {userEmail} = request.body
    console.log(userEmail)
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
        await Recovery.findOneAndDelete({userEmail:userEmail})
        // On génère un nouveau code
        const revoveryCode = generateRandomCode(6)
        // On sauvegarde un document Rcover avec le code généré, et l'email associé
        const newRecoveryDocument = new Recovery({
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

// Vérifie que le code renseigner est cohérent avec celui stocker dans la base de donnée
router.post("/checkResetPasswordCode", async(request, response) => {
    const {userResetCode, userEmail} = request.body
    try{
        const validCode = await Recovery.findOne({recoveryCode:userResetCode, userEmail:userEmail})
        if(!validCode){
            const error = new Error()
            error.messageDebugConsole = `Le code d'authentification n'est pas valide, ou ne correspond à aucune adresse email \n\n ${userResetCode} \n\n ${userEmail}`,
            error.messageDebugPopup = `${userResetCode} Code incorrecte` 
            throw error
        }
        await Recovery.findOneAndDelete({_id:validCode._id})
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

// Change le mot de passe de l'utilisateur par un nouveau mot de passe
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