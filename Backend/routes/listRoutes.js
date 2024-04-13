const express = require("express")
const router = express.Router()
router.use(express.json())
const List = require("../models/list")
const authenticationMiddleware = require("../middleware/authentication")

// router.create("/create", authenticationMiddleware, async(request, response) => {

// })



module.exports = router