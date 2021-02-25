const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.post("/", isAuthenticated, isAdmin, classController.create);
router.get("/", isAuthenticated, classController.getAll);
router.get("/:classId/members", isAuthenticated, classController.getMembers);
router.get(
  "/:classId/pending",
  isAuthenticated,
  isAdmin,
  classController.getPending
);
router.get("/:classId", isAuthenticated, classController.getById);
router.post("/:classId/join", isAuthenticated, classController.join);
router.post(
  "/:classId/member",
  isAuthenticated,
  isAdmin,
  classController.handleJoinRequest
);
router.post(
  "/:classId/lecture",
  isAuthenticated,
  isAdmin,
  classController.addLecture
);

module.exports = router;
