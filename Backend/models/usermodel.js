const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel
};

