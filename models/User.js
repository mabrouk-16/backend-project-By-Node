const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 20,
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique: true,
      },
    ],
  },
  followings: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique: true,
      },
    ],
  },
});
// userSchema.index({userName: 1})
const User = mongoose.model("User", userSchema);
// User.createIndexes({  });
module.exports = User;
