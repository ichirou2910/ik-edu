const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lecture.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const fileUpload = require("../middlewares/file-upload");

router.post("/", isAuthenticated, isAdmin, lectureController.create);
router.post(
  "/:classId/file",
  isAuthenticated,
  isAdmin,
  fileUpload.single("file"),
  lectureController.fileUpload
);
router.get("/:classId", isAuthenticated, lectureController.getByClass);
router.put("/:classId", isAuthenticated, isAdmin, lectureController.update);

module.exports = router;
