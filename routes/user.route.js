const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, userController.getAll);
router.post("/signup", userController.createUser);

module.exports = router;
