const jwt = require("jsonwebtoken")
const User = require("../models/user")
const env = process.env

const authenticationMiddleware = async (request,response,next) => {


    try {
        const tokenExist = request.cookies.session_token // On récupère un possible cookie session
        
        if (!tokenExist) { // S'il n'y a pas de cookie de session
            const error = new Error("Aucune session. ( Aucun token trouvé )")
            error.statusCode = 403
            throw error
        }
        const tokenDecoded = jwt.verify(tokenExist, env.secret_key)
        const userExist = await User.findOne({ _id: tokenDecoded.userID })
        if (!userExist) {
            const error = new Error(`Aucun utilisateur connu dans la base de donnée avec cet ID (token) : ${tokenDecoded.userID}`)
            error.statusCode = 404
            throw error
        }else{
            let newToken
            const currentTime = Date.now() / 1000
            if(tokenDecoded.exp){
                if(tokenDecoded.exp - currentTime < 600){
                    newToken = jwt.sign({userID:tokenDecoded.userID}, env.secret_key, {expiresIn:"1h"})
                    response.cookie("session_token", newToken, {
                        httpOnly:true, // Le cookie n'est pas accessible via JavaScript côté client
                        // secure:true, // Le cookie est envoyé uniquement sur HTTPS
                        maxAge:3600000 // Durée de vie du cookie en millisecondes (1h minutes ici)
                    })
                }
            }
            request.token = newToken ? { userID: tokenDecoded.userID, iat: tokenDecoded.iat, exp: jwt.decode(newToken).exp } : tokenDecoded
            next()
        }
    }catch(error) {
        // Gestion des erreurs JWT ou autres erreurs inattendues
        response.status(error.statusCode || 500).json({
            message: error.message
        })
    }

}

module.exports = authenticationMiddleware