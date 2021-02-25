const db = require("../helpers/db");
const Lecture = db.Lecture;

const getByClass = async (req, res) => {
  const { classId } = req.params;
  let lecture;

  try {
    lecture = await Lecture.findOne({ classId });
    let content = null;
    if (lecture.content) content = lecture.content.split("\n---\n");
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: "Fetch lectures failed" });
  }
};

const create = async (req, res) => {
  const { classId, content } = req.body;

  const newLecture = new Lecture({
    classId,
    content,
  });

  // console.log(newLecture);

  try {
    await newLecture.save();
    res.status(200).json(newLecture);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const fileUpload = async (req, res) => {
  const file = req.file;
  res.status(200).json({ name: file.filename, path: file.path });
};

const update = async (req, res) => {
  const { classId } = req.params;
  const { content } = req.body;

  let lecture;

  try {
    lecture = await Lecture.findOne({ classId });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }

  if (!lecture) {
    res.status(404).json({ message: "Lecture not found" });
  }

  const newContent = content.join("\n---\n");
  lecture.content = newContent;

  try {
    await lecture.save();
    res.status(200).json(lecture);
  } catch (err) {
    res.status(500).json({ message: "Cannot save lecture" });
  }
};

module.exports = { getByClass, create, fileUpload, update };
