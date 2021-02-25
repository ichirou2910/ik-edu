const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
});

const Lecture = mongoose.model("Lecture", LectureSchema);

module.exports = Lecture;
