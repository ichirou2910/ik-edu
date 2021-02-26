const db = require("../helpers/db");
const Class = db.Class;
const Lecture = db.Lecture;

const getAll = async (req, res) => {
  const { authId } = req;
  let classes;

  try {
    classes = await Class.find({ "members.id": authId });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

const getById = async (req, res) => {
  const classId = req.params.classId;

  const filter = {
    "members.id": req.authId,
    classId,
  };

  let classList;

  try {
    classList = await Class.findOne(filter);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
    return next(err);
  }
  if (!classList) {
    res
      .status(404)
      .json({
        message: "Oops! Looks like the class you are looking for doesn't exist",
      });
    return;
  }

  // console.log(classList);

  res.status(200).json(classList);
};

const getMembers = async (req, res) => {
  const { classId } = req.body;
  const { authId } = req;

  let classData;

  try {
    classData = await Class.findOne({ classId, "members.id": authId });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }

  if (!classData) {
    res.status(404).json({ message: "Class not found" });
  }

  res.status(200).json(classData.members);
};

const getPending = async (req, res) => {
  const { classId } = req.params;

  let classData;

  try {
    classData = await Class.findOne({ classId });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }

  if (!classData) {
    res.status(404).json({ message: "Class not found" });
  }

  res.status(200).json(classData.pending);
};

const create = async (req, res) => {
  const { classId, schedule } = req.body;

  const newClass = new Class({
    classId,
    schedule,
    members: [
      {
        name: "Lê Anh Dũng",
        email: "ichiroukeita2910@gmail.com",
        id: req.authId,
      },
    ],
  });

  const newLecture = new Lecture({
    classId,
    content: "",
  });

  try {
    await newClass.save();
    await newLecture.save();
    res.status(200).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const handleJoinRequest = async (req, res) => {
  const { classId, uid, accept } = req.body;

  let classData;

  try {
    classData = await Class.findOne({ classId: classId });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch class info" });
  }

  if (!classData) {
    res.status(404).json({ message: "Class not found" });
  }

  if (accept) {
    const newMember = classData.pending.filter((mem) => mem.id === uid);
    classData.members = [...classData.members, ...newMember];
  }

  classData.pending = classData.pending.filter((mem) => mem.id !== uid);

  try {
    await classData.save();
    res.status(200).json({});
  } catch (err) {
    res.status(500).json({ message: "Failed to add members" });
  }
};

const join = async (req, res) => {
  const { classId } = req.params;
  const { name, email, id } = req.body;

  let classData;

  try {
    classData = await Class.findOne({ classId });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch class info" });
  }

  if (!classData) {
    res.status(404).json({
      message: "Oops! Looks like the class you are looking for doesn't exist",
    });
    return;
  }

  const newMember = { name, email, id };

  classData.pending.push(newMember);

  try {
    await classData.save();
  } catch (err) {
    res.status(500).json({ message: "Failed to request to join" });
  }
};

const addLecture = () => {};

module.exports = {
  getAll,
  getById,
  getMembers,
  getPending,
  create,
  handleJoinRequest,
  addLecture,
  join,
};
