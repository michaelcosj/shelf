const mongoose = require("mongoose");
const User = require("./user.model");

const shelfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

module.exports = mongoose.model("Shelf", shelfSchema);
