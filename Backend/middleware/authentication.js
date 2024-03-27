const jwt = require("jsonwebtoken")

const authenticationMiddleware = (request,response,next) => {
    const tokenExist = request.cookies.session_token // On récupère un possible cookie session
    if(!tokenExist){ // S'il n'y a pas de cookie de session
        return response.status(401).json({
            message:"Accès refusé, Aucune session. ( Aucun token trouvé )"
        })
    }else{
        try{
            const tokenDecoded = jwt.verify(tokenExist, "secretKey")
            request.token = tokenDecoded
            next()
        }catch(error){
            response.status(400).json({
                message:"Erreur percu dans le middleWare anthenticationMiddleware, token invalide ou expiré"
            })
        }
    }
}

module.exports = authenticationMiddleware