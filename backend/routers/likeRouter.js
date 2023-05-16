const express = require("express")
const { likeController } = require("../controllers/index")
const router = express.Router()

router.post('/like', likeController.like)

module.exports = router