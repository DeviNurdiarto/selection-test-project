const express =require("express")
const { getUserPostController } = require("../controllers/index")
const router = express.Router()

router.get('/profile-post', getUserPostController.getUserPost)

module.exports = router