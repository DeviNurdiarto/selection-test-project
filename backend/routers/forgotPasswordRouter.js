const express = require("express")
const { forgotPasswordController } = require("../controllers/index")
const router = express.Router()

router.post('/forgot-password', forgotPasswordController.forgotPassword)

module.exports = router