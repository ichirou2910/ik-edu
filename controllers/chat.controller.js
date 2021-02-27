const db = require("../helpers/db");
const Chat = db.Chat;

const getById = async (req, res, next) => {
  const { classId } = req.params;
  const { page } = req.query;

  let chats;
  try {
    chats = await Chat.paginate(
      { classId },
      { sort: { date: -1 }, page: page, limit: 30 }
    );
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
    return next(err);
  }

  res.status(200).json(chats);
};

module.exports = { getById };
