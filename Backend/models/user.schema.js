// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//     name: {type:String, required:true},
//     email: {type:String, required:true, unique:true},
//     pass: {type:String, required:true}
// });

// const userModel = mongoose.model("user",userSchema);

// module.exports = {
//     userModel
// }

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9]{6,12}$/, // Alphanumeric validation with length constraint
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
