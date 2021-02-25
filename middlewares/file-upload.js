const multer = require("multer");
const fs = require("fs");

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, _file, func) => {
      const { classId } = req.params;
      const path = `static/files/${classId}`;
      fs.mkdirSync(path, { recursive: true });
      func(null, path);
    },
    filename: (_req, file, func) => {
      func(null, file.originalname.replace(/\s+/g, "_"));
    },
  }),
});

module.exports = fileUpload;
