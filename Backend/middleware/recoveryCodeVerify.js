const jwt = require("jsonwebtoken")
const env = process.env

const recoveryCodeVerify = async(request, response, next) => {
    try{
        // On vérifie l'existence du cookie
        const recoveryTokenExist = request.cookies.recovery_token
        // Si aucun cookie trouver
        if(!recoveryTokenExist){
            const error = new Error("Aucun token de recovery trouver")
            error.statusCode = 403
            throw error
        }
        // Si un cookie a été trouver
        // On décode le token qui contient l'ID du document recovery
        const recoveryTokenDecoded = jwt.verify(recoveryTokenExist, env.recovery_secret_key)
        request.token = recoveryTokenDecoded
        next()
    }catch(error){
        response.status(error.statusCode || 500).json({
            message:error.message
        })
    }
}

module.exports = recoveryCodeVerify