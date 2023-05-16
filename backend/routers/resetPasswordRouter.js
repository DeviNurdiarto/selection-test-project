const express = require("express")
const { resetPasswordController } = require("../controllers/index")
const router = express.Router()

router.patch('/reset-password', resetPasswordController.reset);

module.exports = router