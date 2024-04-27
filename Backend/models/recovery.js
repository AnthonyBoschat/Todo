const mongoose = require("mongoose")

const recoverySchema = new mongoose.Schema({
    userEmail:{type:String, required:true},
    recoveryCode:{type:String, required:true},
    recoveryDate:{type: Date, default:Date.now, index:{expires:"15m"}}
})

const Recovery = mongoose.model("Recovery", recoverySchema)
module.exports = Recovery