const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

ChatSchema.plugin(mongoosePaginate);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
