const mongoose = require("mongoose");
const Book = require("./books.model");

const borrowSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Book,
  },
  name: {
    type: String,
    required: true,
  },
  dateBorrowed: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returned: {
    type: Boolean,
  },
  dateReturned: {
    type: Date,
  },
});

module.exports = mongoose.model("borrow", borrowSchema);
