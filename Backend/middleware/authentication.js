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
            request.token = tokenDecoded
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