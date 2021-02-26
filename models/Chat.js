const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  sender_name: {
    type: String,
    required: true,
  },
  sender_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
