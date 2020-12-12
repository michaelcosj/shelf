const Shelf = require("../models/shelf.model");
const Book = require("../models/books.model");

module.exports = async (userId) => {
  const message = {};
  try {
    const shelves = await Shelf.find({ user: userId }).lean();
    shelves.forEach(async (shelf) => {
      await Book.deleteMany({
        shelf: shelf._id,
      });
    });
    await Shelf.deleteMany({
      user: userId,
    });
    message.message = "deleted Successfully";
    return message;
  } catch (error) {
    throw error;
  }
};
