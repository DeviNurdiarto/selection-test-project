const express = require("express")
const { userProfileController } = require("../controllers/index")
const router = express.Router()

router.get('/profile', userProfileController.getUserProfile)
router.patch('/profile', userProfileController.newUserProfile)

module.exports = router