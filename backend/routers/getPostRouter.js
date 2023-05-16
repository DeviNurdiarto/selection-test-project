const express = require("express")
const { getPostController } = require("../controllers/index")
const router = express.Router()

router.get('/', getPostController.getPost)

module.exports = router