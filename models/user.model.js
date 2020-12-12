const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  displayName: String,
  photoURL: String,
});

module.exports = mongoose.model("User", userSchema);
