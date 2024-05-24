const express = require("express")
const router = express.Router()
router.use(express.json())
const Collection = require("../models/collection")
const Item = require("../models/item")
const authenticationMiddleware = require("../middleware/authentication")



router.post("/set/:collectionID", authenticationMiddleware, async(request, response) => {
    try{
        const {collectionID} = request.params
        const collectionSettings = request.body
        const updatedCollection = await Collection.findByIdAndUpdate(
            {_id:collectionID},
            {$set: {settings:collectionSettings}},
            {new:true}
        )
        console.log(updatedCollection)
    }catch(error){
        response.status(400).json({
            messagedebugConsole:"Une erreur est survenue pendant la mise à jour des settings de la collection",
            message:error.message
        })
    }
})

module.exports = router