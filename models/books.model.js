const mongoose = require("mongoose");
const Shelf = require("./shelf.model");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  image: {
    type: String,
  },
  isbn: {
    type: String,
  },
  authors: [
    {
      type: String,
    },
  ],
  edition: {
    type: String,
  },
  shelf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Shelf,
  },
});

module.exports = mongoose.model("Books", booksSchema);
