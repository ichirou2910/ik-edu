const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: false,
  },
  pending: {
    type: Array,
    requried: false,
  },
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
