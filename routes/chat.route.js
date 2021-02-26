const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/:classId", isAuthenticated, chatController.getById);

module.exports = router;
