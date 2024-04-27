const jwt = require("jsonwebtoken")
const env = process.env

const extractUserID = async(request, response, next) => {
    try{
        const userID_Token = request.cookies.recovery_userID
        if(!userID_Token){
            const error = new Error("Aucun token correspondant à l'ID de cet utilisateur trouver")
            error.statusCode = 403
            throw error
        }
        const decodedUserID = jwt.verify(userID_Token, env.userIDCrypt_secret_key)
        request.token_userID = decodedUserID
        next()
    }catch(error){
        response.status(error.statusCode || 500).json({
            message:error.message
        })
    }
}

module.exports = extractUserID