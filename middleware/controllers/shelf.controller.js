const Shelf = require("../../models/shelf.model");
const Book = require("../../models/books.model");
const deleteShelves = require("../../helpers/delete-shelves");

// @route "/shelf"

// @desc GET Show all shelves
const showShelves = async (req, res, next) => {
  try {
    const shelves = await Shelf.find({
      user: req.user._id,
    }).lean();
    if (shelves) {
      res.render("shelf/main", { shelves: shelves, user: req.user });
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @desc DELETE Delete all shelves
const deleteAllShelves = async (req, res, next) => {
  try {
    const message = await deleteShelves(req.user._id);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: {
        message: error.message,
      },
    });
  }
};

// @route /shelf/newshelf

// @desc POST Create new shelf
const newShelf = async (req, res, next) => {
  const newShelf = {
    name: req.body.name,
    user: req.user._id,
  };
  try {
    let shelf = await Shelf.findOne({
      name: req.body.name,
      user: req.user._id,
    }).lean();
    if (shelf) {
      res.status(409);
      let error = new Error("Shelf Already exists");
      error.status = 409;
      next(error);
    } else {
      shelf = await Shelf.create(newShelf);
      res.redirect("/shelf");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @route "/shelf/:shelfId"

// @desc GET Show all books
const showBooks = async (req, res, next) => {
  try {
    const books = await Book.find({
      shelf: req.params.shelfId,
    }).lean();
    if (books) {
      res.render("shelf/books", {
        books: books,
        user: req.user,
        shelfId: req.params.shelfId,
      });
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @desc DELETE Delete one shelf
const deleteShelf = async (req, res, next) => {
  try {
    await Book.deleteMany({ shelf: req.params.shelfId });
    await Shelf.deleteOne({ _id: req.params.shelfId }).then(
      res.redirect("/shelf")
    );
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @desc PATCH edit one shelf
const editShelf = async (req, res, next) => {
  try {
    const updated = await Shelf.updateOne(
      { _id: req.params.shelfId },
      { $set: req.body }
    );

    if (updated.n) {
      res.redirect("/shelf");
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @route "/shelf/newbook/:shelfId"

// @desc POST Create new book
const newBook = async (req, res, next) => {
  console.log(req.file);
  const filePath = req.file === undefined ? null : req.file.path;
  const newbook = {
    title: req.body.title,
    description: req.body.description,
    publishedDate: req.body.publishedDate,
    image: filePath,
    isbn: req.body.isbn,
    authors: req.body.authors.split(","),
    edition: req.body.edition,
    shelf: req.params.shelfId,
  };
  try {
    let book = await Book.findOne({
      title: req.body.title,
      shelf: req.params.shelfId,
    }).lean();
    if (book) {
      res.status(409);
      let error = new Error("Book Already exists");
      error.status = 409;
      next(error);
    } else {
      book = await Book.create(newbook);
      res.redirect("/shelf/" + req.params.shelfId);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

module.exports = {
  newShelf,
  showShelves,
  deleteAllShelves,
  newBook,
  showBooks,
  deleteShelf,
  editShelf,
};
