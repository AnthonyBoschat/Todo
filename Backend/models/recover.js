const mongoose = require("mongoose")

const recoverSchema = new mongoose.Schema({
    recoveryCode:{type:String, required:true},
    recoveryDate:{type: Date, default:Date.now, index:{expires:"15m"}}
})

const Recover = mongoose.model("Recover", recoverSchema)
module.exports = Recover