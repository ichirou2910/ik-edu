const admin = require("../services/firebase.service");
const db = require("../helpers/db");
const User = db.User;

const createUser = async (req, res) => {
  const { displayName, email, password } = req.body;

  try {
    const user = await admin
      .auth()
      .createUser({ displayName, email, password });

    const newUser = new User({
      displayName,
      email,
      uid: user.uid,
    });

    await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
  let users;

  try {
    users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, getAll };
