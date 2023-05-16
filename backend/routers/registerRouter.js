const express = require("express");
const { registerController } = require("../controllers/index");
const router = express.Router();

router.post('/register', registerController.register);

module.exports = router