const express = require("express");
const messageController = require("../controller/message");
const router = express.Router();
const authenticate=require('../middleware/auth')

// Post message
router.post("/message", messageController.storeMessage);

// Getting all message from server
// router.post("/message/all", messageController.getAllMessages);
module.exports = router;