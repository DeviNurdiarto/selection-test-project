const express = require("express");
const { verifyController } = require("../controllers/index");
const router = express.Router();

router.patch('/verification', verifyController.verify);

module.exports = router;