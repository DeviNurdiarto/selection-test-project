const express = require("express");
const { newPostController } = require("../controllers/index");
const router = express.Router();

router.post("/post", newPostController.upload)

module.exports = router
